<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const show = ref(true)
const menuList = ref([
  {
    name: 'Dosen',
    link: '/admin/civitas/dosen',
  },
  {
    name: 'Mahasiswa',
    link: '/admin/civitas/mhs',
  },
  {
    name: 'Tendik',
    link: '/admin/civitas/tendik',
  }
])

function changeIndex(index) {
  localStorage.setItem('sidebarIndex', index)
}
</script>

<template>
  <div class="sidebar-nav text-sm">
    <div v-for="(menu, index) in menuList" :key="index">
      <RouterLink :to="menu.link">
        <Button variant="link" class="text-white cursor-pointer pl-2" @click="changeIndex(index)"
          :class="{ 'underline': index === selectedIndex }">
          {{ menu.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>