<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from '@/components/ui/button/Button.vue';

const router = useRouter()

function goToDosen() {
  console.log(`dosen`)
  router.push('/dosen')
}

function goToMhs() {
  console.log(`mhs`)
  router.push('/mhs')
}
</script>

<template>
  <div>SISTEM TUGAS AKHIR (SISTA)</div>
  <div>LOGIN</div>
  <Button @click="goToDosen">Dosen</Button>
  <Button @click="goToMhs">Mahasiswa</Button>
</template>

<style scoped></style>
