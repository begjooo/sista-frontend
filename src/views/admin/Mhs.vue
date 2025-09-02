<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';

import Header from '@/components/admin/layout/Header.vue';

const entityList = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/mhs/list`)
    entityList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div v-if="entityList.length !== 0">
    <div v-for="entity in entityList" class="border m-2 p-2">
      <div>{{ entity.name }} [{{ entity.username }}]</div>
      <div v-if="entity.ta.pengajuan.pbb">
        <!-- {{ entity.ta.pengajuan.pbb }} -->
        {{ entity.ta.pengajuan.pbb.dosen1.name }}
        {{ entity.ta.pengajuan.pbb.dosen1.username }}
        {{ entity.ta.pengajuan.pbb.dosen1.status }}
      </div>
    </div>
  </div>
</template>