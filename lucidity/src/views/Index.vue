<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { saveConfig, readConfig, getChats, getChat, getChatMessages, saveChat, saveChatMessages, removeChat } from '@/lib/files/files';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TextAreaInput } from '@/components/ui/textareainput'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogScrollContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Textarea } from '@/components/ui/textarea'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { IoSend } from "vue3-icons/io5";
import { IoSettingsSharp } from "vue3-icons/io5";
import { RiRobot2Fill } from "vue3-icons/ri";
import { HiMiniChatBubbleBottomCenter } from "vue3-icons/hi2";
import { BsChatRightTextFill } from "vue3-icons/bs";
import { RiChatNewFill } from "vue3-icons/ri";
import { IoIosRemoveCircleOutline } from "vue3-icons/io";
import { FaRegStar } from "vue3-icons/fa";
import { HiOutlineArchiveBoxArrowDown } from "vue3-icons/hi2";
import { FaRegEdit } from "vue3-icons/fa";
import { AiFillDelete } from "vue3-icons/ai";
import { RiLoopRightLine } from "vue3-icons/ri";
import { FaStar } from "vue3-icons/fa";

import UserChat from '@/components/ui/chatmessage/UserChat.vue'
import AiChat from '@/components/ui/chatmessage/AiChat.vue'

import OpenAI from "openai"

const { toast } = useToast()

const scrollArea = ref(null) 

const state = reactive({
  config: {},
  chats: [],
  chatSelected: {},
  messagesChatSelected: [],
  input: '',
  totalLinesInput: '',
  providerSelected: {},
  modelSelected: {},
  baseProviderUrl: '',
  receivingResponse: false,
  usingStreaming: true,
  openAlertDialogRemoveChat: false,
  chatContextMenu: {},
  openAlertDialogRenomearChat: false,
  inputRenameChat: '',
  filterChats: 'Todos'
})

const salvarConfiguracoes = async () => {
  const response = await saveConfig(state.config)
  toast({
    title: 'Salvar Configurações',
    description: response,
  });
}

const selecionarModelo = async (modelo, providerName) => {
  state.modelSelected = modelo
  state.providerSelected = providerName
  state.baseProviderUrl = state.config.endpoints[providerName]
  toast({
    title: "Selecionar Modelo",
    description: `${modelo.name} selecionado!`
  })
}

const sendExample = async (prompt) => {
  state.input = prompt
  if(state.modelSelected.name){
    sendCompletion()
  }else{
    toast({'title': 'Modelo não selecionado!', 'description': 'Selecione um modelo da lista'})
  }
}

const sendCompletion = async () => {
  try{
    state.receivingResponse = true
    if(!state.chatSelected.id){
      await newChatMessage()
    }
    state.messagesChatSelected.push({"role": "user","content": state.input})
    saveChatMessages(state.chatSelected.id, state.messagesChatSelected)
    const openai = new OpenAI({
      baseURL: state.baseProviderUrl,
      apiKey: state.config.apiKeys[state.providerSelected],
      dangerouslyAllowBrowser: true,
    }) 
    const completion = await openai.chat.completions.create({
      model: state.modelSelected.modelId,
      messages: state.messagesChatSelected,
      stream: state.usingStreaming,
    })
    state.messagesChatSelected.push({"role": "assistant", "content": "", "model": state.modelSelected.name})
    if(state.usingStreaming){
      for await (const part of completion) {
        const token = (part.choices[0]?.delta?.content || '');
        state.messagesChatSelected[(state.messagesChatSelected.length)-1].content += token
      }
    }else{
      state.messagesChatSelected[(state.messagesChatSelected.length)-1].content = completion.choices[0].message.content
    }
    state.receivingResponse = false
    state.input = ""
    saveChatMessages(state.chatSelected.id, state.messagesChatSelected)
  }catch(e){
    state.receivingResponse = false
    //console.log("Error: "+e)
      toast({
        'title': 'Erro!',
        'description': e
      })
  }
}

