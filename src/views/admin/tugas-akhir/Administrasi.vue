<script setup>
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Admin.vue';
import Sidebar from '@/components/sidebar/admin/TugasAkhir.vue';
import { onMounted, ref } from 'vue';
import { Button } from '@/components/ui/button';

const docList = ref()
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
    const response = await fetch(`${baseUrl}/administrasi`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(async (req, res) => {
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

  <div class="body-head-side">
    <div>Berkas keperluan administrasi</div>

    <div>
      <div>Upload Dokumen</div>
      <div>
        <input type="file" @change="handleFileUpload" class="border p-1 mr-2 rounded-sm cursor-pointer" />
        <Button @click="uploadFile" class="cursor-pointer">Upload</Button>
      </div>
    </div>

    <div v-if="docList">
      {{ docList }}
    </div>
  </div>
</template>