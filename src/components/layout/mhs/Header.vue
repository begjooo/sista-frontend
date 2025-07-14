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

    router.push(`/`)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="body border">
    <RouterLink to="/">
      <Button variant="link">Home</Button>
    </RouterLink>
    <RouterLink to="/mhs/sempro">
      <Button variant="link">Seminar Proposal</Button>
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