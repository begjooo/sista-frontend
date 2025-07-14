<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/layout/mhs/Header.vue';
import Button from '@/components/ui/button/Button.vue';

const username = localStorage.getItem('username')
const userData = ref()

onMounted(async () => {
  console.log(`/mhs onMounted()`)
  try {
    const response = await fetch(`${baseUrl}/mhs/data/${username}`)
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
