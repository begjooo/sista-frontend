<script setup>
import { onMounted, ref } from 'vue';
import Header from '../../components/dosen/layout/Header.vue';
import { baseUrl } from '@/baseUrl';

const username = localStorage.getItem('username')
const mhsList = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/data/${username}`)
    const dosenData = await response.json()
    mhsList.value = dosenData.bimbingan
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <div>Daftar Bimbingan</div>
  <div v-for="mhs in mhsList">
    <div class="border p-2">
      <div>Nama: {{ mhs.name }}</div>
      <div>NIM: {{ mhs.username }}</div>
      <div>KBK: {{ mhs.kbk }}</div>
      <div>Judul: {{ mhs.judul }}</div>
      <div>Deskripsi: {{ mhs.deskripsi }}</div>
    </div>
  </div>
</template>