const readChats = async () => {
  const chats = await getChats()
  // console.log(chats)
  // console.log(chats.length)
  const chatsReaded = []
  for(const chat of chats){
    const readedChat = await getChat(chat.name)
      chatsReaded.push(readedChat)
  }
  // console.log(chatsReaded)
  state.chats = chatsReaded.reverse()
}

const readChat = async (chat) => {
  // //console.log(`Lendo chat ${chat.id}.json`)
  state.chatSelected = await chat
  //console.log(state.chatSelected)
  state.messagesChatSelected = await getChatMessages(chat.id)
  console.log(typeof(state.messagesChatSelected))
  scrollChat()
}

const newChat = () => {
  if(!state.receivingResponse){
    state.chatSelected = {}
    state.messagesChatSelected = []
    state.input = ''
  }else{
    toast({
      'title': 'Ops!',
      'description': 'Não é possível iniciar uma nova conversa enquanto estiver recebendo uma resposta'
    })
  }
}

const deletaChat = async () => {
  const response = await removeChat(state.chatContextMenu)
  state.openAlertDialogRemoveChat = false
  toast({
    'title': 'Chat deletado!',
    'description': response
  })
  newChat()
  readChats()
}

const renomeiaChat = async () => {
  try{
    state.chatContextMenu.title = state.inputRenameChat
    saveChat(state.chatContextMenu)
    toast({
      'title': 'Nome alterado com sucesso!',
      'description': `Agora a conversa se chama: ${state.inputRenameChat}`
    })
    state.inputRenameChat = ''
    readChats()
  }catch(e){
    toast({
      'title': 'Erro ao renomear conversa!',
      'description': e
    })
  }
  state.openAlertDialogRenomearChat = false
}

const newChatMessage = () => {
  let id = 1
  try{
    if(state.chats.length > 0)
    id = parseInt(state.chats[0].id) + 1
  }catch(e){
    console.log(e)
  }
  let title = state.input.length > 20 ? `${state.input.substring(0, 20)}...` : state.input
  const newChat = {
    "id": id,
    "title": title,
    "archived": false,
    "favorite": false
  }
  state.chatSelected = newChat
  console.log("iniciando novo chat")
  console.log(state.chatSelected)
  state.chats.unshift(newChat)
  saveChat(newChat)
}

const arquivarChat = (chat) => {
  state.chatContextMenu = chat
  state.chatContextMenu.archived = !state.chatContextMenu.archived
  try{
    saveChat(state.chatContextMenu)
    readChats()
    toast({
      title: `Chat ${state.chatContextMenu.archived ? "Arquivado" : "Desarquivado"}!`,
      description: `${chat.title} ${state.chatContextMenu.archived ? "Arquivado" : "Desarquivado"}!`
    })
  }catch(e){
    toast({
      title: 'Erro!',
      description: `Não foi possível ${state.chatContextMenu.archived ? "arquivar" : "desarquivar"} ${chat.title}!`
    })
  }
}

const favoritarChat = (chat) => {
  state.chatContextMenu = chat
  state.chatContextMenu.favorite = !state.chatContextMenu.favorite
  try{
    saveChat(state.chatContextMenu)
    readChats()
    toast({
      title: `Chat ${state.chatContextMenu.favorite ? "Favoritado" : "Desfavoritado"}!`,
      description: `${chat.title} ${state.chatContextMenu.favorite ? "Favoritado" : "Desfavoritado"}!`
    })
  }catch(e){
    toast({
      title: 'Erro!',
      description: `Não foi possível ${state.chatContextMenu.favorite ? "favoritar" : "desfavoritar"} ${chat.title}!`
    })
  }
  
}

const scrollChat = () => {
  scrollArea.value?.scrollIntoView(false, {behavior: "smooth"})
}

