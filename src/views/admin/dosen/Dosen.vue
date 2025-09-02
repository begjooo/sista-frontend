<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import { useRouter } from 'vue-router';

import Header from '@/components/admin/layout/Header.vue';
import Button from '@/components/ui/button/Button.vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import LihatDosen from '@/components/dosen/Lihat.vue';


const entityList = ref([])
const router = useRouter()

async function createDosen() {
  router.push(`/admin/dosen/create`)
}

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

  <div class="body-head">
    <div>
      <svg class="m-2 text-green-600 hover:text-green-700 cursor-pointer" @click="createDosen"
        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3zm-9-2q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" />
      </svg>
    </div>

    <div v-if="entityList.length !== 0">
      <div>
        <Table class="">
          <TableHeader>
            <TableRow>
              <TableHead class="">Kode</TableHead>
              <TableHead class="">NIP</TableHead>
              <TableHead class="">Nama</TableHead>
              <TableHead class="">Jab. Fungsional</TableHead>
              <TableHead class="">email</TableHead>
              <TableHead class="">KBK</TableHead>
              <TableHead class=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="entity in entityList">
              <TableCell class="font-mono">{{ entity.username }}</TableCell>
              <TableCell class="font-mono">{{ entity.nip }}</TableCell>
              <TableCell class="">{{ entity.fullname }}</TableCell>
              <TableCell class="">{{ entity.jabatan_fungsional }}</TableCell>
              <TableCell class="">{{ entity.email }}</TableCell>
              <TableCell class="">{{ entity.kbk }}</TableCell>
              <TableCell class="flex gap-1">
                <LihatDosen :username="entity.username" :width="20" :height="20" />
                <svg class="cursor-pointer hover:text-blue-600" @click="" xmlns="http://www.w3.org/2000/svg" width="20"
                  height="20" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M14 21v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zM4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362L12 17.1V20zm16.575-4.6l.925-.975l-.925-.925l-.95.95zM12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12" />
                </svg>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>