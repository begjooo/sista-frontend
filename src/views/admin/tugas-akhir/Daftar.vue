<script setup>
import { onMounted, ref } from 'vue';
import Header from '@/components/header/Admin.vue';
import Sidebar from '@/components/sidebar/admin/TugasAkhir.vue';
import { baseUrl } from '@/baseUrl';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const taList = ref()

onMounted(async () => {
  console.log(`onMounted Daftar`)
  try {
    const response = await fetch(`${baseUrl}/ta/list`)
    taList.value = await response.json()
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <Sidebar />

  <div class="body-head-side">
    <div v-if="taList">
      <div class="text-center pt-2 font-semibold text-blue-800 text-xl">
        Daftar Tugas Akhir
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class=""></TableHead>
              <TableHead class="">Judul</TableHead>
              <TableHead class="">Tahap</TableHead>
              <TableHead class="">Skema</TableHead>
              <TableHead class="">Minat</TableHead>
              <TableHead class="">KBK</TableHead>
              <TableHead class="">Mahasiswa</TableHead>
              <TableHead class="">Pembimbing 1</TableHead>
              <TableHead class="">Pembimbing 2</TableHead>
              <TableHead class="">Pembimbing 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="entity in taList">
              <TableCell class="">
                <svg id="icon-edit" @click="" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" />
                </svg>
              </TableCell>
              <TableCell class="min-w-[300px] max-w-[300px]">
                <div class="text-wrap">
                  {{ entity.judul }}
                </div>
              </TableCell>
              <TableCell class="">{{ entity.tahap }}</TableCell>
              <TableCell class="">{{ entity.skema }}</TableCell>
              <TableCell class="">{{ entity.minat }}</TableCell>
              <TableCell class="">{{ entity.kbk }}</TableCell>
              <TableCell class="">{{ entity.mhs_name }}</TableCell>
              <TableCell class="">{{ entity.dosen1_fullname }}</TableCell>
              <TableCell class="">
                <div v-if="entity.dosen2_fullname">
                  {{ entity.dosen2_fullname }}
                </div>
                <div v-else class="">
                  -
                </div>
              </TableCell>
              <TableCell class="">
                <div v-if="entity.dosen3_fullname">
                  {{ entity.dosen3_fullname }}
                </div>
                <div v-else class="">
                  -
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>