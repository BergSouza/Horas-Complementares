import { writeTextFile, readTextFile, BaseDirectory, readDir, remove, mkdir } from '@tauri-apps/plugin-fs'

const baseDocPath = "lucidity"

const writeFile = async (path, content, append) => {
    await writeTextFile(`${baseDocPath}\\${path}`, content, { baseDir: BaseDirectory.Document, append: append });
}

const removeFile = async (path) => {
    try{
        await remove(`${baseDocPath}\\${path}`, { baseDir: BaseDirectory.Document})
        return true
    }catch(e){
        return e
    }
}

const createDir = async (path) => {
    try{
        await mkdir(`${baseDocPath}\\${path}`, {baseDir: BaseDirectory.Document})
        return true
    }catch(e){
        console.log(e)
        return false
    }
    
}

const readFile = async (path) => {
    try{
        return await readTextFile(`${baseDocPath}\\${path}`, { baseDir: BaseDirectory.Document })
    }catch(e){
        return "Erro ao ler arquivo"
    }
}

const saveConfig = async (c) => {
    let config = ""
    if(c){
        config = c
    }else{
        config = {
            apiKeys: {
                openrouter: '',
                groq: '',
                naga: '',
                awanllm: '',
            },
            endpoints: {
                openrouter: 'https://openrouter.ai/api/v1/',
                groq: 'https://api.groq.com/openai/v1/',
                naga: 'https://api.naga.ac/v1',
                awanllm: 'https://api.awanllm.com/v1/',
            },
            models: {
                openrouter: 
                [
                    
                    {
                        name: 'LFM 40B MoE',
                        modelId: 'liquid/lfm-40b:free',
                        contextLength: 32768,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Qwen 2 7B Instruct',
                        modelId: 'qwen/qwen-2-7b-instruct:free',
                        contextLength: 32768,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Llama 3.1 405B Instruct',
                        modelId: 'meta-llama/llama-3.1-405b-instruct:free',
                        contextLength: 131072,
                        parametersSize: '405B',
                        active: false
                    },
                    {
                        name: 'Llama 3.1 8B Instruct',
                        modelId: 'meta-llama/llama-3.1-8b-instruct:free',
                        contextLength: 32768,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Llama 3.1 70B Instruct',
                        modelId: 'meta-llama/llama-3.1-70b-instruct:free',
                        contextLength: 131072,
                        parametersSize: '70B',
                        active: false
                    },
                    {
                        name: 'Hermes 3 405B Instruct',
                        modelId: 'nousresearch/hermes-3-llama-3.1-405b:free',
                        contextLength: 131072,
                        parametersSize: '405B',
                        active: false
                    },
                    {
                        name: 'Llama 3.2 11B Vision Instruct',
                        modelId: 'meta-llama/llama-3.2-11b-vision-instruct:free',
                        contextLength: 131072,
                        parametersSize: '11B',
                        active: false
                    },
                    {
                        name: 'Llama 3.2 1B Instruct',
                        modelId: 'meta-llama/llama-3.2-1b-instruct:free',
                        contextLength: 131072,
                        parametersSize: '1B',
                        active: false
                    },
                    {
                        name: 'Llama 3.2 3B Instruct',
                        modelId: 'meta-llama/llama-3.2-3b-instruct:free',
                        contextLength: 131072,
                        parametersSize: '3B',
                        active: false
                    },
                    {
                        name: 'Mistral 7B Instruct',
                        modelId: 'mistralai/mistral-7b-instruct:free',
                        contextLength: 32768,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Llama 3 8B Instruct',
                        modelId: 'meta-llama/llama-3-8b-instruct:free',
                        contextLength: 8192,
                        parametersSize: '8B',
                        active: false
                    },
                    {
                        name: 'Phi-3 Mini 128K Instruct',
                        modelId: 'microsoft/phi-3-mini-128k-instruct:free',
                        contextLength: 128000,
                        parametersSize: '14B',
                        active: false
                    },
                    {
                        name: 'Phi-3 Medium 128K Instruct',
                        modelId: 'microsoft/phi-3-medium-128k-instruct:free',
                        contextLength: 128000,
                        parametersSize: '3.8B',
                        active: false
                    },
                    {
                        name: 'Zephyr 7B',
                        modelId: 'huggingfaceh4/zephyr-7b-beta:free',
                        contextLength: 4096,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Capybara 7B',
                        modelId: 'nousresearch/nous-capybara-7b:free',
                        contextLength: 8192,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Gemma 2 9B',
                        modelId: 'google/gemma-2-9b-it:free',
                        contextLength: 8192,
                        parametersSize: '9B',
                        active: false
                    },
                    {
                        name: 'Gemma 7B',
                        modelId: 'google/gemma-7b-it:free',
                        contextLength: 8192,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'OpenChat 3.5 7B',
                        modelId: 'openchat/openchat-7b:free',
                        contextLength: 8192,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'MythoMist 7B',
                        modelId: 'gryphe/mythomist-7b:free',
                        contextLength: 32768,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Toppy M 7B',
                        modelId: 'undi95/toppy-m-7b:free',
                        contextLength: 4096,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Eagle 7B',
                        modelId: 'recursal/eagle-7b',
                        contextLength: 10000,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'RWKV v5 World 3B',
                        modelId: 'rwkv/rwkv-5-world-3b',
                        contextLength: 10000,
                        parametersSize: '3B',
                        active: false
                    },
                    {
                        name: 'RWKV v5 3B AI Town',
                        modelId: 'recursal/rwkv-5-3b-ai-town',
                        contextLength: 10000,
                        parametersSize: '3B',
                        active: false
                    },
                ],
                groq: 
                [
                    {
                        name: 'Gemma 7B',
                        modelId: 'gemma-7b-it',
                        contextLength: 8192,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Llama 3 8B',
                        modelId: 'llama3-8b-8192',
                        contextLength: 8192,
                        parametersSize: '8B',
                        active: false
                    },
                    {
                        name: 'Llama 3 70B',
                        modelId: 'llama3-70b-8192',
                        contextLength: 8192,
                        parametersSize: '70B',
                        active: false
                    },
                    {
                        name: 'Mixtral 8x7B',
                        modelId: 'mixtral-8x7b-32768',
                        contextLength: 32768,
                        parametersSize: '8x7B',
                        active: false
                    },
                ],
                naga: [
                    {
                        name: 'GPT 4o Mini',
                        modelId: 'gpt-4o-mini-2024-07-18',
                        contextLength: 0,
                        parametersSize: '',
                        active: false
                    },
                    {
                        name: 'LLama 3 70B Instruct',
                        modelId: 'llama-3-70b-instruct',
                        contextLength: 8192,
                        parametersSize: '70B',
                        active: false
                    },
                    {
                        name: 'LLama 3 8B Instruct',
                        modelId: 'llama-3-8b-instruct',
                        contextLength: 32768,
                        parametersSize: '8B',
                        active: false
                    },
                    {
                        name: 'Mixtral 8x22B Instruct',
                        modelId: 'mixtral-8x22b-instruct',
                        contextLength: 32768,
                        parametersSize: '8x22B',
                        active: false
                    },
                    {
                        name: 'Command R+',
                        modelId: 'command-r-plus',
                        contextLength: 128000,
                        parametersSize: '104B',
                        active: false
                    },
                    {
                        name: 'Command R',
                        modelId: 'command-r',
                        contextLength: 128000,
                        parametersSize: '35B',
                        active: false
                    },
                    {
                        name: 'Codestral 2405',
                        modelId: 'codestral-2405',
                        contextLength: 32768,
                        parametersSize: '22B',
                        active: false
                    },
                    {
                        name: 'GPT 3.5 Turbo 0125',
                        modelId: 'gpt-3.5-turbo-0125',
                        contextLength: 16385,
                        parametersSize: '',
                        active: false
                    },
                    {
                        name: 'GPT 3.5 Turbo 1106',
                        modelId: 'gpt-3.5-turbo-1106',
                        contextLength: 16385,
                        parametersSize: '',
                        active: false
                    },
                    {
                        name: 'Claude 3 Haiku 20240307',
                        modelId: 'claude-3-haiku-20240307',
                        contextLength: 200000,
                        parametersSize: '',
                        active: false
                    },
                    {
                        name: 'Mistral 7B Instruct',
                        modelId: 'mistral-7b-instruct',
                        contextLength: 32768,
                        parametersSize: '7B',
                        active: false
                    },
                    {
                        name: 'Mixtral 8x7B Instruct',
                        modelId: 'mixtral-8x7b-instruct',
                        contextLength: 32768,
                        parametersSize: '8x7B',
                        active: false
                    },
                ],
                awanllm: [
                    {
                        name: 'LLama 3.1 8B Instruct',
                        modelId: 'Meta-Llama-3.1-8B-Instruct',
                        contextLength: 131072,
                        parametersSize: '8B',
                        active: false
                    },
                    {
                        name: 'LLama 3 8B Instruct',
                        modelId: 'Meta-Llama-3-8B-Instruct',
                        contextLength: 8192,
                        parametersSize: '8B',
                        active: false
                    },
                    {
                        name: 'Awanllm LLama 3 8B Dolfin',
                        modelId: 'Awanllm-Llama-3-8B-Dolfin',
                        contextLength: 8192,
                        parametersSize: '8B',
                        active: false
                    },
                    {
                        name: 'Awanllm LLama 3 8B Cumulus',
                        modelId: 'Awanllm-Llama-3-8B-Cumulus',
                        contextLength: 8192,
                        parametersSize: '8B',
                        active: false
                    },
                    {
                        name: 'Llama 3.1 70B Instruct',
                        modelId: 'Meta-Llama-3.1-70B-Instruct',
                        contextLength: 131072,
                        parametersSize: '70B',
                        active: false
                    },
                    {
                        name: 'Llama 3 70B Instruct',
                        modelId: 'Meta-Llama-3-70B-Instruct',
                        contextLength: 8192,
                        parametersSize: '70B',
                        active: false
                    },
                ]
            }
        }
    }
    const content = JSON.stringify(config)
    try{
        await writeFile("config.json", content, false)
        return "Configurações salvas com sucesso!"
    }catch(e){
        return "Erro ao salvar configurações: "+e
    }
}

