<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import Header from '@/components/mhs/layout/Header.vue';
import PilihPbbUtama from '@/components/mhs/tugas-akhir/PilihPbbUtama.vue';
import TugasAkhir from '@/components/mhs/layout/sidebar/TugasAkhir.vue';

const username = localStorage.getItem('username')
const mhsData = ref()
const jenisPbb = ref('')
const jmlCalonPbbUtama = ref(0)
const jmlCalonPbbPendamping = ref(0)
const dosenList = ref()

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/tugas-akhir/usulan/data`)
    mhsData.value = await response.json()
    console.log(mhsData.value)
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
    // console.log(dosenList.value)
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
      <div v-if="jmlCalonPbbUtama.length !== 0">
        <div v-for="pbb in mhsData.usulan_ta" class="border p-2">
          <div>Judul {{ pbb.judul }}</div>
          <div>KBK {{ pbb.kbk }} dengan minat {{ pbb.minat }}.</div>
          <div>{{ pbb.dosen_fullname }} sebagai Calon {{ pbb.degree }}.</div>
          <div>Status {{ pbb.tahap }}</div>
        </div>
      </div>
      <div>
        Kesempatan anda mengusulkan calon pembimbing utama adalah {{ 2 - jmlCalonPbbUtama }} kesempatan.
      </div>
      <div>
        Kesempatan anda mengusulkan calon pembimbing pendamping adalah {{ 1 - jmlCalonPbbPendamping }} kesempatan.
      </div>

      <div class="border p-2 flex flex-wrap gap-2 justify-center md:justify-start">
        <Label for="jenisPbb" class="min-w-[30vh] max-w-[30vh] justify-center md:justify-start">
          Pilih Jenis Calon Pembimbing
        </Label>
        <Select id="jenisPbb" v-model="jenisPbb">
          <SelectTrigger class="min-w-[20vh]">
            <SelectValue placeholder="Jenis Pembimbing" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Pembimbing Utama">Pembimbing Utama</SelectItem>
            <SelectItem value="Pembimbing Pendamping">Pembimbing Pendamping</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div v-if="jenisPbb && jenisPbb === 'Pembimbing Utama'">
        <div v-if="jmlCalonPbbUtama < 2">
          <!-- <div>
          {{ mhsData }}
        </div>
        <div>
          {{ dosenList }}
        </div> -->

          <PilihPbbUtama :dosenList="dosenList" :dosenDegree="jenisPbb" :mhsName="mhsData.pribadi.name" />
        </div>
        <div v-else>
          Kesempatan anda sudah habis
        </div>
      </div>
      <div v-else-if="jenisPbb && jenisPbb === 'Pembimbing Pendamping'">
        <div v-if="jmlCalonPbbPendamping < 1">
          Pilih pbb pendamping
        </div>
        <div v-else>
          Kesempatan pbb pendamping habis!
        </div>
      </div>
    </div>
  </div>
</template>