<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
import { baseUrl } from '@/baseUrl';

const router = useRouter()
const username = localStorage.getItem('username')

const props = defineProps(['dosenList', 'mhsName', 'mhsTahun', 'mhsSelectedTa'])
const kbkList = ['Nirkabel', 'Infrastruktur Jaringan', 'Layanan dan Aplikasi']
const selectedKbk = ref('')
const dosenPerKbk = ref()
const selectedDosen = ref()
const selectedMinat = ref('')
const judulPerMinat = ref()

const selectedJudul = ref({
  ta_id: '',
  judul: '',
  deskripsi: '',
  type: '',
})

function handleKbk(kbk) {
  selectedKbk.value = kbk
  dosenPerKbk.value = props.dosenList.filter((item) => item.kbk === kbk)
  selectedDosen.value = null
  judulPerMinat.value = null
  selectedJudul.value = {
    ta_id: '',
    judul: '',
    deskripsi: '',
    type: '',
  }
}

function handleDosen(dosen) {
  selectedDosen.value = dosen
  selectedMinat.value = ''
  judulPerMinat.value = null
  selectedJudul.value = {
    ta_id: '',
    judul: '',
    deskripsi: '',
    type: '',
  }
}

function handleMinat(minat) {
  selectedMinat.value = minat
  if (selectedDosen.value.usulan_ta) {
    const taList = selectedDosen.value.usulan_ta.filter((item) => item.minat === minat)

    if (props.mhsSelectedTa && props.mhsSelectedTa.length > 0) {
      let availableTa = []
      taList.forEach((taItem) => {
        props.mhsSelectedTa.forEach((selectedTa) => {
          if (taItem.id !== selectedTa.id) {
            availableTa.push(taItem)
          }
        })
      })

      judulPerMinat.value = availableTa
    } else if (!props.mhsSelectedTa) {
      judulPerMinat.value = taList
    }
  }

  selectedJudul.value = {
    ta_id: '',
    judul: '',
    deskripsi: '',
    type: '',
  }
}

