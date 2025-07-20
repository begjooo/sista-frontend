<script setup>
import { onMounted, ref } from 'vue';
import Header from '../../components/layout/admin/Header.vue';
import { baseUrl } from '@/baseUrl';
import Button from '@/components/ui/button/Button.vue';

const entityList = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/list-full`)
    entityList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div>
    <RouterLink to="/admin/dosen/signup">
      <Button>Buat Akun Dosen</Button>
    </RouterLink>
  </div>

  <div v-if="entityList.length !== 0">
    <div v-for="entity in entityList">
      <div>{{ entity.fullname }} [{{ entity.username }}]</div>
      <div></div>
    </div>
  </div>
</template>