<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/header/Dosen.vue';
import LiniWaktu from '@/components/LiniWaktu.vue';

const username = localStorage.getItem('username')
const userData = ref()
const aturan = ref()

onMounted(async () => {
  console.log(`onMounted Home`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/data`)
    userData.value = await response.json()
  } catch (error) {
    console.log(error.message)
  }

  try {
    const response = await fetch(`${baseUrl}/ta/aturan`)
    aturan.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div class="body-head">
    <div class="text-center p-2 text-sm bg-gray-200">
      <p>
        Sistem Tugas Akhir (SISTA) masih dalam
        <span class="font-semibold">pengembangan</span>
      </p>
      <p>
        Hubungi
        <span class="font-semibold">(WA) 081931222450 A.N. Mochamad Soebagja Budiana</span>
      </p>
      <p>
        jika mengalami
        <span class="font-semibold text-red-600">BUG, GLITCH, dan/atau ERROR</span>
      </p>
      <p>
        yang disertai dengan
        <span class="font-semibold">Screenshot</span>
      </p>
    </div>

    <div v-if="userData">
      <div class="text-center py-2">
        Selamat datang {{ userData.fullname }}
      </div>
    </div>

    <div v-if="aturan" class="text-sm px-2">
      <div class="text-center text-base font-semibold pb-1">Lini Waktu</div>
      <div class="flex flex-wrap gap-2 justify-center">
        <div class="border rounded-sm px-2 py-1 w-[300px]">
          <div class="font-semibold text-center">
            Pengusulan Pembimbing
          </div>
          <LiniWaktu :awal="aturan.usulan.awal" :akhir="aturan.usulan.akhir" />
        </div>

        <div class="border rounded-sm px-2 py-1 w-[300px]">
          <div class="font-semibold text-center">
            Pelaksanaan TA
          </div>
          <LiniWaktu :awal="aturan.pelaksanaan.awal" :akhir="aturan.pelaksanaan.akhir" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
