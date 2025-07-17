<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '@/components/layout/mhs/Header.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import AjuanMandiri from '@/components/mhs/tugas_akhir/AjuanMandiri.vue';
import AjuanDosen from '@/components/mhs/tugas_akhir/AjuanDosen.vue';

const username = localStorage.getItem('username')
const mhsData = ref()
const pengajuanStatus = ref()
const kbkList = ['nirkabel', 'jaringan', 'aplikasi']
const kbkPilihan = ref('')

const jenisAjuan = ref()

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/mhs/data/${username}`)
    mhsData.value = await response.json()
    pengajuanStatus.value = mhsData.value.ta.pengajuan.status
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div v-if="!pengajuanStatus">
    <div class="flex flex-wrap">
      <div class="content-center w-[20vh]">KBK</div>
      <Select v-model="kbkPilihan">
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

    <div class="flex flex-wrap">
      <div class="content-center w-[20vh]">Jenis Ajuan</div>
      <Select v-model="jenisAjuan" :disabled="kbkPilihan === ''">
        <SelectTrigger class="w-[300px]">
          <SelectValue placeholder="Pilih Pengajuan TA" />
        </SelectTrigger>

        <SelectContent class="max-h-[300px]">
          <SelectItem value="mandiri">Pengajuan Mandiri</SelectItem>
          <SelectItem value="dosen">Tawaran Dosen</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div v-if="jenisAjuan === 'mandiri'">
      <AjuanMandiri :kbk="kbkPilihan" />
    </div>
    <div v-else-if="jenisAjuan === 'dosen'">
      <AjuanDosen />
    </div>
  </div>
  <div v-else>
    <div>
      Pengajuan tugas akhir anda sudah di kirim kepada {{ mhsData.ta.pengajuan.pbb.dosen1.name }}<span
        v-if="mhsData.ta.pengajuan.pbb.dosen2"> dan {{ mhsData.ta.pengajuan.pbb.dosen2.name }}</span>.
      Silahkan hubungan dosen terkait.
    </div>
    <div>KBK: {{ mhsData.ta.pengajuan.kbk }}</div>
    <div>Judul: {{ mhsData.ta.pengajuan.judul }}</div>
    <div>Deskripsi: {{ mhsData.ta.pengajuan.deskripsi }}</div>
  </div>
</template>