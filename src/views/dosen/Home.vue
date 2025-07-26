<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/dosen/layout/Header.vue';

const username = localStorage.getItem('username')
const userData = ref()

onMounted(async () => {
  console.log(`/dosen onMounted()`)
  try {
    const response = await fetch(`${baseUrl}/dosen/data/${username}`)
    userData.value = await response.json()
    console.log(userData.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div class="body-head">
    <div v-if="userData" class="">
      Selamat datang {{ userData.fullname }}
    </div>
  </div>
</template>

<style scoped>
</style>
