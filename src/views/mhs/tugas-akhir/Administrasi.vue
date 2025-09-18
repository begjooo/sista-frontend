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

const username = localStorage.getItem('username')

const docList = ref();
const selectedFile = ref(null);

function handleFileUpload(event) {
  selectedFile.value = event.target.files[0]
  console.log(selectedFile.value)
}

async function uploadFile() {
  if (!selectedFile.value) {
    alert(`file kosong`)
    return
  }

  console.log(`gas!`)

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  console.log(formData)
  formData.get('file')
  console.log(formData.get('file'))

  try {
    const response = await fetch(`${baseUrl}/berkas/multer/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(formData)
    });
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
    <div v-if="docList">
      <div v-for="doc in docList">
        <div class="underline hover:text-blue-600">
          <a :href="baseUrl + doc.path" target="_blank">{{ doc.name }}</a>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z" />
          </svg> -->
        </div>
      </div>
    </div>

    <div>
      <div>Upload Dokumen</div>
      <div>
        <input type="file" @change="handleFileUpload" ref="fileInput" class="border p-2 rounded-sm" />
        <Button @click="uploadFile">Upload</Button>
      </div>
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