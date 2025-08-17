<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
  {
    name: 'Curriculum Vitae',
    link: '/mhs/profile/cv',
  },
  {
    name: 'Pribadi',
    link: '/mhs/profile/cv',
  },
  {
    name: 'Keamanan',
    link: '/mhs/profile/cv',
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
        <Button variant="link" class="text-white cursor-pointer" @click="changeIndex(index)"
          :class="{ 'underline': index === selectedIndex }">
          {{ menu.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>