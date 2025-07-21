<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '../../components/layout/dosen/Header.vue';
import GantiPassword from '@/components/GantiPassword.vue';
import EditProfile from '@/components/EditProfile.vue';

const username = localStorage.getItem('username')

const userData = ref();

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/data-full/${username}`)
    userData.value = await response.json()
    console.log(userData.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div v-if="userData" class="p-2 text-sm">
    <div v-if="userData" class="border flex flex-col gap-2 p-2 mb-2">
      <div class="flex gap-2">
        <div class="min-w-[20vh]">NIP</div>
        <div>{{ userData.username }}</div>
      </div>
      <div class="flex gap-2">
        <div class="min-w-[20vh]">Password</div>
        <div>{{ userData.password[0] }}{{ userData.password[1] }}******</div>
      </div>
      <div class="flex gap-2">
        <div class="min-w-[20vh]">Nama</div>
        <div>{{ userData.fullname }}</div>
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
        <div class="min-w-[20vh]">Minat</div>
        <div>{{ userData.minat }}</div>
      </div>
      <div class="flex gap-2">
        <div class="min-w-[20vh]">Jabatan Fungsional</div>
        <div>{{ userData.jabatan_fungsional }}</div>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <EditProfile :currentData="userData" :dbName="'dosen'" />
      <GantiPassword :pass="userData.password" />
    </div>
  </div>
</template>