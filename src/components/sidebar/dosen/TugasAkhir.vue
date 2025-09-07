<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
  {
    name: 'Usulan Judul dari Dosen',
    link: '/dosen/tugas-akhir/usulan',
  },
  {
    name: 'Usulan Judul dari Mhs',
    link: '/dosen/tugas-akhir/usulan-mhs',
  },
  {
    name: 'Usulan Pemb. Pendamping dari Mhs',
    link: '/dosen/tugas-akhir/usulan-pdp',
  },
  {
    name: 'Mhs Bimbingan yang diterima',
    link: '/dosen/tugas-akhir/bimbingan',
  }
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