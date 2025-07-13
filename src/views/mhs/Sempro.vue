<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/layout/mhs/Header.vue';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';

const kbkList = ref(['nirkabel', 'jaringan', 'aplikasi'])
const dosenList = ref([])
const dosenListPendamping = ref([])
const statusDone = ref(true)

const ajuanMhs = ref({
  judulSeminar: '',
  kbk: '',
  pbb: {},
})

function pilihDosen1(data) {
  ajuanMhs.value.pbb.dosen1 = data
  dosenListPendamping.value = dosenList.value.filter((item) => {
    return item.username !== data.username
  })
}

function pilihDosen2(data) {
  ajuanMhs.value.pbb.dosen2 = data
}

async function submitDosenPbb() {
  if (ajuanMhs.value.judulSeminar && ajuanMhs.value.kbk &&
    ajuanMhs.value.pbb.dosen1) {
    statusDone.value = false

    try {
      const response = await fetch(`${baseUrl}/mhs/sempro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ajuanMhs.value),
      })

      statusDone.value = await response.json()
    } catch (error) {
      console.error(error)
      statusDone.value = true
    }
  } else {
    console.log(`terdapat data yang kosong`)
  }
}

function removeDosen(index) {
  delete ajuanMhs.value.pbb[index]
}

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/list`)
    dosenList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div class="flex flex-wrap">
    <div class="mr-4 py-1 w-[20vh]">Judul Proposal</div>
    <div>
      <textarea type="text" placeholder="judul" class="resize max-h-[30vh] w-[300px] max-w-[70vh] px-2 py-1 border"
        v-model="ajuanMhs.judulSeminar" />
      <div class="text-xs italic">* Pastikan ejaan judul sudah benar</div>
    </div>
  </div>

  <div class="flex flex-wrap">
    <div class="mr-4 content-center w-[20vh]">KBK</div>
    <Select v-model="ajuanMhs.kbk">
      <SelectTrigger class="w-[300px]">
        <SelectValue placeholder="Pilih KBK" />
      </SelectTrigger>

      <SelectContent class="max-h-[300px]">
        <SelectLabel>KBK</SelectLabel>
        <SelectItem :value="kbkList[0]">Nirkabel</SelectItem>
        <SelectItem :value="kbkList[1]">Infrastruktur Jaringan</SelectItem>
        <SelectItem :value="kbkList[2]">Aplikasi</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div class="text-center">
    <div class="">
      Pembimbing Utama
      <div v-if="ajuanMhs.pbb.dosen1">
        {{ ajuanMhs.pbb.dosen1.name }}
      </div>
    </div>

    <div class="my-2 overflow-auto">
      <div class="max-h-[30vh] flex flex-wrap gap-3 justify-center">
        <div v-for="dosen in dosenList">
          <div class="border w-[40vh] hover:bg-blue-100 cursor-pointer" @click="pilihDosen1(dosen)">
            <ul>
              <li>{{ dosen.name }}</li>
              <li>{{ dosen.username }}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div v-if="ajuanMhs.pbb.dosen1" class="text-center">
    <div class="">
      Pembimbing Pendamping
      <div v-if="ajuanMhs.pbb.dosen2">
        {{ ajuanMhs.pbb.dosen2.name }}
      </div>
    </div>

    <div class="my-2 overflow-auto">
      <div class="max-h-[30vh] flex flex-wrap gap-3 justify-center">
        <div v-for="dosen in dosenListPendamping">
          <div class="border w-[40vh] hover:bg-blue-100 cursor-pointer" @click="pilihDosen2(dosen)">
            <ul>
              <li>{{ dosen.name }}</li>
              <li>{{ dosen.username }}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="border">
    <div class="flex flex-wrap">
      <div class="w-[30vh]">
        Pembimbing Utama
      </div>
      <div v-if="ajuanMhs.pbb.dosen1">
        <div>
          {{ ajuanMhs.pbb.dosen1.name }}
        </div>
      </div>
    </div>

    <div v-if="ajuanMhs.pbb.dosen2" class="flex flex-wrap">
      <div class="w-[30vh]">
        Pembimbing Pendamping
      </div>
      <div>
        {{ ajuanMhs.pbb.dosen2.name }}
        <Button variant="destructive" class="mx-2" @click="removeDosen('dosen2')">Delete</Button>
      </div>
    </div>

    <Button @click="submitDosenPbb" :disabled="!statusDone">Submit</Button>
  </div>
</template>

<style scoped></style>
