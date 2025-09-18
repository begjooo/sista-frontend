<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
  {
    name: 'Administrasi',
    link: '/mhs/tugas-akhir/administrasi',
  },
  {
    name: 'Usulan Pembimbing',
    link: '/mhs/tugas-akhir/usulan-pbb',
  },
])

function changeIndex(index) {
  localStorage.setItem('sidebarIndex', index)
}
</script>

<template>
  <div class="sidebar-nav">
    <div v-for="(menu, index) in menuList" :key="index">
      <RouterLink :to="menu.link">
        <Button variant="link" class="text-white cursor-pointer pl-2" @click="changeIndex(index)"
          :class="{ 'underline': index === selectedIndex }">
          <div v-if="menu.name === 'Usulan Pembimbing'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from IconaMoon by Dariush Habibpour - https://creativecommons.org/licenses/by/4.0/ -->
              <g fill="none">
                <path fill="currentColor" d="M19 11a8 8 0 1 1-16 0a8 8 0 0 1 16 0" opacity=".16" />
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" />
              </g>
            </svg>
          </div>
          <div v-else-if="menu.name === 'Administrasi'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M9 12h6q.425 0 .713-.288T16 11t-.288-.712T15 10H9q-.425 0-.712.288T8 11t.288.713T9 12m0-4h6q.425 0 .713-.288T16 7t-.288-.712T15 6H9q-.425 0-.712.288T8 7t.288.713T9 8m10.95 12.475L15.9 15.2q-.425-.575-1.05-.887T13.5 14H4V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .125-.012.238t-.038.237M6 22q-.825 0-1.412-.587T4 20v-4h9.5q.25 0 .463.113t.362.312l4.2 5.5q-.125.05-.262.063T18 22z" />
            </svg>
          </div>
          {{ menu.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>