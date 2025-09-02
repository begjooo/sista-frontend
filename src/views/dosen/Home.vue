<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/dosen/layout/Header.vue';

const username = localStorage.getItem('username')
const userData = ref()

onMounted(async () => {
  console.log(`onMounted Home`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/data`)
    userData.value = await response.json()
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />

  <div class="body-head">
    <div class="text-center p-2 text-sm bg-gray-200">
      <p>
        Sistem Tugas Akhir (SISTA) masih dalam
        <span class="font-semibold">pengembangan</span>
      </p>
      <p>
        Hubungi
        <span class="font-semibold">(WA) 081931222450 A.N. Mochamad Soebagja Budiana</span>
      </p>
      <p>
        jika mengalami
        <span class="font-semibold text-red-600">BUG, GLITCH, dan/atau ERROR</span>
      </p>
      <p>
        yang disertai dengan
        <span class="font-semibold">Screenshot</span>
      </p>
    </div>
    <div v-if="userData" class="">
      Selamat datang {{ userData.fullname }}
    </div>
  </div>
</template>

<style scoped></style>
