<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/layout/mhs/Header.vue';
import AjuanMandiri from '../../components/mhs/AjuanMandiri.vue';
import AjuanDosen from '../../components/mhs/AjuanDosen.vue';
import Select from '@/components/ui/select/Select.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectLabel from '@/components/ui/select/SelectLabel.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';

const username = localStorage.getItem('username')
const kbkList = ['nirkabel', 'jaringan', 'aplikasi']
const kbkPilihan = ref('')

const statusSemproEnum = {
  0: 'Belum Mengajukan',
  1: 'Pengajuan Judul',
  2: 'Pengajuan Pembimbing',
  3: 'Sudah Mengajukan',
}

const jenisAjuan = ref()
</script>

<template>
  <Header />

  <div class="flex flex-wrap">
    <div class="content-center w-[20vh]">KBK</div>
    <Select v-model="kbkPilihan">
      <SelectTrigger class="w-[300px]">
        <SelectValue placeholder="Pilih KBK" />
      </SelectTrigger>

      <SelectContent class="max-h-[300px]">
        <SelectLabel>KBK</SelectLabel>
        <SelectItem :value="kbkList[0]">Nirkabel</SelectItem>
        <SelectItem :value="kbkList[1]">Infrastruktur Jaringan</SelectItem>
        <SelectItem :value="kbkList[2]">Aplikasi</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div class="flex flex-wrap">
    <div class="content-center w-[20vh]">Jenis Ajuan</div>
    <Select v-model="jenisAjuan" :disabled="kbkPilihan === ''">
      <SelectTrigger class="w-[300px]">
        <SelectValue placeholder="Pilih Pengajuan TA" />
      </SelectTrigger>

      <SelectContent class="max-h-[300px]">
        <SelectItem value="mandiri">Pengajuan Mandiri</SelectItem>
        <SelectItem value="dosen">Tawaran Dosen</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div v-if="jenisAjuan === 'mandiri'">
    <AjuanMandiri :kbk="kbkPilihan" />
  </div>
  <div v-else-if="jenisAjuan === 'dosen'">
    <AjuanDosen />
  </div>
</template>