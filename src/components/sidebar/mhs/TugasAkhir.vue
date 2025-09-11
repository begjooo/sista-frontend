<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
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
          {{ menu.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>