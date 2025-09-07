<script setup>
import { RouterLink, useRouter } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import { baseUrl } from '@/baseUrl';
import { ref } from 'vue';

const router = useRouter()
const selectedIndex = Number(localStorage.getItem('headerIndex'))
const menuList = ref([
  {
    name: 'Home',
    link: '/admin',
  },
  {
    name: 'Civitas',
    link: '/admin/civitas/dosen',
  },
  {
    name: 'Tugas Akhir',
    link: '/admin/tugas-akhir/daftar',
  },
])

function changeIndex(index) {
  localStorage.setItem('headerIndex', index)
  localStorage.setItem('sidebarIndex', 0)
}

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
        <div v-for="(menu, index) in menuList" :key="index">
          <RouterLink :to="menu.link">
            <Button variant="link" class="cursor-pointer" @click="changeIndex(index)"
              :class="{ 'underline': index === selectedIndex }">
              {{ menu.name }}
            </Button>
          </RouterLink>
        </div>
      </div>
      <div>
        <Button variant="ghost" class="w-[100px] hover:bg-red-600 hover:text-white" @click="logout">
          Logout
        </Button>
      </div>
    </div>
  </div>
</template>