<script setup>
import { ref } from 'vue'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Button from './ui/button/Button.vue';

const props = defineProps(['dosenList'])
const kbkList = ['Nirkabel', 'Infrastruktur Jaringan', 'Layanan dan Aplikasi']
const selectedKbk = ref('')
const dosenPerKbk = ref()
const selectedDosen = ref()
const selectedMinat = ref('')
const selectedJudul = ref({
  name: '',
  deskripsi: '',
  type: '',
})
const minatListDummy = [
  {
    name: 'Minat A',
    judul: [
      {
        name: 'Judul A Minat A',
        deskripsi: 'asd asd asd asd',
        type: 'dosen',
      },
      {
        name: 'Judul B Minat A',
        deskripsi: 'asd asd',
        type: 'dosen',
      },
    ],
  },
  {
    name: 'Minat B',
    judul: [
      {
        name: 'Judul A Minat B',
        deskripsi: 'zxc zxc zxc zxc',
        type: 'dosen',
      },
      {
        name: 'Judul B Minat B',
        deskripsi: 'zxc zxc',
        type: 'dosen',
      },
    ],
  },
  {
    name: 'Minat C',
    judul: [
      {
        name: 'Judul A Minat C',
        deskripsi: 'qwe qwe qwe qwe',
        type: 'dosen',
      },
      {
        name: 'Judul B Minat C',
        deskripsi: 'qwe qwe',
        type: 'dosen',
      },
    ],
  },
]
const judulPerMinatDummy = ref()

function handleKbk(kbk) {
  selectedKbk.value = kbk
  dosenPerKbk.value = props.dosenList.filter((item) => item.kbk === kbk)
  // selectedMinat.value = null
}

function handleMinat(minat) {
  selectedMinat.value = minat.name
  judulPerMinatDummy.value = minat.judul
}

async function submit() {
  console.log(`submit pengajuan ta`)
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
          <div v-for="minat in minatListDummy" class="cursor-pointer">
            <Button variant="outline" @click="handleMinat(minat)">{{ minat.name }}</Button>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <RadioGroup v-model="selectedJudul">
            <div v-for="judul in judulPerMinatDummy" class="flex space-x-2 p-2 border rounded-md">
              <RadioGroupItem :id="judul.name" :value="judul" />
              <div class="flex flex-col gap-1">
                <Label :for="judul.name" class="cursor-pointer">{{ judul.name }}</Label>
                <label :for="judul.name" class="cursor-pointer">{{ judul.deskripsi }}</label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div class="border rounded-md" :class="{ 'mt-2': selectedMinat }">
          <RadioGroup v-model="selectedJudul">
            <div class="flex space-x-2 p-2">
              <RadioGroupItem id="mahasiswa" :value="{ judul: '', deskripsi: '', type: 'mahasiswa' }" />
              <div class="flex flex-col gap-2">
                <Label for="mahasiswa" class="cursor-pointer">Pengajuan Mandiri</Label>
                <div v-if="selectedJudul.type === 'mahasiswa'">
                  <div>
                    <div class="text-gray-800 italic text-base">Judul</div>
                    <input
                      class="border-b border-orange-600 resize-none focus:outline-0 focus:border-blue-800 w-[50vh] pb-2"
                      placeholder="Judul Tugas Akhir ..." v-model="selectedJudul.name" />
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

        <Button class="my-2" @click="submit" :disabled="!selectedJudul.name || !selectedJudul.deskripsi">Submit</Button>
      </div>
    </div>
  </div>
</template>