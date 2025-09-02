<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';
import TugasAkhir from '@/components/dosen/layout/sidebar/TugasAkhir.vue';
import { Button } from '@/components/ui/button';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import LihatMhs from '@/components/mhs/Lihat.vue';

const username = localStorage.getItem('username')
const usulanTaList = ref([])
const mhsDataPribadi = ref()
const mhsCv = ref()
const inputMsg = ref('')

async function lihatMhs(username) {
  console.log(`lihatMhs`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/data`)
    const data = await response.json()
    console.log(data)
    if (!data) {
      mhsDataPribadi.value = null
      mhsCv.value = null
    } else {
      mhsDataPribadi.value = data.pribadi
      mhsCv.value = data.cv
    }
  } catch (error) {
    console.log(error)
  }
}

async function diskusiUsulan(taId, mhsUsername, mhsName) {
  console.log(`diskusiUsulan`)
  if (inputMsg.value) {
    try {
      const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-mhs/diskusi`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taId, dosenUsername: username, mhsUsername, mhsName, message: inputMsg.value })
      })

      const result = await response.json()

      if (result) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
}

async function terimaUsulan(taId, mhsUsername, mhsName) {
  console.log(`terimaUsulan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-mhs/terima`, {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, mhsUsername, mhsName })
    })

    const result = await response.json()
    if (result) {
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}

async function tolakUsulan(taId, mhsUsername) {
  console.log(`tolakUsulan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-mhs/tolak`, {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taId, username: username, mhsUsername })
    })

    const result = await response.json()
    if (result.status) {
      window.location.reload()
    } else {
      console.log(result.message)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  console.log(`onMounted UsulanMhs`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-mhs`)
    usulanTaList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side text-sm">
    <div v-if="usulanTaList && usulanTaList.length !== 0">
      <div v-for="(usulan, usulanIndex) in usulanTaList" class="rounded-md bg-blue-100 m-2 px-2 py-2">
        <div class="flex flex-col">
          <div class="">
            <span v-if="usulan.tahap === 'Pengusulan'">
              <span class="font-semibold">Permintaan</span>
              dari {{ usulan.name }}
            </span>
            <span v-if="usulan.tahap === 'Diskusi'">
              <span class="font-semibold">Diskusi</span>
              dengan {{ usulan.name }}
            </span>
            sebagai <span class="font-semibold">{{ usulan.degree }}</span>
            <div v-if="usulan.tahap === 'Diskusi'">
              <div class="rounded-md py-1 px-2 my-1 bg-white">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger class="italic">{{ usulan.msg }}</TooltipTrigger>
                    <TooltipContent>
                      <p>Janji Diskusi</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>


          <div class="flex flex-wrap">
            <div class="min-w-[150px]">KBK</div>
            <div class="font-semibold">{{ usulan.kbk }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[150px]">Bidang Peminatan</div>
            <div class="font-semibold">{{ usulan.minat }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[150px]">Skema</div>
            <div class="font-semibold">{{ usulan.skema }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[150px]">Judul</div>
            <div class="font-semibold">{{ usulan.judul }}</div>
          </div>
          <div class="md:flex">
            <div class="min-w-[150px] text-center md:text-left">Deskripsi</div>
            <div class="text-justify flex-auto">{{ usulan.deskripsi }}</div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-1">
          <LihatMhs :mhsUsername="usulan.username" />

          <span v-if="usulan.tahap === 'Pengusulan'">
            <Dialog>
              <DialogTrigger as-child>
                <svg class="text-blue-600 hover:text-blue-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                  width="30" height="30" viewBox="0 0 24 20">
                  <path fill="currentColor"
                    d="m6 18l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-.85-2H20V4H4v13.125zM4 16V4zm3-2h6q.425 0 .713-.288T14 13t-.288-.712T13 12H7q-.425 0-.712.288T6 13t.288.713T7 14m0-3h10q.425 0 .713-.288T18 10t-.288-.712T17 9H7q-.425 0-.712.288T6 10t.288.713T7 11m0-3h10q.425 0 .713-.288T18 7t-.288-.712T17 6H7q-.425 0-.712.288T6 7t.288.713T7 8" />
                </svg>
              </DialogTrigger>
              <DialogContent class="min-w-[200px]">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>Kirim pesan kepada mahasiswa untuk waktu dan tempat diskusi</DialogDescription>
                </DialogHeader>

                <textarea type="text" class="border rounded-md px-2 py-1 text-sm max-h-[200px] min-h-[50px]"
                  placeholder="Saya tunggu hari Senin dd-mm-yyyy pukul hh:mm WIB di ..." v-model="inputMsg" />

                <DialogFooter>
                  <DialogClose as-child>
                    <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                  </DialogClose>
                  <Button class="cursor-pointer w-[100px]" :disabled="!inputMsg"
                    @click="diskusiUsulan(usulan.id, usulan.username, usulan.name)">Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </span>

          <span v-else-if="usulan.tahap === 'Diskusi' && usulan.msg">
            <AlertDialog>
              <AlertDialogTrigger>
                <svg class="text-green-600 hover:text-green-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                  width="30" height="30" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M17.55 12L14 8.45l1.425-1.4l2.125 2.125l4.25-4.25l1.4 1.425zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" />
                </svg>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Yakin ingin menerima {{ usulan.name }} sebagai {{ usulan.degree }}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda tidak dapat membatalkannya jika anda menerimanya!
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div class="text-sm max-h-[200px] overflow-auto">
                  <div class="grid grid-cols-4 gap-x-2">
                    <div class="truncate">Nama</div>
                    <div class="col-span-3 truncate font-semibold">{{ usulan.name }}</div>
                    <div class="truncate">Posisi</div>
                    <div class="col-span-3 truncate font-semibold">{{ usulan.degree }}</div>
                    <div class="truncate">KBK</div>
                    <div class="col-span-3 truncate font-semibold">{{ usulan.kbk }}</div>
                    <div class="truncate">Peminatan</div>
                    <div class="col-span-3 truncate font-semibold">{{ usulan.minat }}</div>
                    <div class="truncate">Skema</div>
                    <div class="col-span-3 truncate font-semibold">{{ usulan.skema }}</div>
                    <div class="truncate">Judul</div>
                    <div class="col-span-3 font-semibold">{{ usulan.judul }}</div>
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction @click="terimaUsulan(usulan.id, usulan.username, usulan.name)">
                    Yes i'am sure
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </span>

          <AlertDialog>
            <AlertDialogTrigger>
              <svg class="text-red-600 hover:text-red-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="30"
                height="30" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M17.4 13L16 11.6l2.075-2.1L16 7.425L17.4 6l2.1 2.1L21.575 6L23 7.425L20.9 9.5l2.1 2.1l-1.425 1.4l-2.075-2.075zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" />
              </svg>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Yakin ingin menolak {{ usulan.name }} sebagai {{ usulan.degree }}?
                </AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction @click="tolakUsulan(usulan.id, usulan.username)">
                  Yes i'am sure
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
    <div v-else class="p-2 text-center italic">
      Tidak ada usulan judul dari mahasiswa
    </div>
  </div>
</template>