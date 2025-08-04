<script setup>
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';
import TugasAkhir from '@/components/dosen/layout/sidebar/TugasAkhir.vue';
import { Button } from '@/components/ui/button';
import { onMounted, ref } from 'vue';

const username = localStorage.getItem('username')

const bimbinganUtamaList = ref()
const bimbinganPendampingList = ref()

onMounted(async () => {
  console.log(`Bimbingan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/bimbingan`)
    bimbinganUtamaList.value = await response.json()
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side">
    <div v-if="bimbinganUtamaList && bimbinganUtamaList.length !== 0">
      <div class="text-center font-semibold my-2">Daftar Bimbingan Utama</div>
      <div class="flex flex-col gap-2 text-sm mx-2">
        <div v-for="mhs in bimbinganUtamaList" class="rounded-md py-2 px-3 bg-blue-50">
          <!-- {{ mhs }} -->
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Nama</div>
            <div>{{ mhs.mhs_name }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Tahun TA</div>
            <div>{{ mhs.tahun }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Judul</div>
            <div>{{ mhs.judul }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">KBK</div>
            <div>{{ mhs.kbk }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Peminatan</div>
            <div>{{ mhs.minat }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Tahap</div>
            <div>{{ mhs.tahap }}</div>
          </div>

          <div class="mt-2">
            <Button>
              Data Bimbingan
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bimbinganPendampingList && bimbinganPendampingList.length !== 0">
      <div class="text-center font-semibold my-2">Daftar Bimbingan Pendamping</div>
      <div class="flex flex-col gap-2 text-sm mx-2">
        <div v-for="mhs in bimbinganPendampingList" class="rounded-md py-2 px-3 bg-blue-50">
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Nama</div>
            <div>{{ mhs.mhs_name }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Tahun TA</div>
            <div>{{ mhs.tahun }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Judul</div>
            <div>{{ mhs.judul }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">KBK</div>
            <div>{{ mhs.kbk }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Peminatan</div>
            <div>{{ mhs.minat }}</div>
          </div>
          <div class="flex flex-wrap">
            <div class="min-w-[100px]">Tahap</div>
            <div>{{ mhs.tahap }}</div>
          </div>

          <div class="mt-2">
            <Button>
              Data Bimbingan
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>