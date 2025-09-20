<script setup>
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Mhs.vue';
import Sidebar from '@/components/sidebar/mhs/TugasAkhir.vue';
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
import ListBerkas from '@/components/ListBerkas.vue';

const username = localStorage.getItem('username')

const docList = ref();
const selectedFile = ref(null);

function handleFileUpload(event) {
  selectedFile.value = event.target.files[0]
}

async function uploadFile() {
  if (!selectedFile.value) {
    alert(`file kosong`)
    return
  }

  const formData = new FormData()
  formData.append(`file`, selectedFile.value)

  try {
    const response = await fetch(`${baseUrl}/berkas/ta/${username}`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      body: formData,
    });

    const result = await response.json();
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(async (req, res) => {
  console.log(`onMounted() Administrasi`)

  try {
    const response = await fetch(`${baseUrl}/administrasi/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })

    docList.value = await response.json()
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <Sidebar />

  <div class="body-head-side text-sm">
    <div>
      <div class="m-2 font-semibold text-blue-800 text-xl">
        Template Pemberkasan Tugas Akhir
      </div>
      <ListBerkas />
    </div>

    <div>
      <div>Kelengkapan Anda</div>
      <table class="w-full text-sm">
        <TableHeader>
          <TableRow>
            <TableHead class="">Nomor</TableHead>
            <TableHead class="">Nama</TableHead>
            <TableHead class="">Keterangan</TableHead>
            <TableHead class="">Status</TableHead>
            <TableHead class="">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <!-- <TableRow v-for="entity in entityList">
            <TableCell class="font-mono">{{ entity.username }}</TableCell>
            <TableCell class="font-mono">{{ entity.nip }}</TableCell>
            <TableCell class="">{{ entity.fullname }}</TableCell>
            <TableCell class="">{{ entity.jabatan_fungsional }}</TableCell>
            <TableCell class="">{{ entity.email }}</TableCell>
            <TableCell class="">{{ entity.kbk }}</TableCell>
            <TableCell class="flex gap-1 justify-end">
              <LihatDosen :username="entity.username" :w="20" :h="20" />
              <EditDosen :username="entity.username" :currentData="entity" :w="20" :h="20" />
              <RemoveAccount :job="'dosen'" :username="entity.username" :w="20" :h="20" />
            </TableCell>
          </TableRow> -->
        </TableBody>
      </table>
    </div>
  </div>
</template>