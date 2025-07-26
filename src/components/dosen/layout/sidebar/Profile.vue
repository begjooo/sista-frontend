<script setup>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="sidebar-nav">
    <div>
      <RouterLink to="/dosen/profile/pribadi">
        <Button variant="link">Pribadi</Button>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/dosen/profile/keamanan">
        <Button variant="link">Keamanan</Button>
      </RouterLink>
    </div>
  </div>
</template>