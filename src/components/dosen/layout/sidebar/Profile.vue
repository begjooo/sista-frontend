<script setup>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="sidebar-nav">
    <div>
      <RouterLink to="/dosen/profile/pribadi">
        <Button variant="link" class="text-white">Pribadi</Button>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/dosen/profile/keamanan">
        <Button variant="link" class="text-white">Keamanan</Button>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/dosen/profile/penelitian">
        <Button variant="link" class="text-white">Penelitian</Button>
      </RouterLink>
    </div>
  </div>
</template>