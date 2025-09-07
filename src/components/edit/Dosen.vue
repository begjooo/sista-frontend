<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
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

const router = useRouter()

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

// const currentData = ref({})
const newData = ref({
  name: '',
  nip: '',
  email: '',
  kbk: '',
  jabatan_fungsional: '',
  gelar_depan: '',
  gelar_belakang: '',
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
      const response = await fetch(`${baseUrl}/dosen/${props.username}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData.value),
      })

      const status = await response.json()
      // console.log(status)
      if (status) {
        console.log(`update data success`)
        router.push('/')
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
    newData.value.nip = props.currentData.nip
    newData.value.kbk = props.currentData.kbk
    newData.value.jabatan_fungsional = props.currentData.jabatan_fungsional
    newData.value.gelar_depan = props.currentData.gelar_depan
    newData.value.gelar_belakang = props.currentData.gelar_belakang
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <svg id="icon-edit" xmlns="http://www.w3.org/2000/svg" :width="w" :height="h" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M14 21v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zM4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362L12 17.1V20zm16.575-4.6l.925-.975l-.925-.925l-.95.95zM12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12" />
        </svg>
      </DialogTrigger>
      <DialogContent class="min-w-[200px]">
        <DialogHeader>
          <DialogTitle>Data Pribadi</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div class="grid items-center gap-2 text-sm">
          <div class="flex gap-4">
            <Label for="name" class="min-w-[20vh] max-w-[20vh]">Nama</Label>
            <input id="name" placeholder="Nama" class="w-full border rounded-sm py-1 px-2 min-w-[20vh]"
              v-model="newData.name" />
          </div>
          <div class="flex gap-4">
            <Label for="nip" class="min-w-[20vh] max-w-[20vh]">NIP</Label>
            <input id="nip" placeholder="Nomor Induk Pegawai" class="w-full border rounded-sm py-1 px-2 min-w-[20vh]"
              v-model="newData.nip" />
          </div>
          <div class="flex gap-4">
            <Label for="email" class="min-w-[20vh] max-w-[20vh]">Email</Label>
            <input type="email" id="email" placeholder="xxx@yyy.zzz"
              class="w-full border rounded-sm py-1 px-2 min-w-[20vh]" v-model="newData.email" />
          </div>
          <div class="flex gap-4">
            <Label for="jafung" class="min-w-[20vh] max-w-[20vh]">KBK</Label>
            <Select id="jafung" v-model="newData.kbk">
              <SelectTrigger class="w-full min-w-[20vh]">
                <SelectValue placeholder="KBK" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Nirkabel">Nirkabel</SelectItem>
                <SelectItem value="Infrastruktur Jaringan">Infrastruktur Jaringan</SelectItem>
                <SelectItem value="Layanan dan Aplikasi">Layanan dan Aplikasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex gap-4">
            <Label for="jafung" class="min-w-[20vh] max-w-[20vh]">Jabatan Fungsional</Label>
            <Select id="jafung" v-model="newData.jabatan_fungsional">
              <SelectTrigger class="w-full min-w-[20vh]">
                <SelectValue placeholder="Jab. Funsional" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CPNS">CPNS</SelectItem>
                <SelectItem value="Asisten Ahli">Asisten Ahli</SelectItem>
                <SelectItem value="Lektor">Lektor</SelectItem>
                <SelectItem value="Lektor Kepala">Lektor Kepala</SelectItem>
                <SelectItem value="Guru Besar">Guru Besar</SelectItem>
                <SelectItem value="Purnabakti">Purnabakti</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex gap-4">
            <Label for="gelarDepan" class="min-w-[20vh] max-w-[20vh]">Gelar Depan</Label>
            <input id="gelarDepan" placeholder="Prof., Dr., Ir., ..."
              class="w-full border rounded-sm py-1 px-2 min-w-[20vh]" v-model="newData.gelar_depan" />
          </div>
          <div class="flex gap-4">
            <Label for="gelarBelakang" class="min-w-[20vh] max-w-[20vh]">Gelar Belakang</Label>
            <input id="gelarBelakang" placeholder="A. Md., S.T., M.T., ..."
              class="w-full border rounded-sm py-1 px-2 min-w-[20vh]" v-model="newData.gelar_belakang" />
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
  </div>
</template>