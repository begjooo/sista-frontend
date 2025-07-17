<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '@/components/layout/mhs/Header.vue';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';

const username = localStorage.getItem('username')
const dosenList = ref([])
const dosenListPendamping = ref([])
const statusDone = ref(true)

const statusPengajuan = {
  0: 'Belum',
  1: 'Proses',
  2: 'Diterima',
  3: 'Ditolak',
};

const props = defineProps(['kbk'])

const ajuanMhs = ref({
  username: '',
  kbk: '',
  pbb: {},
  judul: '',
  deskripsi: '',
  status: '',
})

function pilihDosen1(data) {
  ajuanMhs.value.pbb.dosen1 = data
  ajuanMhs.value.pbb.dosen1.status = statusPengajuan[1]

  dosenListPendamping.value = dosenList.value.filter((item) => {
    return item.username !== data.username
  })
}

function pilihDosen2(data) {
  ajuanMhs.value.pbb.dosen2 = data
  ajuanMhs.value.pbb.dosen2.status = statusPengajuan[1]
}

async function submitDosenPbb() {
  ajuanMhs.value.kbk = props.kbk
  ajuanMhs.value.status = statusPengajuan[1]

  if (ajuanMhs.value.judul && ajuanMhs.value.pbb.dosen1) {
    statusDone.value = false
    ajuanMhs.value.username = username

    try {
      const response = await fetch(`${baseUrl}/mhs/ta/pengajuan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ajuanMhs.value),
      })

      statusDone.value = await response.json()

      window.location.reload()
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
  <div class="text-sm">
    <div class="text-center border rounded-md">
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

    <div v-if="ajuanMhs.pbb.dosen1" class="text-center border rounded-md">
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
          Calon Pembimbing Utama
        </div>
        <div v-if="ajuanMhs.pbb.dosen1">
          <div>
            {{ ajuanMhs.pbb.dosen1.name }}
          </div>
        </div>
      </div>

      <div v-if="ajuanMhs.pbb.dosen2" class="flex flex-wrap">
        <div class="w-[30vh]">
          Calon Pembimbing Pendamping
        </div>
        <div>
          {{ ajuanMhs.pbb.dosen2.name }}
          <Button variant="destructive" class="mx-2" @click="removeDosen('dosen2')">Delete</Button>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-[25vh]">Judul Tugas Akhir</div>
        <div>
          <textarea type="text" placeholder="Judul"
            class="resize max-h-[30vh] min-w-[300px] max-w-[300px] px-2 py-1 border rounded-md"
            v-model="ajuanMhs.judul" />
          <div class="text-xs italic">* Pastikan ejaan judul sudah benar</div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-[25vh]">Deskripsi</div>
        <div>
          <textarea type="text"
            placeholder="Segala hal tentang tugas akhir anda seperti Latar Belakang, Tujuan, Manfaat, Metodologi, dan lain-lain."
            class="resize h-[15vh] max-h-[60vh] min-w-[300px] max-w-[300px] px-2 py-1 border rounded-md"
            v-model="ajuanMhs.deskripsi" />
        </div>
      </div>

      <Button @click="submitDosenPbb" :disabled="!statusDone">Submit</Button>
    </div>
    <div>{{ ajuanMhs }}</div>
  </div>
</template>

<style scoped></style>
