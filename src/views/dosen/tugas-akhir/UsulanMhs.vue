<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';
import TugasAkhir from '@/components/dosen/layout/sidebar/TugasAkhir.vue';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const username = localStorage.getItem('username')
const usulanTaList = ref([])
const mhsDataPribadi = ref()
const mhsPortofolio = ref()

async function lihatMhs(username) {
  console.log(username)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/data`)
    const data = await response.json()
    console.log(data)
    if (!data) {
      mhsDataPribadi.value = null
      mhsPortofolio.value = null
    } else {
      mhsDataPribadi.value = data.pribadi
      mhsPortofolio.value = data.portofolio
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  console.log(`UsulanMhs`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-mhs/list`)
    usulanTaList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side text-sm">
    <div v-if="usulanTaList">
      <div v-for="usulan in usulanTaList" class="rounded-md bg-blue-50 m-2 px-2 py-2 ">
        <div class="flex flex-col">
          <div class="border-b mb-1 pb-1">
            <span v-if="usulan.tahap === 'Pengusulan'">
              <span class="font-semibold">Permintaan</span>
              dari {{ usulan.name }}
            </span>
            <span v-if="usulan.tahap === 'Diskusi'">
              <span class="font-semibold">Diskusi</span>
              dengan {{ usulan.name }}
            </span>
            sebagai <span class="font-semibold">{{ usulan.degree }}</span>
          </div>

          <div class="flex flex-wrap border-b mb-1 pb-1">
            <div class="min-w-[150px]">KBK</div>
            <div class="font-semibold">{{ usulan.kbk }}</div>
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
        </div>
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="link" @click="lihatMhs(usulan.username)" class="cursor-pointer">Profile MHS</Button>
          </DialogTrigger>
          <DialogContent class="min-w-[300px]">
            <DialogHeader>
              <DialogTitle>Data Mahasiswa</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div v-if="mhsDataPribadi">
              <div class="border rounded-md text-sm max-h-[400px] overflow-y-auto px-2 py-1">
                <div class="">
                  <div class="flex flex-col font-semibold text-center">
                    <div>{{ mhsDataPribadi.name }} [{{ mhsDataPribadi.username }}]</div>
                    <div>{{ mhsDataPribadi.kelas }} | {{ mhsDataPribadi.prodi }} | {{ mhsDataPribadi.tahun_ajaran }}
                    </div>
                  </div>

                  <div class="mt-2">
                    <div class="font-semibold">Portofolio</div>
                    <div v-if="mhsPortofolio">
                      <div v-for="portofolio in mhsPortofolio">
                        <div>{{ portofolio }}</div>
                      </div>
                    </div>
                    <div v-else>
                      Tidak ada data
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-red-600 font-semibold">
              Data {{ usulan.name }} NIM {{ usulan.username }} tidak ditemukan!
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="link" class="cursor-pointer">Ajak Diskusi</Button>
        <Button variant="link" class="cursor-pointer">Tolak</Button>
      </div>
    </div>
  </div>
</template>