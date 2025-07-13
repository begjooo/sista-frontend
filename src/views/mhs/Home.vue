<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/layout/mhs/Header.vue';
import Button from '@/components/ui/button/Button.vue';

const userData = ref()

onMounted(async () => {
  try {
    const response = await fetch(baseUrl + '/mhs/')
    userData.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div v-if="userData">
    <p>Halaman Mahasiswa</p>
    <p>{{ userData }}</p>
  </div>
</template>

<style scoped></style>
