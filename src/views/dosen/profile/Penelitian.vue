<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/layout/dosen/Header.vue';
import Profile from '@/components/layout/dosen/sidebar/Profile.vue';
import EditPenelitian from '@/components/dosen/EditPenelitian.vue';

const username = localStorage.getItem('username')

const userData = ref();

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/data/${username}/penelitian`)
    userData.value = await response.json()
    console.log(userData.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <Profile />

  <div class="body-head-side">
    <div v-if="userData" class="p-2 text-sm">
      <div class="border flex flex-col gap-2 p-2 mb-2">
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Minat</div>
          <div>{{ userData.minat }}</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <EditPenelitian :currentData="userData" :dbName="'dosen'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>