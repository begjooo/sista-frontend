<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { baseUrl } from '@/baseUrl'
import { Button } from '@/components/ui/button'
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

import Header from '@/components/header/Dosen.vue';
import TugasAkhir from '@/components/sidebar/dosen/TugasAkhir.vue';

const username = localStorage.getItem('username')
const router = useRouter()

const selectedIndex = ref()
const usulanPdp1List = ref()
const usulanPdp2List = ref()
const selectedUsulanPdpList = ref()

function handleList(index) {
  console.log(`handleList`)

  selectedIndex.value = index

  if (index === 1) {
    selectedUsulanPdpList.value = usulanPdp1List.value
  } else if (index === 2) {
    selectedUsulanPdpList.value = usulanPdp2List.value
  }
}

const mhsDataPribadi = ref()
const mhsCv = ref()
const inputMsg = ref('')

async function lihatMhs(mhsUsername) {
  console.log(`lihatMhs`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${mhsUsername}/data`)
    const data = await response.json()

    if (!data) {
      mhsDataPribadi.value = null
      mhsCv.value = null
    } else {
      mhsDataPribadi.value = data.pribadi
      mhsCv.value = data.cv
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function diskusi(taId, mhsUsername, mhsName, degree) {
  console.log(`diskusi`)
  if (inputMsg.value) {
    try {
      await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-pdp/diskusi`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taId, dosenUsername: username, mhsUsername, message: inputMsg.value })
      })

      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }
}

