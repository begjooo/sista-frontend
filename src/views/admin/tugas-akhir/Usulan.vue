<script setup>
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Admin.vue';
import Sidebar from '@/components/sidebar/admin/TugasAkhir.vue';
import { onMounted, ref } from 'vue';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button';

const taIndex = ref(1)
const usulanDosen = ref()
const usulanMhs = ref()

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/admin/usulan-ta`)
    const result = await response.json()
    if (result) {
      usulanDosen.value = result.usulanDosen
      usulanMhs.value = result.usulanMhs
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <Sidebar />

  <div class="body-head-side">
    <div v-if="usulanDosen && usulanMhs">
      <div class="border text-center">
        <Button variant="link" class="cursor-pointer" @click="taIndex = 1" :class="{ 'underline': taIndex === 1 }">
          TA dari Dosen
        </Button>
        <Button variant="link" class="cursor-pointer" @click="taIndex = 2" :class="{ 'underline': taIndex === 2 }">
          TA dari Mahasiswa
        </Button>
      </div>
      <div v-if="taIndex === 1">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class=""></TableHead>
                <TableHead class="">Judul</TableHead>
                <TableHead class="">Dosen</TableHead>
                <TableHead class="">KBK</TableHead>
                <TableHead class="">Minat</TableHead>
                <TableHead class="">Skema</TableHead>
                <!-- <TableHead class="">Deskripsi</TableHead> -->
                <TableHead class="">Mahasiswa Pengusul</TableHead>
                <TableHead class="">Mahasiswa Diskusi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="usulan in usulanDosen">
                <TableCell class="">
                  <svg id="icon-edit" @click="" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" />
                  </svg>
                </TableCell>
                <TableCell class="min-w-[300px] max-w-[300px]">
                  <div class="text-wrap">
                    {{ usulan.judul }}
                  </div>
                </TableCell>
                <TableCell class="">{{ usulan.dosen_fullname }}</TableCell>
                <TableCell class="min-w-[150px] max-w-[150px]">
                  <div class="text-wrap">
                    {{ usulan.kbk }}
                  </div>
                </TableCell>
                <TableCell class="min-w-[150px] max-w-[150px]">
                  <div class="text-wrap">
                    {{ usulan.minat }}
                  </div>
                </TableCell>
                <TableCell class="">{{ usulan.skema }}</TableCell>
                <!-- <TableCell class="min-w-[300px] max-w-[300px]">
                <div class="text-wrap">
                  {{ usulan.deskripsi }}
                </div>
              </TableCell> -->
                <TableCell class="min-w-[200px] max-w-[200px]">
                  <div class="">
                    <div v-for="(mhs, mhsIndex) in usulan.mhs_pengusul" class="truncate">
                      {{ mhs.name }}
                    </div>
                  </div>
                </TableCell>
                <TableCell class="min-w-[200px] max-w-[200px]">
                  <div class="text-wrap">
                    <div v-for="(mhs, mhsIndex) in usulan.mhs_diskusi" class="truncate">
                      {{ mhs.name }}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div v-else-if="taIndex === 2">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class=""></TableHead>
                <TableHead class="">Judul</TableHead>
                <TableHead class="">Dosen</TableHead>
                <TableHead class="">KBK</TableHead>
                <TableHead class="">Minat</TableHead>
                <TableHead class="">Skema</TableHead>
                <!-- <TableHead class="">Deskripsi</TableHead> -->
                <TableHead class="">Mahasiswa</TableHead>
                <TableHead class="">Tahap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="usulan in usulanMhs">
                <TableCell class="">
                  <svg id="icon-edit" @click="" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" />
                  </svg>
                </TableCell>
                <TableCell class="min-w-[300px] max-w-[300px]">
                  <div class="text-wrap">
                    {{ usulan.judul }}
                  </div>
                </TableCell>
                <TableCell class="">{{ usulan.dosen_fullname }}</TableCell>
                <TableCell class="min-w-[150px] max-w-[150px]">
                  <div class="text-wrap">
                    {{ usulan.kbk }}
                  </div>
                </TableCell>
                <TableCell class="min-w-[150px] max-w-[150px]">
                  <div class="text-wrap">
                    {{ usulan.minat }}
                  </div>
                </TableCell>
                <TableCell class="">{{ usulan.skema }}</TableCell>
                <!-- <TableCell class="min-w-[300px] max-w-[300px]">
                <div class="text-wrap">
                  {{ usulan.deskripsi }}
                </div>
              </TableCell> -->
                <TableCell class="min-w-[200px] max-w-[200px] truncate">
                  {{ usulan.mhs_name }}
                </TableCell>
                <TableCell class="">{{ usulan.tahap }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>