const readConfig = async () => {
    const config = await readFile('config.json')
    if(config == "Erro ao ler arquivo"){
        console.log("Arquivo de configurações não encontrado. Criando...")
        try{
            await saveConfig()
            console.log("Arquivo de configuração criado com sucesso!")
            const data = await readFile('config.json')
            return JSON.parse(data)
        }catch(e){
            console.log("Erro ao criar arquivo de configuração!")
            return "Erro ao ler arquivo de configuração!"
        }
    }
    return JSON.parse(config)
}

const getApiKeys = async () => {
    const config = await readConfig()
    const apiKeys = config.apiKeys
    return apiKeys
}

const getModels = async () => {
    const config = await readConfig()
    const models = config.models
    return models
}

const getChat = async (id) => {
    const file = `/chats/${id}`
    // console.log(file)
    try{
        const chat = await readFile(file)
        // console.log(chat)
        return JSON.parse(chat)
    }catch(e){
        return `erro ao tentar ler o arquivo ${file} | ${e}`
    }
    
}

const saveChat = async (chat) => {
    const content = JSON.stringify(chat)
    // console.log(content)
    try{
        await writeFile(`/chats/${chat.id}.json`, content, false)
    }catch(e){
        return "Erro ao salvar conversa"
    }
}

const saveChatMessages = async (chatId, messages) => {
    const content = JSON.stringify(messages)
    // console.log(content)
    try{
        try{createDir('/chats/messages')}catch(e){}
        await writeFile(`/chats/messages/${chatId}.json`, content, false)
    }catch(e){
        return "Erro ao salvar conversa"
    }
}

const removeChat = async (chat) => {
    try{
        await removeFile(`chats\\${chat.id}.json`)
        await removeFile(`chats\\messages\\${chat.id}.json`)
        return "Chat deletado com sucesso!"
    }catch(e){
        return "Erro ao deletar o chat!"
    }
}

const getChats = async () => {
    let chats = []
    try{
        const entries = await readDir(`${baseDocPath}\\chats`, { baseDir: BaseDirectory.Document, recursive: true });
        for (const entry of entries) {
            // console.log(entry)
            if(!entry.isDirectory)
                chats.push(entry)
        }
    }catch(e){
        console.log("Pasta de Chats não encontrada! Criando...")
        createDir('chats')
        console.log("Pasta criada com sucesso!")
    }
    return chats
}

const getChatMessages = async (id) => {
    const file = `chats\\messages\\${id}.json`
    // console.log(file)
    const chat = await readFile(file)
    return JSON.parse(chat)
}

export { 
    writeFile, 
    saveConfig, 
    readConfig, 
    getApiKeys, 
    getModels, 
    getChat, 
    getChats,
    saveChat,
    saveChatMessages,
    removeChat,
    getChatMessages,
 }