async function tolak(taId, mhsUsername) {
  console.log(`tolak`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-pdp/tolak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, mhsUsername })
    })

    const result = await response.json()
    if (result.status) {
      window.location.reload()
    } else {
      console.log(result.message)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function terima(taId, degree, mhsUsername, mhsName) {
  console.log(`terima`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-pdp/terima`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, degree, mhsUsername, mhsName })
    })

    const result = await response.json()
    if (result) {
      console.log(`terima mhs success`)
      window.location.reload()
    } else {
      console.log(`terima mhs failed`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(async () => {
  console.log(`onMounted() UsulanPbbPdp`)

  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-pdp`)
    const result = await response.json()
    if (result) {
      usulanPdp1List.value = result.filter((item) => item.degree === 'Pembimbing Pendamping Pertama')
      usulanPdp2List.value = result.filter((item) => item.degree === 'Pembimbing Pendamping Kedua')
    }
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side text-sm">
    <div>
      <div class="text-center text-xl font-semibold py-2 text-blue-800">
        Daftar Permintaan Mahasiswa sebagai Pembimbing Pendamping
      </div>

      <div class="flex flex-wrap gap-2 p-2">
        <div class="border rounded-sm w-[250px]">
          <div class="bg-blue-100 text-center font-semibold p-1">Pilihan PBB</div>
          <div class="p-1 cursor-pointer hover:underline hover:bg-gray-200" @click="handleList(1)"
            :class="{ 'font-semibold': selectedIndex === 1 }">
            Pendamping Pertama
            <span v-if="usulanPdp1List" class="font-semibold">
              [{{ usulanPdp1List.length }} Mhs]
            </span>
          </div>
          <div class="p-1 cursor-pointer hover:underline hover:bg-gray-200" @click="handleList(2)"
            :class="{ 'font-semibold': selectedIndex === 2 }">
            Pendamping Kedua
            <span v-if="usulanPdp2List"class="font-semibold">
              [{{ usulanPdp2List.length }} Mhs]
            </span>
          </div>
        </div>
        <div class="border rounded-sm flex-1 w-full min-h-[80vh] max-h-[80vh] overflow-y-auto">
          <div v-if="selectedIndex">
            <div class="text-center font-semibold pt-2">
              Daftar Mahasiswa
            </div>
          </div>
          <div v-if="selectedUsulanPdpList && selectedUsulanPdpList.length !== 0">
            <div class="p-2 flex flex-col gap-2 border-b">
              <div v-for="usulan in selectedUsulanPdpList" class="rounded-sm p-2" :class="{
                'bg-red-100': usulan.tahap_usulan === 'Pengusulan',
                'bg-blue-100': usulan.tahap_usulan === 'Diskusi'
              }">
                <div class="flex flex-wrap gap-2 justify-between">
                  <div class="flex-1 max-w-[85%]">
                    <div class="flex flex-wrap">
                      <div class="w-[200px] truncate">Nama</div>
                      <div class="flex-1 w-full truncate">{{ usulan.mhs_name }}</div>
                    </div>
                    <div class="flex flex-wrap">
                      <div class="w-[200px] truncate">KBK</div>
                      <div class="flex-1 w-full truncate">{{ usulan.kbk }}</div>
                    </div>
                    <div class="flex flex-wrap">
                      <div class="w-[200px] truncate">Peminatan</div>
                      <div class="flex-1 w-full truncate">{{ usulan.minat }}</div>
                    </div>
                    <div class="flex flex-wrap">
                      <div class="w-[200px] truncate">Skema</div>
                      <div class="flex-1 w-full truncate">{{ usulan.skema }}</div>
                    </div>
                    <div class="flex flex-wrap">
                      <div class="w-[200px] truncate">Judul</div>
                      <div class="flex-1 w-full">{{ usulan.judul }}</div>
                    </div>
                    <div class="flex flex-wrap">
                      <div class="w-[200px] truncate">Dosen PBB Utama</div>
                      <div class="flex-1 w-full truncate">{{ usulan.dosen1_fullname }}</div>
                    </div>
                    <div class="flex flex-wrap" v-if="usulan.dosen2_fullname">
                      <div class="w-[200px] truncate">Dosen PBB Pendamping 1</div>
                      <div class="flex-1 w-full truncate">{{ usulan.dosen2_fullname }}</div>
                    </div>
                    <div class="flex flex-wrap" v-if="usulan.dosen3_fullname">
                      <div class="w-[200px] truncate">Dosen PBB Pendamping 2</div>
                      <div class="flex-1 w-full truncate">{{ usulan.dosen3_fullname }}</div>
                    </div>
                    <div class="flex flex-wrap font-semibold">
                      <div class="w-[200px] truncate">Status</div>
                      <div class="flex-1 w-full truncate">{{ usulan.tahap_usulan }}</div>
                    </div>
                    <div class="flex flex-wrap font-semibold" v-if="usulan.tahap_usulan === 'Diskusi'">
                      <div class="w-[200px] truncate">Janji Diskusi</div>
                      <div class="flex-1 w-full truncate">{{ usulan.msg }}</div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-1">
                    <Dialog>
                      <DialogTrigger as-child>
                        <Button class="cursor-pointer w-[100px]" @click="lihatMhs(usulan.mhs_username)">
                          Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent class="min-w-[300px]">
                        <DialogHeader>
                          <DialogTitle>Data Mahasiswa</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <div v-if="mhsDataPribadi">
                          <div class="border rounded-sm text-sm max-h-[400px] overflow-y-auto px-2 py-1">
                            <div class="">
                              <div class="flex flex-col font-semibold text-center">
                                <div>{{ mhsDataPribadi.name }} [{{ mhsDataPribadi.username }}]</div>
                                <div>{{ mhsDataPribadi.kelas }} | {{ mhsDataPribadi.prodi }} | {{
                                  mhsDataPribadi.tahun_ajaran }}</div>
                              </div>

                              <div class="mt-2">
                                <div class="font-semibold">Curriculum Vitae</div>
                                <div v-if="mhsCv && mhsCv.length !== 0">
                                  <div v-for="cv in mhsCv">
                                    <div>{{ cv }}</div>
                                  </div>
                                </div>
                                <div v-else>
                                  Tidak ada data
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="text-center text-red-600 font-semibold">
                          Data {{ usulan.mhs_name }} NIM {{ usulan.username }} tidak ditemukan!
                        </div>

                        <DialogFooter>
                          <DialogClose as-child>
                          </DialogClose>

                          <DialogClose as-child>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <div v-if="usulan.tahap_usulan === 'Pengusulan'">
                      <Dialog>
                        <DialogTrigger as-child>
                          <Button class="bg-green-600 cursor-pointer w-[100px]" @click="">
                            Diskusi
                          </Button>
                        </DialogTrigger>

                        <DialogContent class="min-w-[200px]">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              Kirim pesan kepada mahasiswa untuk waktu dan tempat diskusi
                            </DialogDescription>
                          </DialogHeader>

                          <textarea type="text" class="border rounded-sm px-2 py-1 text-sm max-h-[200px] min-h-[50px]"
                            placeholder="Saya tunggu hari Senin dd-mm-yyyy pukul hh:mm WIB di ..." v-model="inputMsg" />

                          <DialogFooter>
                            <DialogClose as-child>
                              <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                            </DialogClose>
                            <Button class="cursor-pointer w-[100px]" :disabled="!inputMsg"
                              @click="diskusi(usulan._id, usulan.mhs_username, usulan.mhs_name, usulan.degree)">
                              Send
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div v-else>

                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button class="bg-green-600 cursor-pointer w-[100px]">
                            Terima
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Yakin ingin menerima {{ usulan.mhs_name }} sebagai {{ usulan.degree }}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Anda tidak dapat membatalkannya jika anda menerimanya!
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <div class="text-sm max-h-[200px] overflow-auto">
                            <div class="grid grid-cols-4 gap-x-2">
                              <div class="truncate">Nama</div>
                              <div class="col-span-3 truncate font-semibold">{{ usulan.mhs_name }}</div>
                              <div class="truncate">Posisi</div>
                              <div class="col-span-3 truncate font-semibold">{{ usulan.degree }}</div>
                              <div class="truncate">KBK</div>
                              <div class="col-span-3 truncate font-semibold">{{ usulan.kbk }}</div>
                              <div class="truncate">Peminatan</div>
                              <div class="col-span-3 truncate font-semibold">{{ usulan.minat }}</div>
                              <div class="truncate">Judul</div>
                              <div class="col-span-3 font-semibold">{{ usulan.judul }}</div>
                            </div>
                          </div>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              @click="terima(usulan._id, usulan.degree, usulan.mhs_username, usulan.mhs_name)">
                              Yes i'am sure
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <Dialog>
                      <DialogTrigger as-child>
                        <Button variant="destructive" class="cursor-pointer w-[100px]" @click="">
                          Tolak
                        </Button>
                      </DialogTrigger>

                      <DialogContent class="min-w-[200px]">
                        <DialogHeader>
                          <DialogTitle>
                            Yakin ingin menolak {{ usulan.mhs_name }} sebagai {{ usulan.degree }}?
                          </DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <DialogClose as-child>
                            <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                          </DialogClose>
                          <Button class="cursor-pointer" @click="tolak(usulan._id, usulan.mhs_username)">
                            Yes i'am sure
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

              </div>

            </div>
          </div>
          <div
            v-else-if="(usulanPdp1List && usulanPdp1List.length === 0) && (usulanPdp2List && usulanPdp2List.length === 0)">
            <div class="text-center p-2 italic">
              Anda tidak memiliki permintaan sebagai pembimbing pendamping
            </div>
          </div>
          <div
            v-else-if="(usulanPdp1List && usulanPdp1List.length !== 0) && (usulanPdp2List && usulanPdp2List.length !== 0)">
            <div class="text-center p-2 italic">
              Anda tidak memiliki permintaan sebagai pembimbing pendamping pertama dan kedua
            </div>
          </div>
          <div v-else-if="usulanPdp1List && usulanPdp1List.length !== 0">
            <div class="text-center p-2 italic">
              Anda memiliki permintaan sebagai pembimbing pendamping pertama
            </div>
          </div>
          <div v-else-if="usulanPdp2List && usulanPdp2List.length !== 0">
            <div class="text-center p-2 italic">
              Anda memiliki permintaan sebagai pembimbing pendamping kedua
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>