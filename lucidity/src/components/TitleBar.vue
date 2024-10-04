<script setup>
import { Window } from '@tauri-apps/api/window';
import { VscChromeMinimize } from "vue3-icons/vsc";
import { FaRegSquare } from "vue3-icons/fa";
import { TbArrowsDiagonalMinimize2 } from "vue3-icons/tb";
import { IoMdClose } from "vue3-icons/io";
import { reactive } from 'vue';

const appWindow = new Window('main');

const state = reactive({
    window: 'not_maximized'
})

const buttonHandler = async (action) => {
    if(action == 'minimize') appWindow.minimize()
    if(action == 'maximize') appWindow.toggleMaximize()
    if(action == 'close' ) appWindow.close()

    await appWindow.onResized(async () => {
        const isMiximized = await appWindow.isMaximized()
        if(isMiximized){
            state.window = 'maximized'
        }else{
            state.window = 'not_maximized'
        }
    })
}

</script>

<template>
    <div data-tauri-drag-region class="titlebar text-center">
    <div class="titlebar-button" id="titlebar-minimize" :onclick="() => buttonHandler('minimize')">
      <VscChromeMinimize class="h-[10px]" />
    </div>
    <div class="titlebar-button" id="titlebar-maximize" :onclick="() => buttonHandler('maximize')">
      <FaRegSquare class="h-[10px]" v-if="state.window == 'not_maximized'" />
      <TbArrowsDiagonalMinimize2 class="h-[13px]" v-if="state.window == 'maximized'" />
    </div>
    <div class="titlebar-button" id="titlebar-close" :onclick="() => buttonHandler('close')">
      <IoMdClose />
    </div>
  </div>
</template>
<style>

#titlebar-minimize {
  background: rgb(255, 255, 255);
}

#titlebar-minimize:hover {
    background: rgb(253, 216, 95);
}
#titlebar-maximize {
    background: rgb(255, 255, 255);
}

#titlebar-maximize:hover {
    background: rgb(133, 255, 103);
}

#titlebar-close {
    background: rgb(255, 107, 107);
}

#titlebar-close:hover {
    background: rgb(238, 45, 45);
}

.titlebar {
    height: 30px;
    background: #00000000;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.titlebar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    user-select: none;
    -webkit-user-select: none;
    border-radius: 20%;
    margin: 2px;
}
.titlebar-button:hover {
    background: #d6d6d6;
    transition: 0.3s;
}
</style>