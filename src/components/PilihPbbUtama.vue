<script setup>
import { ref } from 'vue'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import Button from './ui/button/Button.vue';

const props = defineProps(['dosenList'])
const kbkList = ['Nirkabel', 'Infrastruktur Jaringan', 'Layanan dan Aplikasi']
const selectedKbk = ref('')
const dosenPerKbk = ref()
const selectedDosen = ref()
const selectedMinat = ref('')
const minatDummy = ['Minat A', 'Minat B', 'Minat C', 'Minat D', 'Minat E', 'Minat F', 'Minat G']

function handleKbk(kbk) {
  console.log(kbk)
  dosenPerKbk.value = props.dosenList.filter((item) => item.kbk === kbk)
  // selectedDosen.value = null
}
</script>

<template>
  <div>PilihPbbUtama Component</div>

  <div class="text-sm">
    <div>Pilih KBK</div>
    <div class="flex flex-wrap gap-2 justify-center mx-2 content-center">
      <div v-for="kbk in kbkList" class="">
        <Button @click="handleKbk(kbk)" class="w-[200px]">{{ kbk }}</Button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-2 border min-h-[60vh] max-h-[60vh] overflow-auto">
      <div class="border min-w-[40vh] flex flex-col gap-2">
        <div v-for="dosen in dosenPerKbk" class="border">
          <div @click="selectedDosen = dosen">{{ dosen.fullname }}</div>
        </div>
      </div>

      <div class="border col-span-3">
        <div class="flex flex-wrap justify-center">
          <div class="border rounded-md font-bold m-2 px-4 py-1 cursor-pointer select-none hover:bg-blue-800 hover:text-white" v-for="minat in minatDummy">
            <div @click="selectedMinat = minat">{{ minat }}</div>
          </div>
        </div>
        <div>
          {{ selectedDosen }}
        </div>
      </div>
    </div>
  </div>
</template>