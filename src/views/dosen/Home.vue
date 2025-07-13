<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import Header from '../../components/layout/dosen/Header.vue';
import Button from '@/components/ui/button/Button.vue';

const counter = ref(0)

function increment() {
  counter.value++
  console.log(counter.value)
}
</script>

<template>
  <Header />

  <p>halaman dosen</p>
  <p>Count is: {{ counter }}</p>
  <Button @click="increment">klik</Button>
</template>

<style scoped></style>
