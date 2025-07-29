<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import BuatUsulan from '@/components/dosen/tugas-akhir/BuatUsulan.vue';
import Header from '@/components/dosen/layout/Header.vue';
import TugasAkhir from '@/components/dosen/layout/sidebar/TugasAkhir.vue';
import LihatMhs from '@/components/dosen/tugas-akhir/LihatMhs.vue';
import Button from '@/components/ui/button/Button.vue';
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


const username = localStorage.getItem('username')
const data = ref({})
const usulanTaList = ref([])

async function hapus(index, taId) {
  console.log(`hapus! ${index} ${taId}`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/hapus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taId }),
    });

    const result = await response.json()
    if (result.status) {
      usulanTaList.value.splice(index, 1)
    } else {
      console.log(result.message)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  console.log(`Usulan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/list`)
    data.value = await response.json()
    // console.log(data.value)
    usulanTaList.value = data.value.usulanTa
    // console.log(usulanTaList.value)
  } catch (error) {
    console.log(error)
    data.value = {}
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side">
    <div class="p-2 text-sm">
      <div class="text-justify mb-2">
        <b>Usulan Judul</b> merupakan judul tugas akhir yang ditawarkan kepada mahasiswa oleh dosen. Judul yang
        diusulkan
        akan tampil pada setiap akun mahasiswa. Mahasiswa yang tertarik dengan judul yang diusulkan dapat mengajukan
        ketertarikannya. Jika anda menerima mahasiswa tersebut maka mahasiswa akan menjadi mahasiswa bimbingan anda.
      </div>
      <div class="border rounded-md p-2">
        <div class="font-semibold mb-2 text-center">Daftar Usulan Tugas Akhir</div>
        <div class="flex flex-col gap-2">
          <div v-for="(usulan, index) in usulanTaList" class="rounded-md p-2 bg-blue-50">
            {{ usulan }}
            <div :class="{ 'border-b mb-1 pb-1': usulan.mhs_pengusul.length !== 0 || usulan.mhs_diskusi.length !== 0 }"
              class="flex flex-col">
              <div v-if="usulan.mhs_pengusul.length !== 0">
                <span class="font-semibold">Permintaan</span>
                dari
                <span v-if="usulan.mhs_pengusul.length !== 0">
                  <LihatMhs :mhsList="usulan.mhs_pengusul" />
                </span>
              </div>
              <div v-if="usulan.mhs_diskusi.length !== 0">
                <span class="font-semibold">Diskusi</span>
                dengan
                <span v-if="usulan.mhs_diskusi.length !== 0">
                  <LihatMhs :mhsList="usulan.mhs_diskusi" />
                </span>
              </div>
            </div>

            <div class="flex flex-wrap border-b mb-1 pb-1">
              <div class="min-w-[150px]">Bidang Peminatan</div>
              <div class="font-semibold">{{ usulan.minat }}</div>
            </div>
            <div class="flex flex-wrap border-b mb-1 pb-1">
              <div class="min-w-[150px]">Judul</div>
              <div class="font-semibold">{{ usulan.judul }}</div>
            </div>
            <div class="md:flex border-b mb-1 pb-1">
              <div class="min-w-[150px] text-center md:text-left">Deskripsi</div>
              <div class="text-justify flex-auto">{{ usulan.deskripsi }}</div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger>
                <div class="text-red-600 hover:text-red-400 cursor-pointer mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                  </svg>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Yakin ingin menghapus judul?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {{ usulan.judul }} akan dihapus secara permanen dan tidak dapat dipulihkan!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction @click="hapus(index, usulan.id)">Yes i'am sure</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap my-2">
        <BuatUsulan :currentData="data" />
      </div>
    </div>
  </div>
</template>