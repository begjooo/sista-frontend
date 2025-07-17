<script setup>
import { RouterLink, useRouter } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import { baseUrl } from '@/baseUrl';

const router = useRouter()

async function logout() {
  try {
    await fetch(`${baseUrl}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    localStorage.clear()
    router.push(`/`)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="body border">
    <RouterLink to="/mhs">
      <Button variant="link">Home</Button>
    </RouterLink>
    <RouterLink to="/mhs/pengajuan-ta">
      <Button variant="link">Pemilihan Pembimbing</Button>
    </RouterLink>
    <Button variant="destructive" @click="logout">Logout</Button>
  </div>
</template>

<style scoped>
.body {
  width: 100%;
  height: 20vh;
}
</style>