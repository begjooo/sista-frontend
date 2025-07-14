<script setup>
import { baseUrl } from '@/baseUrl';
import Login from '@/views/Login.vue';
import Button from '@/components/ui/button/Button.vue';
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
        console.log(`loncat ke dosen`)
        router.push('/dosen')
        break
      default:
        console.log(`loncat ke mhs`)
        router.push(`/mhs`)
        break
    }
  }
})
</script>

<template>
  <div v-if="userData === 0">
    <Login />
  </div>
  <!-- <div v-else>
    berhasil login, selamat datang {{ userData }}
  </div> -->
  <!-- berhasil login, selamat datang {{ userData }}
  <div v-if="userData === 0">
    <RouterLink to="/login"><Button>Login</Button></RouterLink>
  </div> -->
</template>

<style scoped></style>