<script setup>
import { baseUrl } from '@/baseUrl';
import IconTrash from '@/components/icons/IconTrash.vue';
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

const props = defineProps(['job', 'username', 'w', 'h']);

async function hapus() {
  console.log(`hapus ${props.job} ${props.username}`)
  try {
    await fetch(`${baseUrl}/admin/${props.job}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: props.username }),
    })
  } catch (error) {
    console.log(error.message)
  }
};
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <IconTrash id="icon-delete" :width="props.w" :height="props.h" />
    </AlertDialogTrigger>

    <AlertDialogContent class="w-[400px]">
      <AlertDialogHeader>
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogDescription>
          Yakin ingin <span class="font-bold">menghapus</span> akun ini?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel class="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="hapus(props.job, props.username)" class="cursor-pointer">
          Saya sangat yakin!
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>