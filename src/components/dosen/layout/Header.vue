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
  <div class="header-nav p-2 content-end">
    <div class="flex flex-wrap gap-2 justify-between">
      <div class="flex flex-wrap gap-2">
        <RouterLink to="/dosen">
          <Button variant="ghost" class="w-[] hover:bg-[#334D80] hover:text-white">Home</Button>
        </RouterLink>
        <RouterLink to="/dosen/penelitian/minat">
          <Button variant="ghost" class="w-[] hover:bg-[#334D80] hover:text-white">Penelitian</Button>
        </RouterLink>
        <RouterLink to="/dosen/tugas-akhir/usulan">
          <Button variant="ghost" class="w-[] hover:bg-[#334D80] hover:text-white">Tugas Akhir</Button>
        </RouterLink>
        <RouterLink to="/dosen/profile/pribadi">
          <Button variant="ghost" class="w-[] hover:bg-[#334D80] hover:text-white">Profile</Button>
        </RouterLink>
      </div>

      <div class="">
        <Button variant="ghost" class="w-[100px] hover:bg-red-600 hover:text-white" @click="logout">Logout</Button>
      </div>
    </div>
  </div>
</template>