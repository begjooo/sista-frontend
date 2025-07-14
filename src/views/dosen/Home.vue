<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/layout/dosen/Header.vue';

const username = localStorage.getItem('username')
const userData = ref()

onMounted(async () => {
  console.log(`/dosen onMounted()`)
  try {
    const response = await fetch(`${baseUrl}/dosen/data/${username}`)
    userData.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div v-if="userData">
    Selamat datang {{ userData.name }}
  </div>
</template>

<style scoped></style>
