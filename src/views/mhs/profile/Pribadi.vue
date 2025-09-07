<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Mhs.vue';
import Profile from '@/components/sidebar/mhs/Profile.vue';
import EditMhs from '@/components/edit/Mhs.vue';

const username = localStorage.getItem('username')

const userData = ref();

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/data`)
    const result = await response.json()
    userData.value = result.pribadi
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
          <div>{{ userData.name }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">NIM</div>
          <div>{{ userData.username }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Email</div>
          <div>{{ userData.email }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Tahun Ajaran TA</div>
          <div>{{ userData.tahun_ajaran }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Program Studi</div>
          <div>{{ userData.prodi }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Kelas</div>
          <div>{{ userData.kelas }}</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <EditMhs :username="username" :currentData="userData" />
      </div>
    </div>
  </div>
</template>