<script setup>
import { onMounted, ref } from 'vue';
import BuatUsulan from '@/components/dosen/tugas-akhir/BuatUsulan.vue';
import Header from '@/components/layout/dosen/Header.vue';
import TugasAkhir from '@/components/layout/dosen/sidebar/TugasAkhir.vue';
import { baseUrl } from '@/baseUrl';

const username = localStorage.getItem('username')
const data = ref({})

onMounted(async () => {
  console.log(`Usulan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan`)
    data.value = await response.json()
    console.log(data.value)
  } catch (error) {
    console.log(error)
    data.value = {}
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side">
    <div>
      {{ data }}
      <!-- <div class="p-2 text-justify">
        <b>Usulan Judul</b> merupakan judul tugas akhir yang ditawarkan kepada mahasiswa oleh dosen. Judul yang
        diusulkan
        akan tampil pada setiap akun mahasiswa. Mahasiswa yang tertarik dengan judul yang diusulkan dapat mengajukan
        ketertarikannya. Jika anda menerima mahasiswa tersebut maka mahasiswa akan menjadi mahasiswa bimbingan anda.
      </div> -->
      <div class="flex flex-wrap">
        <BuatUsulan :currentData="data" />
      </div>
    </div>
  </div>
</template>