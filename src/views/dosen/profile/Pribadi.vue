<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Dosen.vue';
import Profile from '@/components/sidebar/dosen/Profile.vue';
import EditDosen from '@/components/edit/Dosen.vue';

const username = localStorage.getItem('username')

const userData = ref();

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
    userData.value = await response.json()
    // console.log(userData.value)
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <Profile />

  <div class="body-head-side">
    <div v-if="userData" class="p-2 text-sm">
      <div class="border rounded-sm flex flex-col gap-2 p-2 mb-2">
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Nama</div>
          <div>{{ userData.fullname }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">NIP</div>
          <div>{{ userData.nip }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Email</div>
          <div>{{ userData.email }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">KBK</div>
          <div>{{ userData.kbk }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Jabatan Fungsional</div>
          <div>{{ userData.jabatan_fungsional }}</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <EditDosen :username="username" :currentData="userData" />
      </div>
    </div>
  </div>
</template>