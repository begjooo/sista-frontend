<script setup>
import { baseUrl } from '@/baseUrl';
import Login from '@/components/Login.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const userData = ref()

onMounted(async () => {
  const response = await fetch(`${baseUrl}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  userData.value = await response.json()
  if (userData.value) {
    switch (userData.value.access) {
      case 'admin':
        console.log(`loncat ke admin`)
        break
      case 'dosen/tendik':
        router.push('/dosen')
        console.log(`loncat ke dosen`)
        break
      default:
        router.push(`/mhs`)
        console.log(`loncat ke mhs`)
        break
    }
  }
})
</script>

<template>
  <div v-if="userData === 0">
    <Login />
  </div>
</template>

<style scoped></style>