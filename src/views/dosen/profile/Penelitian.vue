<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/layout/dosen/Header.vue';
import Profile from '@/components/layout/dosen/sidebar/Profile.vue';
import GantiPassword from '@/components/GantiPassword.vue';
import EditProfile from '@/components/dosen/EditPribadi.vue';
import { baseUrl } from '@/baseUrl';

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
  <Profile />


  <div class="body border">
    <div v-if="userData" class="p-2 text-sm min-h-[1000px]">
      <div v-if="userData" class="border flex flex-col gap-2 p-2 mb-2">
        <div class="flex gap-2">
          <div class="min-w-[20vh]">KBK</div>
          <div>{{ userData.kbk }}</div>
        </div>
        <div class="flex gap-2">
          <div class="min-w-[20vh]">Minat</div>
          <div>{{ userData.minat }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  padding-top: 10vh;
  padding-left: 200px;
}
</style>