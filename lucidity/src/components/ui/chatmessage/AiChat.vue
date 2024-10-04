<script setup>
import { defineProps } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { marked } from 'marked';

const props = defineProps(['text', 'model'])

</script>
<template>
    <div class="mb-4 text-sm shadow-md flex w-[calc(100%-200px)]">
        <Avatar  v-if="props.text.length > 0" class="float-left m-4">
            <AvatarImage src="https://static.thenounproject.com/png/1011565-200.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Skeleton v-else class="float-left m-4 w-[40px] h-[40px] rounded-full" />
        <div v-if="props.text.length > 0" class="min-h-[70px] max-w-[calc(100%-100px)] bg-neutral-900 text-white p-[15px] rounded-lg shadow-sm shadow-neutral-700">
            <div v-html="marked(props.text)"></div>
            <Badge class="float-right mx-4">{{ props.model }}</Badge>
        </div>
        <div v-else class="flex flex-col space-y-1 w-[100%] mt-2">
            <div class="flex space-x-2">
                <Skeleton class="w-[40%] h-4 rounded-full" />
                <Skeleton class="w-[50%] h-4 rounded-full" />
            </div>
            <div class="flex space-x-2">
                <Skeleton class="w-[70%] h-4 rounded-full" />
                <Skeleton class="w-[20%] h-4 rounded-full" />
            </div>
            <div class="flex space-x-2">
                <Skeleton class="w-[30%] h-4 rounded-full" />
                <Skeleton class="w-[30%] h-4 rounded-full" />
                <Skeleton class="w-[29%] h-4 rounded-full" />
            </div>
        </div>
    </div>
</template>
