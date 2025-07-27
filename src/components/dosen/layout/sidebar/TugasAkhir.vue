<script setup>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="sidebar-nav">
    <div>
      <RouterLink to="/dosen/tugas-akhir/usulan">
        <Button variant="link" class="text-white">Usulan Judul</Button>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/dosen/tugas-akhir/usulan-mhs">
        <Button variant="link" class="text-white">Usulan Judul MHS</Button>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/dosen/tugas-akhir/bimbingan">
        <Button variant="link" class="text-white">Bimbingan</Button>
      </RouterLink>
    </div>
  </div>
</template>