<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import { useRouter } from 'vue-router';
import Header from '@/components/dosen/layout/Header.vue';
import TugasAkhir from '@/components/dosen/layout/sidebar/TugasAkhir.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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

const router = useRouter()
const username = localStorage.getItem('username')

const currentUsulan = ref({})
const inputMinat = ref('')
const inputSkema = ref('')
const inputJudul = ref('')
const inputDeskripsi = ref('')

function goToMinat() {
  router.push('/dosen/profile/penelitian')
  localStorage.setItem('headerIndex', 2)
  localStorage.setItem('sidebarIndex', 2)
}

async function submitUsulan() {
  console.log(`submitUsulan`)
  const newData = {
    kbk: currentUsulan.value.kbk,
    minat: inputMinat.value,
    skema: inputSkema.value,
    judul: inputJudul.value,
    deskripsi: inputDeskripsi.value,
    mhs_pengusul: [],
    mhs_diskusi: [],
  }

  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })

    const result = await response.json()

    if (result.status) {
      console.log(`update data success`)
      if (!currentUsulan.value.usulanTa) {
        currentUsulan.value.usulanTa = []
      }

      currentUsulan.value.usulanTa.push(newData)
      inputMinat.value = ''
      inputSkema.value = ''
      inputJudul.value = ''
      inputDeskripsi.value = ''
    } else {
      console.log(`update data failed!`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function hapusUsulan(index, taId) {
  console.log(`hapusUsulan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, index }),
    });

    const result = await response.json()
    if (result.status) {
      currentUsulan.value.usulanTa.splice(index, 1)
    } else {
      console.log(result.message)
    }
  } catch (error) {
    console.log(error.message)
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
      await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/diskusi`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taId, dosenUsername: username, mhsUsername, mhsName, degree: degree, message: inputMsg.value })
      })

      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }
}

