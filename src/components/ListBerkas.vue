<script setup>
import { baseUrl } from '@/baseUrl';
import { onMounted, ref } from 'vue';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import IconTrash from '@/components/icons/IconTrash.vue';
import IconDownload from '@/components/icons/IconDownload.vue';

const props = defineProps(['access'])

const docList = ref()
const sortedDocList = ref()

async function hapus(kode) {
  try {
    const response = await fetch(`${baseUrl}/administrasi/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ kode }),
    });

    const result = await response.json();
    if (result) {
      window.location.reload()
    }
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(async (req, res) => {
  console.log(`onMounted() ListBerkas`)
  try {
    const response = await fetch(`${baseUrl}/administrasi/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
    docList.value = await response.json()
    sortedDocList.value = docList.value.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <div v-if="docList">
    <table class="w-full text-sm">
      <TableHeader>
        <TableRow>
          <!-- <TableHead class="">Kode</TableHead> -->
          <TableHead class="">Dokumen</TableHead>
          <TableHead class="">Jenis</TableHead>
          <TableHead class="">Keterangan</TableHead>
          <TableHead class=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="doc in sortedDocList">
          <!-- <TableCell class="font-mono">{{ doc.kode }}</TableCell> -->
          <TableCell class="min-w-[150px] max-w-[150px]">
            <div class="text-wrap">
              {{ doc.name }}
            </div>
          </TableCell>
          <TableCell class="">{{ doc.type }}</TableCell>
          <TableCell class="min-w-[300px] max-w-[300px]">
            <div class="text-wrap">
              {{ doc.keterangan }}
            </div>
          </TableCell>
          <TableCell class="flex gap-1 justify-end">
            <a :href="baseUrl + doc.path" target="_blank">
              <IconDownload id="icon-create" class="w-[20px] h-[20px]" />
            </a>
            <div v-if="props.access">
              <AlertDialog>
                <AlertDialogTrigger>
                  <IconTrash id="icon-delete" class="w-[20px] h-[20px]" />
                </AlertDialogTrigger>

                <AlertDialogContent class="w-[400px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription>
                      Yakin ingin <span class="font-bold">menghapus</span> template dokumen?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel class="w-[100px] cursor-pointer">Tidak</AlertDialogCancel>
                    <AlertDialogAction @click="hapus(doc.kode)" class="bg-red-600 w-[100px] cursor-pointer">
                      Ya
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </table>
  </div>
</template>