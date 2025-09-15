<script setup>
import { onMounted, ref } from 'vue';
import { Label } from '@/components/ui/label'
import Button from '@/components/ui/button/Button.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
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

const props = defineProps(['username', 'currentData', 'w', 'h'])

const w = ref()
const h = ref()

if (props.w) {
  w.value = props.w
} else {
  w.value = '32'
}

if (props.h) {
  h.value = props.h
} else {
  h.value = '32'
}

const yearPresent = new Date().getFullYear()

// const currentData = ref({})
const newData = ref({
  name: '',
  email: '',
  prodi: '',
  kelas: '',
  tahun_ajaran: '',
})

function checkEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

async function submit() {
  const isEmailValid = checkEmail(newData.value.email)
  if (isEmailValid) {
    console.log(`email valid`)
    console.log(`update data`)
    try {
      const response = await fetch(`${baseUrl}/mhs/${props.username}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(newData.value),
      })

      const status = await response.json()
      // console.log(status)
      if (status) {
        console.log(`update data success`)
        window.location.reload()
      } else {
        console.log(`update data failed!`)
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log(`email invalid`)
  }
}

onMounted(async () => {
  try {
    newData.value.name = props.currentData.name
    newData.value.email = props.currentData.email
    newData.value.prodi = props.currentData.prodi
    newData.value.kelas = props.currentData.kelas
    newData.value.tahun_ajaran = props.currentData.tahun_ajaran
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <svg id="icon-edit" :width="w" :height="h" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M14 21v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zM4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362L12 17.1V20zm16.575-4.6l.925-.975l-.925-.925l-.95.95zM12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12" />
      </svg>
    </DialogTrigger>
    <DialogContent class="min-w-[200px] text-sm">
      <DialogHeader>
        <DialogTitle>Ubah Data Pribadi</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div class="grid items-center gap-2">
        <div class="flex gap-4">
          <Label for="name" class="min-w-[20vh] max-w-[20vh]">Nama</Label>
          <input id="name" placeholder="Nama" class="w-full border rounded-sm py-1 px-2 min-w-[20vh]"
            v-model="newData.name" />
        </div>
        <div class="flex gap-4">
          <Label for="email" class="min-w-[20vh] max-w-[20vh]">Email</Label>
          <input type="email" id="email" placeholder="xxx@yyy.zzz"
            class="w-full border rounded-sm py-1 px-2 min-w-[20vh]" v-model="newData.email" />
        </div>
        <div class="flex gap-4">
          <Label for="prodi" class="min-w-[20vh] max-w-[20vh]">Program Studi</Label>
          <Select id="prodi" v-model="newData.prodi">
            <SelectTrigger class="w-full min-w-[20vh]">
              <SelectValue placeholder="Prog. Studi" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="D3 Teknik Telekomunikasi">
                D3 Teknik Telekomunikasi
              </SelectItem>
              <SelectItem value="D4 Teknik Telekomunikasi">
                D4 Teknik Telekomunikasi
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex gap-4">
          <Label for="kelas" class="min-w-[20vh] max-w-[20vh]">Kelas</Label>
          <Select id="kelas" v-model="newData.kelas">
            <SelectTrigger class="w-full min-w-[20vh]">
              <SelectValue placeholder="Kelas" />
            </SelectTrigger>

            <SelectContent>
              <div v-if="newData.prodi === 'D3 Teknik Telekomunikasi'">
                <SelectItem value="3A-TTE">3A-TTE</SelectItem>
                <SelectItem value="3B-TTE">3B-TTE</SelectItem>
                <SelectItem value="3C-TTE">3C-TTE</SelectItem>
              </div>
              <div v-else-if="newData.prodi === 'D4 Teknik Telekomunikasi'">
                <SelectItem value="4A-TNK">4A-TNK</SelectItem>
                <SelectItem value="4B-TNK">4B-TNK</SelectItem>
                <SelectItem value="4C-TNK">4C-TNK</SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>
        <div class="flex gap-4">
          <Label for="tahunAjaran" class="min-w-[20vh] max-w-[20vh]">Tahun Ajaran</Label>
          <Select id="tahunAjaran" v-model="newData.tahun_ajaran">
            <SelectTrigger class="w-full min-w-[20vh]">
              <SelectValue placeholder="Tahun Ajaran" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem :value="(yearPresent - 1) + '/' + (yearPresent)">
                {{ yearPresent - 1 }}/{{ yearPresent }}
              </SelectItem>
              <SelectItem :value="(yearPresent) + '/' + (yearPresent + 1)">
                {{ yearPresent }}/{{ yearPresent + 1 }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
        </DialogClose>
        <Button class="cursor-pointer w-[100px]" @click="submit">Submit</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>