async function tolakUsulan(taId, mhsUsername) {
  console.log(`tolakUsulan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/tolak`, {
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

async function tolakDiskusi(taId, mhsUsername) {
  console.log(`tolakDiskusi`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/diskusi`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, mhsUsername })
    })

    const result = await response.json()
    if (result) {
      console.log(`tolak mhs success`)
      window.location.reload()
    } else {
      console.log(`tolak mhs failed`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function terimaBimbingan(taId, mhsUsername, mhsName) {
  console.log(`terimaBimbingan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/terima`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, mhsUsername, mhsName })
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
  console.log(`Usulan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan`)
    currentUsulan.value = await response.json()
  } catch (error) {
    console.log(error.message)
    currentUsulan.value = {}
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side">
    <div class="p-2 text-sm">
      <div class="text-justify mb-2">
        <b>Usulan Judul</b> merupakan judul tugas akhir yang ditawarkan kepada mahasiswa oleh dosen. Judul yang
        diusulkan
        akan tampil pada setiap akun mahasiswa. Mahasiswa yang tertarik dengan judul yang anda usulakan dapat
        mengajukan
        dirinya. Jika anda menerima mahasiswa tersebut maka mahasiswa tersebut akan menjadi mahasiswa bimbingan anda.
      </div>

      <div>
        <div v-if="currentUsulan.usulanTa">
          <div v-if="currentUsulan.jmlBimbinganUtama === 6">
            <div class="font-semibold text-center text-base mb-2">
              Kuota anda sebagai pembimbing utama sudah penuh ({{ currentUsulan.jmlBimbinganUtama }})
            </div>
          </div>
          <div v-else class="">
            <div class="font-semibold font-mono">
              Jumlah mahasiswa sebagai pembimbing utama: <span class="text-blue-600">
                {{ currentUsulan.jmlBimbinganUtama }}</span>
            </div>
            <div class="font-semibold font-mono">
              Kuota tersisa: <span class="text-red-500">{{ 6 - currentUsulan.jmlBimbinganUtama }}</span>
            </div>

            <div class="rounded-md">
              <div v-if="currentUsulan.usulanTa.length === 0">
                <div class="font-semibold text-center">Anda belum mengusulkan Judul Tugas Akhir untuk
                  mahasiswa<br>Silahkan buat
                  Usulan Tugas Akhir</div>
              </div>
              <div v-else>
                <div class="font-semibold mb-2 text-center">Daftar Usulan Tugas Akhir</div>
              </div>
              <div class="flex flex-col gap-2">
                <div v-for="(usulan, usulanIndex) in currentUsulan.usulanTa" class="rounded-md p-2 bg-blue-100">
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
                  <div class="md:flex border-b border-[#334D80] mb-1 pb-1">
                    <div class="min-w-[150px]">Deskripsi</div>
                    <div class="text-justify flex-auto">{{ usulan.deskripsi }}</div>
                  </div>
                  <div class="">
                    <div v-if="usulan.mhs_pengusul.length !== 0" class="border-b border-[#334D80] mb-1 pb-1">
                      <div>
                        <span class="font-semibold">Permintaan</span> dari mahasiswa
                      </div>
                      <div v-for="(mhs, mhsIndex) in usulan.mhs_pengusul">
                        <div class="flex flex-wrap gap-1">
                          <div class="content-center pr-4">
                            {{ mhsIndex + 1 }}. {{ mhs.name }}
                          </div>
                          <LihatMhs :mhsUsername="mhs.username" />
                          <div>
                            <Dialog>
                              <DialogTrigger as-child>
                                <svg class="text-blue-600 hover:text-blue-700 cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 20">
                                  <path fill="currentColor"
                                    d="m6 18l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-.85-2H20V4H4v13.125zM4 16V4zm3-2h6q.425 0 .713-.288T14 13t-.288-.712T13 12H7q-.425 0-.712.288T6 13t.288.713T7 14m0-3h10q.425 0 .713-.288T18 10t-.288-.712T17 9H7q-.425 0-.712.288T6 10t.288.713T7 11m0-3h10q.425 0 .713-.288T18 7t-.288-.712T17 6H7q-.425 0-.712.288T6 7t.288.713T7 8" />
                                </svg>
                              </DialogTrigger>

                              <DialogContent class="min-w-[200px]">
                                <DialogHeader>
                                  <DialogTitle></DialogTitle>
                                  <DialogDescription>
                                    Kirim pesan kepada <span class="font-semibold">{{ mhs.name }}</span> untuk waktu dan
                                    tempat diskusi
                                  </DialogDescription>
                                </DialogHeader>

                                <textarea type="text"
                                  class="border rounded-md px-2 py-1 text-sm max-h-[200px] min-h-[50px]"
                                  placeholder="Hari Senin dd-mm-yyyy pukul hh:mm WIB di ..." v-model="inputMsg" />

                                <DialogFooter>
                                  <DialogClose as-child>
                                    <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                                  </DialogClose>
                                  <Button class="cursor-pointer w-[100px]" :disabled="!inputMsg"
                                    @click="diskusi(usulan.id, mhs.username, mhs.name, mhs.degree)">
                                    Send
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div>
                            <Dialog>
                              <DialogTrigger as-child>
                                <svg class="text-red-600 hover:text-red-700 cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                  <path fill="currentColor"
                                    d="M17.4 13L16 11.6l2.075-2.1L16 7.425L17.4 6l2.1 2.1L21.575 6L23 7.425L20.9 9.5l2.1 2.1l-1.425 1.4l-2.075-2.075zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" />
                                </svg>
                              </DialogTrigger>

                              <DialogContent class="min-w-[200px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Yakin ingin menolak {{ mhs.name }} sebagai {{ mhs.degree }}?
                                  </DialogTitle>
                                  <DialogDescription></DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                  <DialogClose as-child>
                                    <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                                  </DialogClose>
                                  <Button class="cursor-pointer" @click="tolakUsulan(usulan.id, mhs.username)">
                                    Yes i'am sure
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="usulan.mhs_diskusi.length !== 0" class="border-b border-[#334D80] mb-1 pb-1">
                      <div>
                        <span class="font-semibold">Diskusi</span> dengan mahasiswa
                      </div>
                      <div>
                        <div v-for="(mhs, mhsIndex) in usulan.mhs_diskusi">
                          <div class="flex flex-wrap gap-1">
                            <div class="content-center pr-4">
                              {{ mhsIndex + 1 }}. {{ mhs.name }}
                            </div>
                            <LihatMhs :mhsUsername="mhs.username" />
                            <div>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <svg class="text-green-600 hover:text-green-700 cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                      d="M17.55 12L14 8.45l1.425-1.4l2.125 2.125l4.25-4.25l1.4 1.425zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" />
                                  </svg>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Yakin ingin menerima {{ mhs.name }} sebagai {{ mhs.degree }}?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Anda tidak dapat membatalkannya jika anda menerimanya!
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <div class="text-sm max-h-[200px] overflow-auto">
                                    <div class="grid grid-cols-4 gap-x-2">
                                      <div class="truncate">Nama</div>
                                      <div class="col-span-3 truncate font-semibold">{{ mhs.name }}</div>
                                      <div class="truncate">Posisi</div>
                                      <div class="col-span-3 truncate font-semibold">{{ mhs.degree }}</div>
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
                                    <AlertDialogAction
                                      @click="terimaBimbingan(usulan.id, mhs.username, mhs.name, usulanIndex)">
                                      Yes i'am sure
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                            <div>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <svg class="text-red-600 hover:text-red-700 cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                      d="M17.4 13L16 11.6l2.075-2.1L16 7.425L17.4 6l2.1 2.1L21.575 6L23 7.425L20.9 9.5l2.1 2.1l-1.425 1.4l-2.075-2.075zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" />
                                  </svg>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Yakin ingin menolak {{ mhs.name }} sebagai {{ mhs.degree }}?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription></AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction @click="tolakDiskusi(usulan.id, mhs.username)">
                                      Yes i'am sure
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                            <div class="">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger class="flex flex-wrap">
                                    <div class="content-center border-l-4 ml-4 mr-2">
                                      {{ mhs.msg }}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                      <path fill="currentColor"
                                        d="M12 3C6.5 3 2 6.58 2 11a7.22 7.22 0 0 0 2.75 5.5c0 .6-.42 2.17-2.75 4.5c2.37-.11 4.64-1 6.47-2.5c1.14.33 2.34.5 3.53.5c5.5 0 10-3.58 10-8s-4.5-8-10-8m0 14c-4.42 0-8-2.69-8-6s3.58-6 8-6s8 2.69 8 6s-3.58 6-8 6m5-5v-2h-2v2zm-4 0v-2h-2v2zm-4 0v-2H7v2z" />
                                    </svg>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Janji diskusi dengan mahasiswa</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div class="text-red-600 hover:text-red-400 cursor-pointer mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                          </svg>
                        </div>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Yakin ingin menghapus judul?</AlertDialogTitle>
                          <AlertDialogDescription>
                            {{ usulan.judul }} akan dihapus secara permanen dan tidak dapat dipulihkan!
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction @click="hapusUsulan(usulanIndex, usulan.id)">Yes i'am sure
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap my-2">
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="">
                    Buat Usulan
                  </Button>
                </DialogTrigger>
                <DialogContent class="min-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Usulkan Tugas Akhir</DialogTitle>
                    <DialogDescription>Mahasiswa dapat melihat dan mengajukan diri terhadap Judul TA yang anda usulkan
                    </DialogDescription>
                  </DialogHeader>

                  <div v-if="currentUsulan.minat && currentUsulan.minat.length !== 0">
                    <div class="flex flex-col gap-2 text-sm">
                      <div class="flex flex-wrap justify-between">
                        <Label for="minat" class="min-w-[20vh] max-w-[20vh]">Minat</Label>
                        <Select id="minat" v-model="inputMinat">
                          <SelectTrigger class="min-w-[200px] w-[300px]">
                            <SelectValue placeholder="Minat Penelitian" />
                          </SelectTrigger>
                          <SelectContent>
                            <div v-for="minat in currentUsulan.minat">
                              <SelectItem :value="minat">{{ minat }}</SelectItem>
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="flex flex-wrap justify-between">
                        <label for="skema" class=" content-center min-w-[20vh] max-w-[20vh]">Skema</label>
                        <Select id="skema" v-model="inputSkema">
                          <SelectTrigger class="min-w-[200px] w-[300px]">
                            <SelectValue placeholder="Skema Tugas Akhir" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Penelitian">Penelitian</SelectItem>
                            <SelectItem value="Pengabdian">Pengabdian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="flex flex-wrap justify-between">
                        <div class="content-center">Judul</div>
                        <input class="border rounded-md min-w-[200px] w-[300px] px-2 py-1" v-model="inputJudul" />
                      </div>
                      <div class="flex flex-wrap justify-between">
                        <div>Deskripsi</div>
                        <textarea :rows="4"
                          class="border rounded-md min-h-[100px] max-h-[200px] min-w-[200px] w-[300px] px-2 py-1"
                          v-model="inputDeskripsi" />
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center text-sm">
                    <div>
                      Anda harus menambahkan "Minat Penelitian" anda untuk mengusulkan Judul Tugas Akhir kepada para
                      mahasiswa
                    </div>
                    <br>
                    <div class="font-semibold font-mono">
                      Profile > Penelitian > Tambah Minat
                    </div>
                    <div>
                      <Button variant="link" class="font-mono cursor-pointer" @click="goToMinat">
                        Go to Tambah Minat
                      </Button>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose as-child>
                      <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
                    </DialogClose>
                    <DialogClose as-child>
                      <Button class="cursor-pointer w-[100px]"
                        :disabled="!inputMinat || !inputJudul || !inputDeskripsi || !inputSkema" @click="submitUsulan">
                        Submit
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>