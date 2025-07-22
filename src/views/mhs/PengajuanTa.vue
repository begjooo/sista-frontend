<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '@/components/layout/mhs/Header.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import AjuanMandiri from '@/components/mhs/tugas_akhir/AjuanMandiri.vue';
import AjuanDosen from '@/components/mhs/tugas_akhir/AjuanDosen.vue';
import PilihPbbUtama from '@/components/PilihPbbUtama.vue';

const username = localStorage.getItem('username')
const mhsData = ref()
const dosenList = ref()

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/mhs/data/${username}`)
    mhsData.value = await response.json()
  } catch (error) {
    console.log(error)
  }

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

  <div v-if="mhsData && dosenList">
    <!-- <div>
      {{ mhsData }}
    </div>
    <div>
      {{ dosenList }}
    </div> -->
    <!-- <div>
      <div>pilih kbk</div>
      <div>daftar dosen per kbk</div>
      <div>jika setiap dosen di klik, ada:</div>
      <div>1. minat dosen</div>
      <div>2. judul2 yang ditawarkan dosen berdasarkan minat</div>
      <div>3. input ajuan mandiri dari mhs</div>
    </div>
    <div v-if="!mhsData.pengajuan_id">
      Belum mengajukan ta. ajukan calon dosen pbb utama!
    </div>
    <div v-else>
      Sudah mengajukan ta
    </div> -->

    <PilihPbbUtama :dosenList="dosenList" />
  </div>
</template>