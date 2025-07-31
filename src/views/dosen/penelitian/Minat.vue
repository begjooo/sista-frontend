<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';
import Penelitian from '@/components/dosen/layout/sidebar/Penelitian.vue';
import EditMinat from '@/components/dosen/EditMinat.vue';

const username = localStorage.getItem('username')

const userData = ref();

onMounted(async () => {
  console.log(`onMounted Minat`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/minat`)
    userData.value = await response.json()
    console.log(userData.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <Penelitian />

  <div class="body-head-side">
    <div v-if="userData" class="p-2 text-sm">
      {{ userData }}
      <div class="flex flex-col gap-4 border rounded-md p-2 mb-2">
        <div v-for="minat in userData.minat">
          <div>{{ minat }}</div>
        </div>
      </div>

      <div>
        Tambah
      </div>
      <!-- <EditMinat :currentData="userData.minat" /> -->
    </div>
  </div>
</template>

<style scoped></style>