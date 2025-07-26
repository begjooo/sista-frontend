<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';
import Button from '@/components/ui/button/Button.vue';
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

const router = useRouter()

const username = localStorage.getItem('username')
const props = defineProps(['currentData'])

const inputMinat = ref('')
const newData = ref(props.currentData)

function tambah(minat) {
  newData.value.push(minat)
  inputMinat.value = ''
}

function hapus(index) {
  newData.value.splice(index, 1)
}

async function submit() {
  console.log(`update minat`)
  console.log(newData.value)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/minat/tambah`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData.value),
    })

    const result = await response.json()

    if (result.status) {
      console.log(`update data success`)
      // router.push('/')
    } else {
      console.log(`update data failed!`)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="">
        Edit Minat
      </Button>
    </DialogTrigger>
    <DialogContent class="min-w-[200px]">
      <DialogHeader>
        <DialogTitle>Data Minat Penelitian</DialogTitle>
        <DialogDescription>Tambahkan minat penelitian satu per satu</DialogDescription>
      </DialogHeader>

      <div class="max-h-[200px] flex flex-col overflow-auto text-sm">
        <div v-for="(minat, index) in newData" class="flex justify-between">
          <div class="content-center">{{ minat }}</div>
          <Button variant="link" @click="hapus(index)">Hapus</Button>
        </div>
      </div>

      <input type="text" class="border rounded-md px-2 py-1 text-sm" placeholder="" v-model="inputMinat" />
      <Button @click="tambah(inputMinat)" class="w-[100px] text-start bg-green-600 hover:bg-green-800">+
        Minat
      </Button>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
        </DialogClose>
        <Button class="cursor-pointer w-[150px]" @click="submit">Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>