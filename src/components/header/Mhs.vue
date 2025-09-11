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
    link: '/mhs',
  },
  {
    name: 'Tugas Akhir',
    link: '/mhs/tugas-akhir/usulan-pbb',
  },
  {
    name: 'Profile',
    link: '/mhs/profile/cv',
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

              <div v-if="menu.name === 'Home'">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
                  </g>
                </svg>
              </div>
              <div v-else-if="menu.name === 'Tugas Akhir'">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 4.5h3.75A1.5 1.5 0 0 1 21 6v15.75a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5h3.75a3.75 3.75 0 0 1 7.5 0" />
                    <path d="M12 4.5a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.75 10.5H12m3 0h2.25m0 3.75H12m-3 0H6.75m0 3.75H12m3 0h2.25" />
                  </g>
                </svg>
              </div>
              <div v-else-if="menu.name === 'Profile'">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </div>
              {{ menu.name }}
            </Button>
          </RouterLink>
        </div>
      </div>
      <div>
        <Button variant="ghost" class="w-[100px] hover:bg-red-600 hover:text-white" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M10 8V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-2" />
              <path d="M15 12H3l3-3m0 6l-3-3" />
            </g>
          </svg>
          Logout
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  width: 100%;
  height: 20vh;
}
</style>