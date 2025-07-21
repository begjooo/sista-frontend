<script setup>
import { ref } from 'vue'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import Button from './ui/button/Button.vue';

const props = defineProps(['dosenList'])
const kbkList = ['Nirkabel', 'Infrastruktur Jaringan', 'Layanan dan Aplikasi']
const selectedKbk = ref('')
const dosenPerKbk = ref()
const selectedDosen = ref()

function handleKbk(kbk) {
  console.log(kbk)
  dosenPerKbk.value = props.dosenList.filter((item) => item.kbk === kbk)
  selectedDosen.value = null
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

    <div class="flex flex-wrap border w-full min-h-[60vh] max-h-[60vh] overflow">
      <div class="min-h-[60vh] max-h-[60vh] min-w-[40vh] max-w-[40vh] border">
        <div v-for="dosen in dosenPerKbk" class="border">
          <div @click="selectedDosen = dosen">{{ dosen.fullname }}</div>
        </div>
      </div>

      <div class="border">
        <div>
          {{ selectedDosen }}
        </div>
      </div>

    </div>
    <div v-for="dosen in dosenPerKbk" class="border m-2">
      <div>{{ dosen.fullname }}</div>
      <div v-for="minat in dosen.minat">
        {{ minat }}
      </div>
      <div class="flex flex-wrap gap-2">
        <div class="border">minat 1</div>
        <div class="border">minat 2</div>
        <div class="border">minat 3</div>
        <div class="border">minat 4</div>
      </div>
    </div>
  </div>
</template>