<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '@/components/layout/mhs/Header.vue';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';

const username = localStorage.getItem('username')
const dosenList1 = ref([])
const statusDone = ref(true)

const statusPengajuan = {
  0: 'Belum',
  1: 'Proses',
  2: 'Diterima',
  3: 'Ditolak',
};

const props = defineProps(['kbk'])

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/list`)
    dosenList1.value = await response.json()
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
        <!-- <div v-if="pengajuanMhs.pbb.dosen1">
          {{ pengajuanMhs.pbb.dosen1.name }}
        </div> -->
      </div>

      <div class="my-2 overflow-auto">
        <div class="max-h-[30vh] flex flex-wrap gap-3 justify-center">
          <div v-for="dosen in dosenList1">
            <div class="border w-[40vh] hover:bg-blue-100 cursor-pointer" @click="selectPbbUtama(dosen)">
              <ul>
                <li>{{ dosen.fullname }}</li>
                <li>{{ dosen.username }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border">
      <!-- <div class="flex flex-wrap">
        <div class="w-[30vh]">
          Calon Pembimbing Utama
        </div>
        <div v-if="pengajuanMhs.pbb.dosen1">
          <div>
            {{ pengajuanMhs.pbb.dosen1.name }}
          </div>
        </div>
      </div> -->

      <div class="flex flex-wrap">
        <div class="w-[25vh]">Judul Tugas Akhir</div>
        <div>
          <textarea type="text" placeholder="Judul"
            class="resize max-h-[30vh] min-w-[300px] max-w-[300px] px-2 py-1 border rounded-md"
            v-model="pengajuanMhs.judul" />
          <div class="text-xs italic">* Pastikan ejaan judul sudah benar</div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-[25vh]">Deskripsi</div>
        <div>
          <textarea type="text"
            placeholder="Segala hal tentang tugas akhir anda seperti Latar Belakang, Tujuan, Manfaat, Metodologi, dan lain-lain."
            class="resize h-[15vh] max-h-[60vh] min-w-[300px] max-w-[300px] px-2 py-1 border rounded-md"
            v-model="pengajuanMhs.deskripsi" />
        </div>
      </div>

      <Button @click="submitDosenPbb" :disabled="!statusDone">Submit</Button>
    </div>
    <div>{{ pengajuanMhs }}</div>
  </div>
</template>

<style scoped></style>
