<script setup>
import { RouterLink } from 'vue-router';
import Button from '../../ui/button/Button.vue';
</script>

<template>
  <div class="body border">
    <RouterLink to="/mhs">
      <Button variant="link">Home</Button>
    </RouterLink>
    <RouterLink to="/mhs/pilih-pbb">
      <Button variant="link">Pilih Pembimbing</Button>
    </RouterLink>
    <RouterLink to="/">
      <Button variant="destructive">Logout</Button>
    </RouterLink>
  </div>
</template>

<style scoped>
.body {
  width: 100%;
  height: 20vh;
}
</style>