async function submit() {
  console.log(`submit pengajuan ta`)
  let type = `dosen`
  if (selectedJudul.value.type === `mahasiswa`) {
    type = `mahasiswa`
  }

  console.log(selectedJudul.value)
  const permintaanPbb = {
    id: selectedJudul.value.ta_id,
    name: props.mhsName,
    dosen1_username: selectedDosen.value.username,
    dosen1_fullname: selectedDosen.value.fullname,
    kbk: selectedKbk.value,
    minat: selectedMinat.value,
    judul: selectedJudul.value.judul,
    deskripsi: selectedJudul.value.deskripsi,
    degree: 'Pembimbing Utama',
    type,
    tahap: 'Pengusulan',
  }

  try {
    const result = await fetch(`${baseUrl}/mhs/${username}/tugas-akhir/usulan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(permintaanPbb),
    })

    if (result) {
      router.push(`/`)
    } else {
      console.log(`failed submit usulan pbb`)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="text-sm">
    <div class="flex flex-col text-center my-2 border-b pb-2">
      <div class="text-base font-semibold italic mb-1">Kelompok Bidang Keahlian</div>
      <div class="flex flex-wrap gap-2 justify-center mx-2">
        <div v-for="kbk in kbkList" class="">
          <Button variant="link" @click="handleKbk(kbk)" class="max-w-[200px] cursor-pointer"
            :class="{ 'bg-[#334D80] text-white': kbk === selectedKbk }">
            {{ kbk }}
          </Button>
        </div>
      </div>
    </div>

    <div v-if="selectedKbk" class="flex flex-wrap gap-2 px-2 min-h-[60vh] max-h-[60vh] overflow-auto">
      <div class="border rounded-md w-[300px]">
        <div class="text-center pt-2 pb-1 font-bold">Daftar Dosen</div>
        <div v-for="dosen in dosenPerKbk">
          <div v-if="dosen.bimbingan_utama.length < 6">
            <div @click="handleDosen(dosen)" class="border-b py-2 px-2 cursor-pointer hover:underline"
              :class="{ 'bg-gray-300 font-semibold': selectedDosen && selectedDosen.fullname && dosen.fullname === selectedDosen.fullname }">
              <div>
                {{ dosen.fullname }}
              </div>
              <div class="text-xs italic">Kuota Bimbingan tersisa
                <span class="font-semibold">
                  {{ 6 - dosen.bimbingan_utama.length }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div v-if="selectedDosen" class="border rounded-md flex-1">
        <div class="text-center pt-2 pb-1 font-semibold italic">Minat Penelitian</div>
        <div v-if="selectedDosen" class="col-span-3">
          <div class="flex flex-wrap gap-2 justify-center mb-2">
            <div v-for="minat in selectedDosen.minat" class="cursor-pointer">
              <div class="mx-2 md:mx-0 border text-center rounded-md px-3 py-1 hover:bg-gray-100 hover:font-semibold"
                :class="{ 'bg-gray-300 font-semibold': minat === selectedMinat }" @click="handleMinat(minat)">
                {{ minat }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div v-if="judulPerMinat && judulPerMinat.length === 0" class="text-center px-2">
            Dosen terkait ({{ selectedDosen.fullname }}) <span class="font-semibold">tidak mengusulkan</span> judul pada
            bidang peminatan {{ selectedMinat }}
          </div>
          <div v-else>
            <RadioGroup v-model="selectedJudul">
              <div v-for="item in judulPerMinat" class="flex space-x-2 p-2 border-b">
                <RadioGroupItem :id="item.judul"
                  :value="{ ta_id: item.id, judul: item.judul, deskripsi: item.deskripsi }" />
                <div class="flex flex-col gap-1">
                  <Label :for="item.judul" class="cursor-pointer">{{ item.judul }}</Label>
                  <label :for="item.judul" class="cursor-pointer">{{ item.deskripsi }}</label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div v-if="selectedKbk && selectedDosen && selectedMinat">
            <RadioGroup v-model="selectedJudul">
              <div class="flex space-x-2 p-2">
                <RadioGroupItem id="mahasiswa" :value="{ ta_id: '', judul: '', deskripsi: '', type: 'mahasiswa' }" />
                <div class="flex flex-col gap-2">
                  <Label for="mahasiswa" class="cursor-pointer">Pengajuan Mandiri pada bidang peminatan {{ selectedMinat
                  }}
                  </Label>
                  <div v-if="selectedJudul.type === 'mahasiswa'">
                    <div class="">
                      <div class="flex flex-wrap">
                        <div class="w-[100px] text-gray-800 italic">Pbb Utama</div>
                        <div>{{ selectedDosen.fullname }}</div>
                      </div>
                      <div class="flex flex-wrap">
                        <div class="w-[100px] text-gray-800 italic">KBK</div>
                        <div>{{ selectedKbk }}</div>
                      </div>
                      <div class="flex flex-wrap">
                        <div class="w-[100px] text-gray-800 italic">Minat</div>
                        <div>{{ selectedMinat }}</div>
                      </div>
                    </div>
                    <div>
                      <div class="text-gray-800 italic">Judul</div>
                      <input
                        class="border-b border-orange-600 resize-none focus:outline-0 focus:border-blue-800 w-[50vh] pb-2"
                        placeholder="Judul Tugas Akhir ..." v-model="selectedJudul.judul" />
                    </div>
                    <div>
                      <div class="text-gray-800 italic mt-2">Deskripsi</div>
                      <textarea rows="4" placeholder="Deskripsi Tugas Akhir mencakup Abstrak dan Referensi Utama, " v-model="selectedJudul.deskripsi"
                        class="border-b border-orange-600 resize-none focus:outline-0 focus:border-blue-800 w-[50vh] pb-2" />
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div v-if="selectedMinat">
            <Dialog>
              <DialogTrigger as-child>
                <Button class="m-2" :disabled="!selectedJudul.judul || !selectedJudul.deskripsi">
                  Submit
                </Button>
              </DialogTrigger>

              <DialogContent class="min-w-[200px] text-sm">
                <DialogHeader>
                  <DialogTitle>Rekap Usulan Pembimbing</DialogTitle>
                  <DialogDescription>Pastikan semua data sudah benar!</DialogDescription>
                </DialogHeader>

                <div class="sm:grid grid-cols-4 gap-1">
                  <div>KBK</div>
                  <div class="col-span-3">{{ selectedKbk }}</div>
                  <div>Pbb Utama</div>
                  <div class="col-span-3">{{ selectedDosen.fullname }}</div>
                  <div>Minat</div>
                  <div class="col-span-3">{{ selectedMinat }}</div>
                  <div>Judul</div>
                  <div class="col-span-3">{{ selectedJudul.judul }}</div>
                  <div>Deskripsi</div>
                  <div class="col-span-3">{{ selectedJudul.deskripsi }}</div>
                </div>

                <DialogFooter>
                  <DialogClose as-child>
                    <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
                  </DialogClose>
                  <DialogClose as-child>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button class="" :disabled="!selectedJudul.judul || !selectedJudul.deskripsi">
                          Kirim Permintaan
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Rekapitulasi Usulan Pembimbing</AlertDialogTitle>
                          <AlertDialogDescription>
                            Pastikan data sudah benar! Pengiriman tidak dapat dikembalikan!
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction @click="submit">Saya sangat yakin!</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>