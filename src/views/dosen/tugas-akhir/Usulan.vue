<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
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


const username = localStorage.getItem('username')
const currentUsulan = ref({})

const inputMinat = ref('')
const inputJudul = ref('')
const inputDeskripsi = ref('')

async function submitUsulan() {
  console.log(`submitUsulan`)
  const newData = {
    kbk: currentUsulan.value.kbk,
    minat: inputMinat.value,
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
  console.log(`hapusUsulan ${index} ${taId}`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId }),
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
const mhsPortofolio = ref()
const inputMsg = ref('')

async function lihatMhs(mhsUsername) {
  console.log(`lihatMhs ${mhsUsername}`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${mhsUsername}/data`)
    const data = await response.json()
    // console.log(data)
    if (!data) {
      mhsDataPribadi.value = null
      mhsPortofolio.value = null
    } else {
      mhsDataPribadi.value = data.pribadi
      mhsPortofolio.value = data.portofolio
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function diskusi(taId, mhsUsername, mhsName, degree, usulanIndex, mhsIndex) {
  console.log(`diskusi`)
  if (inputMsg.value) {
    try {
      await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/diskusi`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taId, dosenUsername: username, mhsUsername, mhsName, degree: degree, message: inputMsg.value })
      })

      currentUsulan.value.usulanTa[usulanIndex].mhs_diskusi.push({
        username: mhsUsername,
        name: mhsName,
        degree,
        msg: inputMsg.value,
      })

      currentUsulan.value.usulanTa[usulanIndex].mhs_pengusul.splice(mhsIndex, 1)

      inputMsg.value = ''
    } catch (error) {
      console.log(error.message)
    }
  }
}

