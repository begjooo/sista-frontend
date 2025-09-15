<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Dosen.vue';
import TugasAkhir from '@/components/sidebar/dosen/TugasAkhir.vue';
import LihatMhs from '@/components/lihat/Mhs.vue';

const username = localStorage.getItem('username')

const bimbinganUtamaList = ref()
const bimbinganPdp1List = ref()
const bimbinganPdp2List = ref()

onMounted(async () => {
  console.log(`Bimbingan`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/bimbingan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
    const result = await response.json()
    if (result) {
      bimbinganUtamaList.value = result.utama
      bimbinganPdp1List.value = result.pdp1
      bimbinganPdp2List.value = result.pdp2
    }
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side text-sm pb-2">
    <div v-if="bimbinganUtamaList && bimbinganUtamaList.length !== 0">
      <div class="text-center font-semibold my-2">Daftar Bimbingan Utama</div>
      <div class="flex flex-col gap-2 text-sm mx-2">
        <div v-for="mhs in bimbinganUtamaList" class="rounded-sm py-2 px-3 bg-blue-100">
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
            <div class="min-w-[100px]">Skema</div>
            <div>{{ mhs.skema }}</div>
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

          <div class="">
            <LihatMhs :username="mhs.mhs_username" />

            <!-- <Button>
              Data Bimbingan
            </Button> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="bimbinganPdp1List && bimbinganPdp1List.length !== 0">
      <div class="text-center font-semibold my-2">Daftar Bimbingan Pendamping Pertama</div>
      <div class="flex flex-col gap-2 text-sm mx-2">
        <div v-for="mhs in bimbinganPdp1List" class="rounded-sm py-2 px-3 bg-blue-100">
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
            <div class="min-w-[100px]">Skema</div>
            <div>{{ mhs.skema }}</div>
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

          <div class="">
            <LihatMhs :username="mhs.mhs_username" />

            <!-- <Button>
              Data Bimbingan
            </Button> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="bimbinganPdp2List && bimbinganPdp2List.length !== 0">
      <div class="text-center font-semibold my-2">Daftar Bimbingan Pendamping Kedua</div>
      <div class="flex flex-col gap-2 text-sm mx-2">
        <div v-for="mhs in bimbinganPdp2List" class="rounded-sm py-2 px-3 bg-blue-100">
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
            <div class="min-w-[100px]">Skema</div>
            <div>{{ mhs.skema }}</div>
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

          <div class="">
            <LihatMhs :username="mhs.mhs_username" />

            <!-- <Button>
              Data Bimbingan
            </Button> -->
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="bimbinganUtamaList && bimbinganUtamaList.length === 0 && bimbinganPdp1List && bimbinganPdp1List.length === 0 && bimbinganPdp1List && bimbinganPdp2List.length === 0"
      class="text-center font-semibold italic p-2">
      Anda tidak memiliki mahasiswa bimbingan
    </div>
  </div>
</template>