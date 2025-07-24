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
  <div class="header-nav">
    <div class="flex flex-wrap gap-2 justify-between">
      <div class="flex flex-wrap gap-2">
        <RouterLink to="/admin" class="">
          <Button variant="ghost" class="w-[100px] hover:bg-blue-800 hover:text-white">Home</Button>
        </RouterLink>
        <RouterLink to="/admin/dosen">
          <Button variant="ghost" class="w-[100px] hover:bg-blue-800 hover:text-white">Dosen</Button>
        </RouterLink>
        <RouterLink to="/admin/mhs">
          <Button variant="ghost" class="w-[100px] hover:bg-blue-800 hover:text-white">Mahasiswa</Button>
        </RouterLink>
        <RouterLink to="/admin/tendik">
          <Button variant="ghost" class="w-[100px] hover:bg-blue-800 hover:text-white">Tendik</Button>
        </RouterLink>
      </div>

      <div>
        <Button variant="ghost" class="w-[100px] hover:bg-red-600 hover:text-white" @click="logout">Logout</Button>
      </div>
    </div>
  </div>
</template>