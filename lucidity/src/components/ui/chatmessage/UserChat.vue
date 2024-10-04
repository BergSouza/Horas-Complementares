<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { marked } from 'marked';

const props = defineProps(['text'])

</script>
<template>
    <div class="mb-4 text-sm shadow-md flex w-[calc(100%-200px)]">
        <Avatar class="float-left m-4">
            <AvatarImage src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="@radix-vue" />
            <AvatarFallback class="text-neutral-700">CN</AvatarFallback>
        </Avatar>
        <div class="min-h-[40px] text-white pt-[25px] max-w-[calc(100%-100px)]">
            <div v-html="marked(props.text)"></div>
            <!-- <Badge class="float-right mx-4">User</Badge> -->
        </div>
    </div>
</template>