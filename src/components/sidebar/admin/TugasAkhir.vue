<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
  {
    name: 'Daftar TA',
    link: '/admin/tugas-akhir/daftar',
  },
  {
    name: 'Usulan TA',
    link: '/admin/tugas-akhir/usulan',
  },
  {
    name: 'Peraturan',
    link: '/admin/tugas-akhir/peraturan',
  },
  {
    name: 'Pengumuman',
    link: '/admin/tugas-akhir/pengumuman',
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
          {{ menu.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>