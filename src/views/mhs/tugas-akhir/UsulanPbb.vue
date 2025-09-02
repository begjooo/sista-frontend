<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/mhs/layout/Header.vue';
import TugasAkhir from '@/components/mhs/layout/sidebar/TugasAkhir.vue';
import PilihPbbUtama from '@/components/mhs/tugas-akhir/PilihPbbUtama.vue';
import PilihPbbPendamping from '@/components/mhs/tugas-akhir/PilihPbbPendamping.vue';

const username = localStorage.getItem('username')
const mhsData = ref()
const dosenList = ref()
const dosenUtamaList = ref()
const jmlCalonPbbUtama = ref(0)
const calonPbbPendamping1 = ref()
const calonPbbPendamping2 = ref()

onMounted(async () => {
  console.log(`onMounted UsulanPbb`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/tugas-akhir/usulan`)
    mhsData.value = await response.json()

    if (mhsData.value.usulan_ta) {
      jmlCalonPbbUtama.value = mhsData.value.usulan_ta.length
    }

    if (mhsData.value.usulan_pdp) {
      calonPbbPendamping1.value = mhsData.value.usulan_pdp.find((item) => item.degree === 'Pembimbing Pendamping Pertama')
      calonPbbPendamping2.value = mhsData.value.usulan_pdp.find((item) => item.degree === 'Pembimbing Pendamping Kedua')
    }
  } catch (error) {
    console.log(error)
  }

  try {
    const response = await fetch(`${baseUrl}/dosen/list`)
    dosenList.value = await response.json()
    dosenUtamaList.value = dosenList.value.filter((item) => item.jabatan_fungsional !== 'CPNS')
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side text-sm">
    <div v-if="mhsData && dosenList && dosenUtamaList">
      <div v-if="mhsData.tugas_akhir">
        <div class="px-2 py-1">
          <div class="text-xl">Pembimbing Anda</div>
          <div class="py-1 my-1 flex flex-col gap-2 border-b">
            <div class="flex flex-wrap">
              <div class="min-w-[200px]">Pembimbing Utama</div>
              <div class="font-semibold">{{ mhsData.tugas_akhir.dosen1_fullname }}</div>
            </div>
            <div v-if="mhsData.tugas_akhir.dosen2_username" class="flex flex-wrap">
              <div class="min-w-[200px]">Pembimbing Pendamping 1</div>
              <div>{{ mhsData.tugas_akhir.dosen2_fullname }}</div>
            </div>
            <div v-if="mhsData.tugas_akhir.dosen3_username" class="flex flex-wrap">
              <div class="min-w-[200px]">Pembimbing Pendamping 2</div>
              <div>{{ mhsData.tugas_akhir.dosen3_fullname }}</div>
            </div>
          </div>

          <div class="text-center font-semibold italic p-2">
            Jangan lupa selalu bimbingan ya
          </div>
        </div>

        <div class="text-center">
          <div v-if="!mhsData.tugas_akhir.dosen2_username" class="mb-2">
            <div v-if="calonPbbPendamping1">
              <div class="text-left px-2 py-2" :class="{
                'bg-orange-100': calonPbbPendamping1.tahap === 'Pengusulan',
                'bg-blue-100': calonPbbPendamping1.tahap === 'Diskusi'
              }">
                <div class="flex flex-wrap">
                  <div class="w-[300px]">Calon {{ calonPbbPendamping1.degree }}</div>
                  <div>{{ calonPbbPendamping1.fullname }}</div>
                </div>
                <div class="flex flex-wrap font-semibold">
                  <div class="w-[300px]">Tahap Pengusulan</div>
                  <div>{{ calonPbbPendamping1.tahap }}</div>
                </div>
                <div v-if="calonPbbPendamping1.tahap === 'Diskusi'" class="rounded-md mt-2 px-2 py-1 bg-white">
                  <div class="italic font-semibold">Pesan dari dosen</div>
                  <div>{{ calonPbbPendamping1.msg }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <PilihPbbPendamping :dosenList="dosenList" :mhsName="mhsData.pribadi.name"
                :mhsTahun="mhsData.pribadi.tahun_ajaran" :mhsTa="mhsData.tugas_akhir"
                :degree="'Pembimbing Pendamping Pertama'" />
            </div>
          </div>

          <div v-if="mhsData.tugas_akhir.dosen2_username && !mhsData.tugas_akhir.dosen3_username">
            <div v-if="calonPbbPendamping2">
              <div class="text-left px-2 py-2" :class="{
                'bg-orange-100': calonPbbPendamping2.tahap === 'Pengusulan',
                'bg-blue-100': calonPbbPendamping2.tahap === 'Diskusi'
              }">
                <div class="flex flex-wrap">
                  <div class="w-[300px]">Calon {{ calonPbbPendamping2.degree }}</div>
                  <div>{{ calonPbbPendamping2.fullname }}</div>
                </div>
                <div class="flex flex-wrap font-semibold">
                  <div class="w-[300px]">Tahap Pengusulan</div>
                  <div>{{ calonPbbPendamping2.tahap }}</div>
                </div>
                <div v-if="calonPbbPendamping2.tahap === 'Diskusi'" class="rounded-md mt-2 px-2 py-1 bg-white">
                  <div class="italic font-semibold">Pesan dari dosen</div>
                  <div>{{ calonPbbPendamping2.msg }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <PilihPbbPendamping :dosenList="dosenList" :mhsName="mhsData.pribadi.name"
                :mhsTahun="mhsData.pribadi.tahun_ajaran" :mhsTa="mhsData.tugas_akhir"
                :degree="'Pembimbing Pendamping Kedua'" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mt-2 text-center font-semibold text-xl text-[#334D80]">Pemilihan Pembimbing Utama</div>
        <div class="border-b p-2 mb-2">
          Kesempatan anda mengusulkan calon pembimbing utama adalah <span class="font-semibold">{{ 2 -
            jmlCalonPbbUtama }} kesempatan</span>.
        </div>

        <div v-if="jmlCalonPbbUtama.length !== 0">
          <div v-if="mhsData.usulan_ta && mhsData.usulan_ta.length !== 0">
            <div class="text-center font-semibold text-base my-2">Daftar Usulan Judul</div>
            <div class="mb-2">
              <div v-for="pbb in mhsData.usulan_ta" class="px-2 py-2"
                :class="{ 'bg-orange-100': pbb.tahap === 'Pengusulan', 'bg-blue-100': pbb.tahap === 'Diskusi' }">
                <div class="flex flex-wrap">
                  <div class="w-[250px]">Usulan Judul</div>
                  <div>{{ pbb.judul }}</div>
                </div>
                <div class="flex flex-wrap">
                  <div class="w-[250px]">Skema</div>
                  <div>{{ pbb.skema }}</div>
                </div>
                <div class="flex flex-wrap">
                  <div class="w-[250px]">KBK</div>
                  <div>{{ pbb.kbk }}</div>
                </div>
                <div class="flex flex-wrap">
                  <div class="w-[250px]">Minat Penelitian</div>
                  <div>{{ pbb.minat }}</div>
                </div>
                <div class="flex flex-wrap">
                  <div class="w-[250px]">Calon {{ pbb.degree }}</div>
                  <div>{{ pbb.dosen1_fullname }}</div>
                </div>
                <div class="flex flex-wrap font-semibold">
                  <div class="w-[250px]">Tahap Pengusulan</div>
                  <div>{{ pbb.tahap }}</div>
                </div>
                <div v-if="pbb.tahap === 'Diskusi'" class="rounded-md mt-2 px-2 py-1 bg-white">
                  <div class="italic font-semibold">Pesan dari dosen</div>
                  <div>{{ pbb.msg }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="jmlCalonPbbUtama < 2">
          <PilihPbbUtama :dosenList="dosenUtamaList" :mhsName="mhsData.pribadi.name"
            :mhsTahun="mhsData.pribadi.tahun_ajaran" :mhsSelectedTa="mhsData.usulan_ta" />
        </div>
      </div>
    </div>
  </div>
</template>