async function tolakUsulan(taId, mhsUsername, usulanIndex, mhsIndex) {
  console.log(`tolakUsulan ${taId} ${mhsUsername} ${mhsIndex}`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/tolak-mhs`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, mhsUsername })
    })

    const result = await response.json()
    if (result.status) {
      currentUsulan.value.usulanTa[usulanIndex].mhs_pengusul.splice(mhsIndex, 1)
    } else {
      console.log(result.message)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function tolakDiskusi(taId, mhsUsername, usulanIndex, mhsIndex) {
  console.log(`tolakDiskusi ${mhsUsername}`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/diskusi`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId, mhsUsername })
    })

    const result = await response.json()
    if (result) {
      currentUsulan.value.usulanTa[usulanIndex].mhs_diskusi.splice(mhsIndex, 1)
      console.log(`tolak mhs success`)
    } else {
      console.log(`tolak mhs failed`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function terimaBimbingan(taId, mhsUsername, mhsName) {
  console.log(`terimaBimbingan ${mhsUsername}`)
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
          <div v-else>
            <div class="">
              Jumlah mahasiswa sebagai pembimbing utama: {{ currentUsulan.jmlBimbinganUtama }}
            </div>
            <div class="">
              Kuota tersisa: {{ 6 - currentUsulan.jmlBimbinganUtama }}
            </div>

            <div class="border rounded-md p-2">
              <div v-if="currentUsulan.usulanTa.length === 0">
                <div class="font-semibold text-center">Anda belum mengusulkan judul TA untuk mahasiswa<br>Silahkan buat
                  Usulan Tugas Akhir</div>
              </div>
              <div v-else>
                <div class="font-semibold mb-2 text-center">Daftar Usulan Tugas Akhir</div>
              </div>
              <div class="flex flex-col gap-2">
                <div v-for="(usulan, usulanIndex) in currentUsulan.usulanTa" class="rounded-md p-2 bg-blue-50">
                  <div class="flex flex-col">
                    <div v-if="usulan.mhs_pengusul.length !== 0" class="border-b border-[#334D80] mb-1 pb-1">
                      <span class="font-semibold ">Permintaan</span>
                      dari
                      <span v-if="usulan.mhs_pengusul.length !== 0">
                        <span v-for="(mhs, mhsIndex) in usulan.mhs_pengusul">
                          <Dialog>
                            <DialogTrigger as-child>
                              <span class="font-semibold cursor-pointer hover:underline"
                                @click="lihatMhs(mhs.username)">
                                {{ mhs.name }}
                              </span>
                            </DialogTrigger>
                            <DialogContent class="min-w-[300px]">
                              <DialogHeader>
                                <DialogTitle>Data Mahasiswa</DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>

                              <div v-if="mhsDataPribadi">
                                <div class="border rounded-md text-sm max-h-[400px] overflow-y-auto px-2 py-1">
                                  <div class="">
                                    <div class="flex flex-col font-semibold text-center">
                                      <div>{{ mhsDataPribadi.name }} [{{ mhsDataPribadi.username }}]</div>
                                      <div>{{ mhsDataPribadi.kelas }} | {{ mhsDataPribadi.prodi }} | {{
                                        mhsDataPribadi.tahun_ajaran }}</div>
                                    </div>

                                    <div class="mt-2">
                                      <div class="font-semibold">Portofolio</div>
                                      <div v-if="mhsPortofolio">
                                        <div v-for="portofolio in mhsPortofolio">
                                          <div>{{ portofolio }}</div>
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
                                Data {{ mhs.name }} NIM {{ mhs.username }} tidak ditemukan!
                              </div>

                              <DialogFooter>
                                <DialogClose as-child>
                                  <Dialog>
                                    <DialogTrigger as-child>
                                      <Button variant="" class="cursor-pointer">
                                        Jadwalkan Diskusi
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent class="min-w-[200px]">
                                      <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>Kirim pesan kepada mahasiswa untuk waktu dan tempat diskusi
                                        </DialogDescription>
                                      </DialogHeader>

                                      <textarea type="text"
                                        class="border rounded-md px-2 py-1 text-sm max-h-[200px] min-h-[50px]"
                                        placeholder="Saya tunggu hari Senin dd-mm-yyyy pukul hh:mm WIB di ..."
                                        v-model="inputMsg" />

                                      <DialogFooter>
                                        <DialogClose as-child>
                                          <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                                        </DialogClose>
                                        <DialogClose as-child>
                                          <Button class="cursor-pointer w-[100px]"
                                            @click="diskusi(usulan.id, mhs.username, mhs.name, mhs.degree, usulanIndex, mhsIndex)">Send</Button>
                                        </DialogClose>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </DialogClose>
                                <DialogClose as-child>
                                  <Button variant="destructive" class="cursor-pointer w-[100px]"
                                    @click="tolakUsulan(usulan.id, mhs.username, usulanIndex, mhsIndex)">Tolak</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <span v-if="usulan.mhs_pengusul.length > 1 && (mhsIndex + 1) !== usulan.mhs_pengusul.length">,
                          </span>
                        </span>
                      </span>
                    </div>
                    <div v-if="usulan.mhs_diskusi.length !== 0" class="border-b border-[#334D80] mb-1 pb-1">
                      <div class="font-semibold">Diskusi</div>
                      <div class="flex flex-col gap-1">
                        <div v-for="(mhs, mhsIndex) in usulan.mhs_diskusi" class="rounded-md py-1 px-2 bg-white">
                          <div class="font-semibold">{{ mhs.name }}</div>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger class="italic">{{ mhs.msg }}</TooltipTrigger>
                                <TooltipContent>
                                  <p>Janji Diskusi</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          <div class="flex flex-wrap gap-2 mt-1">
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Button variant="" class="bg-green-600 cursor-pointer w-[100px]">Terima</Button>
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
                                    <div class="truncate">Judul</div>
                                    <div class="col-span-3 font-semibold">{{ usulan.judul }}</div>
                                  </div>
                                  {{ mhs.username }} {{ usulan.id }}
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

                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Button variant="destructive" class="cursor-pointer w-[100px]">Tolak</Button>
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
                                  <AlertDialogAction
                                    @click="tolakDiskusi(usulan.id, mhs.username, usulanIndex, mhsIndex)">
                                    Yes i'am sure
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap border-b border-[#334D80] mb-1 pb-1">
                    <div class="min-w-[150px]">Bidang Peminatan</div>
                    <div class="font-semibold">{{ usulan.minat }}</div>
                  </div>
                  <div class="flex flex-wrap border-b border-[#334D80] mb-1 pb-1">
                    <div class="min-w-[150px]">Judul</div>
                    <div class="font-semibold">{{ usulan.judul }}</div>
                  </div>
                  <div class="md:flex border-b border-[#334D80] mb-1 pb-1">
                    <div class="min-w-[150px]">Deskripsi</div>
                    <div class="text-justify flex-auto">{{ usulan.deskripsi }}</div>
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
                    <DialogTitle>Usulan Tugas Akhir</DialogTitle>
                    <DialogDescription>Usulkan judul tugas akhir untuk mahasiswa</DialogDescription>
                  </DialogHeader>

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
                      <div>Judul</div>
                      <input class="border rounded-md min-w-[200px] w-[300px] px-2 py-1" v-model="inputJudul" />
                    </div>
                    <div class="flex flex-wrap justify-between">
                      <div>Deskripsi</div>
                      <textarea :rows="4"
                        class="border rounded-md min-h-[100px] max-h-[200px] min-w-[200px] w-[300px] px-2 py-1"
                        v-model="inputDeskripsi" />
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose as-child>
                      <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
                    </DialogClose>
                    <DialogClose as-child>
                      <Button class="cursor-pointer w-[100px]" @click="submitUsulan">Submit</Button>
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