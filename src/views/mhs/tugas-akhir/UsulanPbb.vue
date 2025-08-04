<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import Header from '@/components/mhs/layout/Header.vue';
import TugasAkhir from '@/components/mhs/layout/sidebar/TugasAkhir.vue';
import PilihPbbUtama from '@/components/mhs/tugas-akhir/PilihPbbUtama.vue';

const username = localStorage.getItem('username')
const mhsData = ref()
const jenisPbb = ref('')
const jmlCalonPbbUtama = ref(0)
const jmlCalonPbbPendamping1 = ref(0)
const jmlCalonPbbPendamping2 = ref(0)
const dosenList = ref()

onMounted(async () => {
  console.log(`onMounted UsulanPbb`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/tugas-akhir/usulan`)
    mhsData.value = await response.json()
    // console.log(mhsData.value)
    if (mhsData.value.usulan_ta) {
      jmlCalonPbbUtama.value = mhsData.value.usulan_ta.length
      console.log(`sudah memiliki pbb utama`)
    }
  } catch (error) {
    console.log(error)
  }

  try {
    const response = await fetch(`${baseUrl}/dosen/list`)
    dosenList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side text-sm">
    <div v-if="mhsData && dosenList">
      <div v-if="mhsData.tugas_akhir">
        <div class="px-2 py-1">
          <div class="text-xl">Sudah memiliki Pembimbing</div>
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
        </div>
      </div>
      <div v-else>
        <div class="border-b p-2 mb-2">
          <div>
            Kesempatan anda mengusulkan calon pembimbing utama adalah <span class="font-semibold">{{ 2 -
              jmlCalonPbbUtama }} kesempatan</span>.
          </div>
          <div>
            Kesempatan anda mengusulkan calon pembimbing pendamping pertama adalah <span class="font-semibold">{{ 1 -
              jmlCalonPbbPendamping1 }} kesempatan</span>.
          </div>
          <div>
            Kesempatan anda mengusulkan calon pembimbing pendamping kedua adalah <span class="font-semibold">{{ 1 -
              jmlCalonPbbPendamping2 }} kesempatan</span>.
          </div>
        </div>

        <div v-if="jmlCalonPbbUtama.length !== 0">
          <div v-if="mhsData.usulan_ta && mhsData.usulan_ta.length !== 0">
            <div class="text-center font-semibold text-base my-2">Daftar Usulan Judul</div>
            <div class="mb-2">
              <div v-for="pbb in mhsData.usulan_ta" class="px-2 py-2"
                :class="{ 'bg-orange-100': pbb.tahap === 'Pengusulan', 'bg-blue-100': pbb.tahap === 'Diskusi' }">
                <div class="flex flex-wrap">
                  <div class="w-[250px]">Usulan Judul Tugas Akhir</div>
                  <div>{{ pbb.judul }}</div>
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

        <div class="px-2 flex flex-wrap gap-2 justify-center md:justify-start">
          <Label for="jenisPbb" class="min-w-[30vh] max-w-[30vh] justify-center md:justify-start">
            Pilih Jenis Calon Pembimbing
          </Label>
          <Select id="jenisPbb" v-model="jenisPbb">
            <SelectTrigger class="min-w-[20vh]">
              <SelectValue placeholder="Jenis Pembimbing" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Pembimbing Utama">Pembimbing Utama</SelectItem>
              <SelectItem value="Pembimbing Pendamping 1">Pembimbing Pendamping 1</SelectItem>
              <SelectItem value="Pembimbing Pendamping 2">Pembimbing Pendamping 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div v-if="jenisPbb && jenisPbb === 'Pembimbing Utama'">
          <div v-if="jmlCalonPbbUtama < 2">
            <PilihPbbUtama :dosenList="dosenList" :dosenDegree="jenisPbb" :mhsName="mhsData.pribadi.name"
              :mhsTahun="mhsData.pribadi.tahun_ajaran" />
          </div>
          <div v-else>
            Kesempatan anda sudah habis
          </div>
        </div>
        <div v-else-if="jenisPbb && jenisPbb === 'Pembimbing Pendamping 1'">
          <div v-if="jmlCalonPbbPendamping1 < 1">
            Pilih pbb pendamping 1
          </div>
          <div v-else>
            Kesempatan pbb pendamping 1 habis!
          </div>
        </div>
        <div v-else-if="jenisPbb && jenisPbb === 'Pembimbing Pendamping 2'">
          <div v-if="jmlCalonPbbPendamping2 < 1">
            Pilih pbb pendamping 2
          </div>
          <div v-else>
            Kesempatan pbb pendamping 2 habis!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>