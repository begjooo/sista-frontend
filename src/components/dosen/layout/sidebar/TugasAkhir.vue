<script setup>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="sidebar-nav">
    <div>
      <RouterLink to="/dosen/tugas-akhir/usulan">
        <Button variant="link">Usulan Judul</Button>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/dosen/tugas-akhir/permintaan-pbb">
        <Button variant="link">Permintaan Bimbingan</Button>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/dosen/tugas-akhir/bimbingan">
        <Button variant="link">Bimbingan</Button>
      </RouterLink>
    </div>
  </div>
</template>