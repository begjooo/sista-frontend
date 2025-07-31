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
    // console.log(userData.value)
  } catch (error) {
    console.log(error.message)
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
