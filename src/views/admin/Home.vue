<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';

import Header from '@/components/header/Admin.vue';


const username = localStorage.getItem('username')
const userData = ref()

onMounted(async () => {
  console.log(`/admin onMounted()`)
  try {
    const response = await fetch(`${baseUrl}/admin/data/${username}`)
    userData.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div class="body-head">
    <div v-if="userData">
      <div>ADMIN!!!!!!!!!!!!!</div>
      Selamat datang {{ userData.name }}
    </div>
  </div>
</template>

<style scoped></style>