const changeFilterChat = () => {
  const filtroAtual = state.filterChats
  if(filtroAtual == "Todos"){
    state.filterChats = "Favoritos"
  }
  if(filtroAtual == "Favoritos"){
    state.filterChats = "Arquivados"
  }
  if(filtroAtual == "Arquivados"){
    state.filterChats = "Todos"
  }
}

const changeHeightTextAreaInput = () => {
  let height = 60
  const totalCharInput = state.input.length
  const totalLines = Math.floor(totalCharInput/50)
  const totalEnters = state.input.split(/\r\n|\r|\n/).length
  //console.log(`Total de Enters: ${totalLines}`)
  //console.log(`Total de Enters: ${totalEnters}`)
  let newHeight = height+((totalLines+totalEnters)*5)
  if(newHeight < 90){
    newHeight = 90
  }
  if(newHeight >= 90 && newHeight < 120){
    newHeight = 90
  }
  if(newHeight >= 120 && newHeight < 150){
    newHeight = 120
  }
  if(newHeight >= 150 && newHeight < 200){
    newHeight = 150
  }
  if(newHeight >= 200){
    newHeight = 200
  }
  state.totalLinesInput = `h-[${newHeight}px]`
  console.log(state.totalLinesInput)
}

watch(() => state.messagesChatSelected, () => {
  //console.log("mensagens mudando!")
  scrollChat()
},{deep: true})

watch(() => state.input, () => {
  changeHeightTextAreaInput()
})

onMounted(async () => {
  state.config = await readConfig()
  readChats()
})

const style = {
  chatButton: "cursor-pointer my-1 h-[50px] rounded-lg shadow:none hover:bg-neutral-200 hover:text-neutral-700 flex",
  chatButtonSelected: "cursor-pointer my-1 h-[50px] rounded-lg bg-neutral-100 text-black shadow-none hover:bg-neutral-800 hover:text-neutral-100 flex",
  bottomButtons: "cursor-pointer h-[50px] rounded-lg hover:bg-neutral-200 hover:text-neutral-700 flex",
  textAreaInput: "w-[calc(100%-180px)] pt-[23px] bg-neutral-900 text-neutral-100 ml-[40px] my-[5px] shadow-none"
}

</script>

