<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Admin.vue';
import Civitas from '@/components/sidebar/admin/Civitas.vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import LihatMhs from '@/components/lihat/Mhs.vue';
import EditMhs from '@/components/edit/Mhs.vue';
import RemoveAccount from '@/components/delete/Account.vue';

const entityList = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/mhs/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
    entityList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <Civitas />

  <div class="body-head-side">
    <div v-if="entityList">
      <div>
        <table class="w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead class="">NIM</TableHead>
              <TableHead class="">Nama</TableHead>
              <TableHead class="">email</TableHead>
              <TableHead class="">Tahun TA</TableHead>
              <TableHead class="">Kelas</TableHead>
              <TableHead class="">Program Studi</TableHead>
              <TableHead class=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="entity in entityList">
              <TableCell class="font-mono">{{ entity.username }}</TableCell>
              <TableCell class="">{{ entity.name }}</TableCell>
              <TableCell class="">{{ entity.email }}</TableCell>
              <TableCell class="">{{ entity.tahun_ajaran }}</TableCell>
              <TableCell class="">{{ entity.kelas }}</TableCell>
              <TableCell class="">{{ entity.prodi }}</TableCell>
              <TableCell class="flex gap-1 justify-end">
                <LihatMhs :username="entity.username" :w="20" :h="20" />
                <EditMhs :username="entity.username" :currentData="entity" :w="20" :h="20" />
                <RemoveAccount :job="'mahasiswa'" :username="entity.username" :w="20" :h="20" />
              </TableCell>
            </TableRow>
          </TableBody>
        </table>
      </div>
    </div>
  </div>
</template>