<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/layout/dosen/Header.vue';
import Profile from '@/components/layout/dosen/sidebar/Profile.vue';
import GantiPassword from '@/components/GantiPassword.vue';

const username = localStorage.getItem('username')

const userData = ref();

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/data-full/${username}`)
    userData.value = await response.json()
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
      <div v-if="userData" class="flex flex-col gap-2 p-2 mb-2">
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Password</div>
          <div>{{ userData.password[0] }}{{ userData.password[1] }}******</div>
        </div>
      </div>

      <GantiPassword :pass="userData.password" />
    </div>
  </div>
</template>

<style scoped>
</style>