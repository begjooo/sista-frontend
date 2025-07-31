<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';

const username = localStorage.getItem('username')
const mhsList = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/data/${username}`)
    const dosenData = await response.json()
    mhsList.value = dosenData.permintaanBimbingan
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div class="body-head">
    <div>Daftar Permintaan Bimbingan</div>
    <div v-for="mhs in mhsList">
      <div class="border p-2">
        <div>Nama: {{ mhs.name }}</div>
        <div>NIM: {{ mhs.username }}</div>
        <div>KBK: {{ mhs.kbk }}</div>
        <div>Judul: {{ mhs.judul }}</div>
        <div>Deskripsi: {{ mhs.deskripsi }}</div>
      </div>
    </div>
  </div>
</template>