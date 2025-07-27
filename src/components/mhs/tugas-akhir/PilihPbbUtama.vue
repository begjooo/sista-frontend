<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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

const props = defineProps(['dosenList', 'dosenDegree', 'mhsName'])
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
  selectedJudul.value = {
    ta_id: '',
    judul: '',
    deskripsi: '',
    type: '',
  }
}

function handleMinat(minat) {
  selectedMinat.value = minat
  judulPerMinat.value = selectedDosen.value.usulan_ta.filter((item) => item.minat === minat)
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
    dosen_username: selectedDosen.value.username,
    dosen_fullname: selectedDosen.value.fullname,
    kbk: selectedKbk.value,
    minat: selectedMinat.value,
    judul: selectedJudul.value.judul,
    deskripsi: selectedJudul.value.deskripsi,
    degree: props.dosenDegree,
    type,
    tahap: 'Pengusulan',
  }

  try {
    const result = await fetch(`${baseUrl}/mhs/${username}/tugas-akhir/usulan/tambah`, {
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
  console.log(permintaanPbb)
}
</script>

<template>
  <div class="text-sm">
    <div class="flex flex-col text-center my-2 border-b pb-2">
      <div class="text-base font-bold">KBK</div>
      <div class="flex flex-wrap gap-2 justify-center mx-2">
        <div v-for="kbk in kbkList" class="">
          <Button @click="handleKbk(kbk)" class="w-[200px]">{{ kbk }}</Button>
        </div>
      </div>
    </div>

    <div v-if="selectedKbk" class="grid grid-cols-4 gap-2 min-h-[60vh] max-h-[60vh]">
      <div class="flex flex-col">
        <div class="text-center pt-2 font-bold">Daftar Dosen</div>
        <div v-for="dosen in dosenPerKbk" class="">
          <Button variant="link" class="cursor-pointer" @click="selectedDosen = dosen">{{ dosen.fullname }}</Button>
        </div>
      </div>

      <div v-if="selectedDosen" class="col-span-3 max-h-[60vh] overflow-auto">
        <div class="flex flex-wrap justify-center gap-4 mb-2">
          <div v-for="minat in selectedDosen.minat" class="cursor-pointer">
            <Button variant="outline" @click="handleMinat(minat)">{{ minat }}</Button>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <RadioGroup v-model="selectedJudul">
            <div v-for="item in judulPerMinat" class="flex space-x-2 p-2 border rounded-md">
              <RadioGroupItem :id="item.judul"
                :value="{ ta_id: item.id, judul: item.judul, deskripsi: item.deskripsi }" />
              <div class="flex flex-col gap-1">
                <Label :for="item.judul" class="cursor-pointer">{{ item.judul }}</Label>
                <label :for="item.judul" class="cursor-pointer">{{ item.deskripsi }}</label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div class="border rounded-md" :class="{ 'mt-2': selectedMinat }">
          <RadioGroup v-model="selectedJudul">
            <div class="flex space-x-2 p-2">
              <RadioGroupItem id="mahasiswa" :value="{ ta_id: '', judul: '', deskripsi: '', type: 'mahasiswa' }" />
              <div class="flex flex-col gap-2">
                <Label for="mahasiswa" class="cursor-pointer">Pengajuan Mandiri</Label>
                <div v-if="selectedJudul.type === 'mahasiswa'">
                  <div>
                    <div class="text-gray-800 italic text-base">Judul</div>
                    <input
                      class="border-b border-orange-600 resize-none focus:outline-0 focus:border-blue-800 w-[50vh] pb-2"
                      placeholder="Judul Tugas Akhir ..." v-model="selectedJudul.judul" />
                  </div>
                  <div>
                    <div class="text-gray-800 italic text-base mt-2">Deskripsi</div>
                    <textarea rows="4" placeholder="Deskrisi Tugas Akhir ..." v-model="selectedJudul.deskripsi"
                      class="border-b border-orange-600 resize-none focus:outline-0 focus:border-blue-800 w-[50vh] pb-2" />
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <Dialog>
          <DialogTrigger as-child>
            <Button class="my-2" :disabled="!selectedJudul.judul || !selectedJudul.deskripsi">
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
              <div>Dosen</div>
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
                      <AlertDialogTitle>Rekap Usulan Pembimbing</AlertDialogTitle>
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
</template>