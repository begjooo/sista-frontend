<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Label } from '@/components/ui/label'
import Button from '@/components/ui/button/Button.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { baseUrl } from '@/baseUrl';

const router = useRouter()

const username = localStorage.getItem('username')

const props = defineProps(['currentData', 'dbName'])

const newData = ref({
  minat: [],
})

async function submit() {
  console.log(`update data penelitian`)
  console.log(newData.value)
  try {
    const response = await fetch(`${baseUrl}/${props.dbName}/data/${username}/penelitian/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData.value),
    })

    const status = await response.json()

    if (status) {
      console.log(`update data success`)
      // router.push('/')
    } else {
      console.log(`update data failed!`)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  // try {
  //   const response = await fetch(`${baseUrl}/dosen/data/${username}`)
  // props.currentData.value = await response.json()
  newData.value.kbk = props.currentData.kbk
  // } catch (error) {
  //   console.log(error)
  // }
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="">
        Edit Data
      </Button>
    </DialogTrigger>
    <DialogContent class="min-w-[200px]">
      <DialogHeader>
        <DialogTitle>Data Penelitian</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
        </DialogClose>
        <Button class="cursor-pointer w-[100px]" @click="submit">Submit</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>