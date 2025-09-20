<script setup>
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Admin.vue';
import Sidebar from '@/components/sidebar/admin/TugasAkhir.vue';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Input from '@/components/ui/input/Input.vue';
import IconUpload from '@/components/icons/IconUpload.vue';
import ListBerkas from '@/components/ListBerkas.vue';

const selectedFile = ref(null)

const jenisDok = ref()
const nomorDok = ref()
const keteranganDok = ref()

function handleFileUpload(event) {
  selectedFile.value = event.target.files[0]
}

async function uploadFile() {
  let kodeDok = ''
  if (jenisDok.value === 'Administrasi') {
    kodeDok = `A`
  } else if (jenisDok.value === 'Proposal') {
    kodeDok = `B`
  } else if (jenisDok.value === 'Laporan') {
    kodeDok = `C`
  }

  const newFileName = `${kodeDok}${nomorDok.value.toUpperCase()} - ${selectedFile.value.name}`
  const uploadedFile = new File([selectedFile.value], newFileName)

  const formData = new FormData()
  formData.append(`file`, uploadedFile)
  formData.append(`kode`, `${kodeDok}${nomorDok.value.toUpperCase()}`)
  formData.append(`name`, newFileName)
  formData.append(`type`, jenisDok.value)
  formData.append(`keterangan`, keteranganDok.value);

  try {
    const response = await fetch(`${baseUrl}/administrasi/`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      body: formData,
    });

    const result = await response.json()
    if (result) {
      window.location.reload()
    }
  } catch (error) {
    console.log(error.message)
  }
}
</script>

<template>
  <Header />
  <Sidebar />

  <div class="body-head-side">
    <div class="m-2 font-semibold text-blue-800 text-xl">
      Template Pemberkasan Tugas Akhir
    </div>

    <div class="m-2">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline" id="icon-create">
            <IconUpload /> Upload Dokumen
          </Button>
        </DialogTrigger>
        <DialogContent class="text-sm">
          <DialogHeader>
            <DialogTitle>Rincian Template Dokumen</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div class="flex flex-col gap-2">
            <div class="flex flex-wrap gap-1">
              <label for="jenis-dok" class="min-w-[100px] max-w-[100px] content-center">Jenis</label>
              <Select id="jenis-dok" v-model="jenisDok">
                <SelectTrigger class="flex-1">
                  <SelectValue placeholder="Jenis Dokumen" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Administrasi">Administrasi</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Laporan">Laporan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex flex-wrap gap-1">
              <div class="min-w-[100px] max-w-[100px] content-center">Nomor</div>
              <div class="flex flex-1 border rounded-md py-2 px-2 font-mono">
                <div class="content-center pl-1">
                  <span v-if="jenisDok === 'Administrasi'">A</span>
                  <span v-else-if="jenisDok === 'Proposal'">B</span>
                  <span v-else-if="jenisDok === 'Laporan'">C</span>
                </div>
                <input class="flex-1 focus:outline-none" v-model="nomorDok" />
              </div>
            </div>

            <div class="flex flex-wrap gap-1">
              <div class="min-w-[100px] max-w-[100px]">Keterangan</div>
              <textarea rows="2" class="border rounded-md flex-1 py-2 px-3 max-h-[150px] min-h-[40px]"
                v-model="keteranganDok" />
            </div>

            <div>
              <Input type="file" @change="handleFileUpload" class="w-full cursor-pointer" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose as-child>
              <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
            </DialogClose>
            <DialogClose as-child>
              <Button class="cursor-pointer w-[100px]" @click="uploadFile"
                :disabled="!selectedFile || !jenisDok || !nomorDok || !keteranganDok">
                Upload
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    <ListBerkas :access="true" />
  </div>
</template>