<template>  
  <Toaster />
  <AlertDialog :open="state.openAlertDialogRenomearChat">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Renomear a conversa ({{ state.chatContextMenu.title }})</AlertDialogTitle>
        <AlertDialogDescription>
          <Input v-model="state.inputRenameChat"/>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :onclick="() => {state.openAlertDialogRenomearChat = false}">Cancelar</AlertDialogCancel>
        <AlertDialogAction :onclick="() => {renomeiaChat(0)}">Confirmar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  <AlertDialog :open="state.openAlertDialogRemoveChat">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Deletar o Chat?</AlertDialogTitle>
        <AlertDialogDescription>
          Você tem certeza que quer deletar essa conversa? ({{ state.chatContextMenu.title }})
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :onclick="() => {state.openAlertDialogRemoveChat = false}">Cancelar</AlertDialogCancel>
        <AlertDialogAction :onclick="() => {deletaChat()}" class="bg-red-500">Deletar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  <div class="flex bg-black">

    <!-- Sidebar -->

    <div class="w-[250px] h-[calc(100vh-35px)] text-white rounded-lg bg-neutral-900 shadow-sm shadow-neutral-700 flex flex-col ml-4 mt-4 px-2 py-2">
      <div class="h-[calc(100%-50px)] text-sm flex flex-col">
        <div :onclick="() => newChat()" class=" cursor-pointer h-[50px] mb-2 border-solid border-2 border-white bg-neutral-900 text-white rounded-lg hover:bg-neutral-100 hover:text-black flex">
          <RiChatNewFill class="mx-4 my-[15px]"/><p class="my-3">Nova Conversa</p>
        </div>
        <div :onclick="() => changeFilterChat()" class="cursor-pointer h-[50px] mb-2 border-solid border-b-2 border-white bg-neutral-900 text-white rounded-lg hover:bg-neutral-100 hover:text-black flex">
          <BsChatRightTextFill v-if="state.filterChats == 'Todos'" class="mx-4 my-[18px]"/>
          <FaStar v-if="state.filterChats == 'Favoritos'" class="mx-4 my-[18px]"/>
          <HiOutlineArchiveBoxArrowDown v-if="state.filterChats == 'Arquivados'" class="mx-4 my-[18px]"/>
          <p class="my-3">{{state.filterChats}}</p>
        </div>
        <ScrollArea v-if="state.chats.length > 0">
          <div v-for="chat in state.chats" :onclick="() => {readChat(chat)}">
            <ContextMenu v-if="state.filterChats == 'Todos' || state.filterChats == 'Favoritos'  && chat.favorite || state.filterChats == 'Arquivados'  && chat.archived">
              <ContextMenuTrigger id="triger1" :class="state.chatSelected.id == chat.id ? style.chatButtonSelected : style.chatButton">
                <BsChatRightTextFill v-if="!chat.favorite && !chat.archived" class="mx-4 my-[18px]"/>
                <FaStar v-if="chat.favorite" class="mx-4 my-[18px]"/>
                <HiOutlineArchiveBoxArrowDown v-if="chat.archived" class="mx-4 my-[18px]"/>
                <p class="my-4">{{(chat.title).length > 20 ? (chat.title).substring(0,20)+"...": chat.title}}</p>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem v-if="!chat.archived" :onclick="() => favoritarChat(chat)"><FaRegStar class="mr-3"/>{{chat.favorite ? 'Desfavoritar' : 'Favoritar'}}</ContextMenuItem>
                <ContextMenuItem :onclick="() => {
                  state.chatContextMenu = chat
                  state.openAlertDialogRenomearChat = true
                }"><FaRegEdit class="mr-3"/>Renomear</ContextMenuItem>
                <ContextMenuItem v-if="!chat.favorite" :onclick="() => arquivarChat(chat)"><HiOutlineArchiveBoxArrowDown class="mr-3"/>{{chat.archived ? 'Desarquivar' : 'Arquivar' }}</ContextMenuItem>
                <ContextMenuItem :onclick="() => {
                  state.chatContextMenu = chat
                  state.openAlertDialogRemoveChat = true
                }"><IoIosRemoveCircleOutline class="mr-3"/>Remover</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </ScrollArea>
      </div>
      <Separator class="bg-neutral-700 my-1" />
      <div class="h-[50px] text-sm flex flex-col">
        <Dialog>
            <DialogTrigger>
              <div :class="style.bottomButtons"><IoSettingsSharp class="mx-4 my-[18px]"/><p class="my-4">Configurações</p></div>
            </DialogTrigger>
            <DialogScrollContent class="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Configurações</DialogTitle>
                <DialogDescription>
                  Alterar configurações.
                </DialogDescription>
              </DialogHeader>
              <Tabs default-value="account" class="w-[400px]">
                <TabsList>
                  <TabsTrigger value="Keys">
                    API Keys
                  </TabsTrigger>
                  <TabsTrigger value="EndPoints">
                    EndPoints
                  </TabsTrigger>
                  <TabsTrigger value="Modelos">
                    Modelos
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="Keys" class="">
                    <Label for="groq" class="ml-2">Groq</Label>
                    <Input id="groq" class="mb-2 mx-2 w-[150px]" v-model="state.config.apiKeys.groq" placeholder="API Groq" />
                    <Label for="openrouter" class="ml-2">OpenRouter</Label>
                    <Input id="openrouter" class="mb-2 mx-2 w-[150px]" v-model="state.config.apiKeys.openrouter" placeholder="API OpenRouter" />
                    <Label for="naga" class="ml-2">Naga</Label>
                    <Input id="naga" class="mb-2 mx-2 w-[150px]" v-model="state.config.apiKeys.naga" placeholder="API OpenRouter" />
                    <Label for="awan" class="ml-2">Awan LLM</Label>
                    <Input id="awan" class="mb-2 mx-2 w-[150px]" v-model="state.config.apiKeys.awanllm" placeholder="API OpenRouter" />
                    </TabsContent>
                <TabsContent value="EndPoints" class="">
                    <Label for="groq" class="ml-2">Groq</Label>
                    <Input id="groq" class="mb-2 mx-2 w-[530px]" v-model="state.config.endpoints.groq" placeholder="Endpoint Groq" />
                    <Label for="openrouter" class="ml-2">OpenRouter</Label>
                    <Input id="openrouter" class="mb-2 mx-2 w-[530px]" v-model="state.config.endpoints.openrouter" placeholder="Endpoint OpenRouter" />
                    <Label for="naga" class="ml-2">Naga</Label>
                    <Input id="naga" class="mb-2 mx-2 w-[530px]" v-model="state.config.endpoints.naga" placeholder="Endpoint OpenRouter" />
                    <Label for="awan" class="ml-2">Awan LLM</Label>
                    <Input id="awan" class="mb-2 mx-2 w-[530px]" v-model="state.config.endpoints.awanllm" placeholder="Endpoint OpenRouter" />
                </TabsContent>
                <TabsContent value="Modelos" class="w-[540px]">
                  <Table v-if="state.config.apiKeys[providerName] != ''" v-for="provider, providerName in state.config.models">
                    <TableCaption>Modelos disponíveis {{ providerName }}.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead class="">
                          Nome
                        </TableHead>
                        <TableHead>Parâmetros</TableHead>
                        <TableHead>Contexto</TableHead>
                        <TableHead class="text-right">
                          Ativo
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow v-for="modelo, index in provider" :key="modelo.modelId">
                        <TableCell class="font-medium">
                          {{ modelo.name }}
                        </TableCell>
                        <TableCell>{{ modelo.parametersSize }}</TableCell>
                        <TableCell>{{ modelo.contextLength }}</TableCell>
                        <TableCell class="text-right">
                          <Switch id="airplane-mode" v-model:checked="state.config.models[providerName][index].active" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                    <!-- {{ state.config.models.naga }} -->
                    <!-- <div >
                      <p class="text-lg">{{ privaderName }}</p>
                      <p :onclick="() => selecionartModelo(modelo, privaderName)">{{ modelo.name }}</p>
                    </div> -->
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button class="bg-neutral-900" :onclick="() => salvarConfiguracoes()">Salvar Configurações</Button>
              </DialogFooter>
            </DialogScrollContent>
          </Dialog>
      </div>
    </div>  

    <!-- Chat Area -->
    
    <div class="w-[calc(100%-250px)] h-[100vh]">
      <div class="h-[calc(100%-130px)]">
        <ScrollArea class=" scroll-auto px-[10px] mt-14 w-[calc(100%-50px)] h-[calc(100%-30px)] rounded-md scroll-smooth scroll-auto">
          <div ref="scrollArea">
            <div class="text-white" v-if="!state.chatSelected.id">
              <h4 class="mt-[100px] text-neutral-600 ml-[150px]">Bem-Vindo ao</h4>
              <h1 class="ml-[130px] mt-1">Lucidity</h1>
              <h3 class="text-neutral-600 ml-[150px] mt-[10px]">Que tal usar uma dessas ideias?</h3>
              <div class="mx-[150px] my-[50px] flex flex-row space-x-2">
                  <div :onclick="() => sendExample('O que é Vue?')" class="group cursor-pointer rounded-lg px-[30px] py-[30px] h-[150px] w-[250px] bg-neutral-900 shadow-sm shadow-neutral-700  transition-all duration-300 hover:bg-neutral-700 hover:shadow-neutral-500">
                    <h3 class="">O que é</h3>
                    <h4 class="text-neutral-600 group-hover:text-neutral-300">Vue ?</h4>
                  </div>
                  <div :onclick="() => sendExample('Quem foi Michael Jackson?')" class="group cursor-pointer rounded-lg px-[30px] py-[30px] h-[150px] w-[250px] bg-neutral-900 shadow-sm shadow-neutral-700  transition-all duration-300 hover:bg-neutral-700 hover:shadow-neutral-500">
                    <h3 class="">Quem foi</h3>
                    <h4 class="text-neutral-600 group-hover:text-neutral-300">Michael Jackson?</h4>
                  </div>
                  <div :onclick="() => sendExample('Crie o jogo da cobra em python')" class="group cursor-pointer rounded-lg px-[30px] py-[30px] h-[150px] w-[250px] bg-neutral-900 shadow-sm shadow-neutral-700  transition-all duration-300 hover:bg-neutral-700 hover:shadow-neutral-500">
                    <h3 class="">Crie</h3>
                    <h4 class="text-neutral-600 group-hover:text-neutral-300">O jogo da cobra em python</h4>
                  </div>
              </div>
            </div>
            <div v-else v-for="message in state.messagesChatSelected">
              <div class="flex group">
                <UserChat v-if="message.role == 'user'" :text="message.content" :model="message.model"/>
              </div>
              <div class="flex group">
              <AiChat v-if="message.role == 'assistant'" :text="message.content" :model="message.model"/>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div class="flex fixed bottom-0 w-[100%]">
        <div class="flex shadow-sm shadow-neutral-700 bg-neutral-900 mx-[20px] my-[20px] w-[calc(100%-300px)] rounded-lg border-solid border-[1px] border-neutral-900 focus-within:border-neutral-100 ">
          <TextAreaInput :class="[style.textAreaInput, state.totalLinesInput]" type="text" placeholder="Escreva algo..." v-model="state.input" />
          <div class="fixed text-sm right-[20px] bottom-[0px] text-right text-neutral-600" v-if="state.modelSelected.name">Using {{ state.modelSelected.name }} ({{ state.providerSelected }})</div>
          <Button :disabled="state.receivingResponse || state.input.length < 1" :onclick="() => {sendCompletion()}" class="relative right-5 m-auto bg-neutral-100 shadow-none text-black hover:bg-neutral-900 hover:text-neutral-100">
            <IoSend class="size-5"></IoSend>
          </Button>
          <Sheet>
            <SheetTrigger>
              <Button class="relative m-auto right-8 shadow-none bg-neutral-900 text-neutral-100">
                <IoSettingsSharp class="size-5"></IoSettingsSharp>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Configurações de Prompts</SheetTitle>
                <SheetDescription>
                  <Label>Modelo</Label>
                  <Command class="fixed rounded-lg border shadow-md max-h-[47px] max-w-[350px] focus-within:max-h-[330px]">
                    <CommandInput :placeholder="state.modelSelected ? state.modelSelected.name : 'Selecione o modelo ou pesquise...'" />
                    <CommandList>
                      <CommandEmpty>Sem resultados.</CommandEmpty>
                      <CommandGroup v-for="provider, providerName in state.config.models" :heading="providerName">
                        <div v-for="model in provider">
                          <CommandItem v-if="model.active" :value="model"
                          :onclick="() => {
                            selecionarModelo(model, providerName)
                          }"
                          >
                            <span>{{ state.modelSelected.modelId == model.modelId ? `${model.name } (selecionado)` : model.name  }}</span>
                          </CommandItem>
                        </div>
                      </CommandGroup>
                      <CommandSeparator />
                    </CommandList>
                  </Command>
                  <div class="mt-[70px]">
                    <Label>Prompt do Sistema</Label>
                    <Textarea class="h-[150px] resize-none" placeholder="Você é um assistente e está aqui para ajudar." />
                    <Label class="fixed bottom-5 right-[130px]">Usar resposta por Streaming</Label>
                    <Switch v-model:checked="state.usingStreaming" class="fixed bottom-4 right-[320px]">Streaming</Switch>
                    <Button class="bg-neutral-900 fixed bottom-2 right-2">Salvar</Button>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>  
  </div>
</template>
<style>

</style>