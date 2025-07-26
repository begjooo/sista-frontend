<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';
import Penelitian from '@/components/dosen/layout/sidebar/Penelitian.vue';
import EditMinat from '@/components/dosen/EditMinat.vue';

const username = localStorage.getItem('username')

const userData = ref();

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/data/${username}/minat`)
    userData.value = await response.json()
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
      <div class="flex flex-col gap-4 border rounded-md p-2 mb-2">
        <div v-for="minat in userData.minat">
          <div>{{ minat }}</div>
        </div>
      </div>

      <EditMinat :currentData="userData.minat" />
    </div>
  </div>
</template>

<style scoped></style>