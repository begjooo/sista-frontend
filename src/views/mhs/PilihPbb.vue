<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/baseUrl';

import Header from '../../components/layout/mhs/Header.vue';
import Button from '@/components/ui/button/Button.vue';

const dosenList = ref([])
const dosenListPendamping = ref([])
const dosenPilihan = ref({})
const statusDone = ref(true)

function pilihDosen1(data) {
  dosenPilihan.value.dosen1 = data
  dosenListPendamping.value = dosenList.value.filter((item) => {
    return item.nip !== data.nip
  })
}

function pilihDosen2(data) {
  dosenPilihan.value.dosen2 = data
}

async function submitDosenPbb() {
  if (dosenPilihan.value.dosen1) {
    statusDone.value = false

    try {
      const response = await fetch(`${baseUrl}/mhs/dosen-pbb`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dosenPilihan.value),
      })

      statusDone.value = await response.json()
    } catch (error) {
      console.error(error)
      statusDone.value = true
    }
  } else {
    console.log(`dosen utama masih kosong`)
  }
}

function removeDosen(index) {
  delete dosenPilihan.value[index]
}

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/mhs/dosen-list`)
    dosenList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />

  <div class="text-center">
    <div class="">
      Pembimbing Utama
      <div v-if="dosenPilihan.dosen1">
        {{ dosenPilihan.dosen1.nama }}
      </div>
    </div>

    <div class="my-2 overflow-auto">
      <div class="h-[30vh] flex flex-wrap gap-3 justify-center">
        <div v-for="dosen in dosenList">
          <div class="border w-[40vh] hover:bg-blue-100 cursor-pointer" @click="pilihDosen1(dosen)">
            <ul>
              <li>{{ dosen.nama }}</li>
              <li>{{ dosen.nip }}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div v-if="dosenPilihan.dosen1" class="text-center">
    <div class="">
      Pembimbing Pendamping
      <div v-if="dosenPilihan.dosen2">
        {{ dosenPilihan.dosen2.nama }}
      </div>
    </div>

    <div class="my-2 overflow-auto">
      <div class="h-[30vh] flex flex-wrap gap-3 justify-center">
        <div v-for="dosen in dosenListPendamping">
          <div class="border w-[40vh] hover:bg-blue-100 cursor-pointer" @click="pilihDosen2(dosen)">
            <ul>
              <li>{{ dosen.nama }}</li>
              <li>{{ dosen.nip }}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div>
    <div class="flex flex-wrap">
      <div class="w-[30vh]">
        Pembimbing Utama
      </div>
      <div v-if="dosenPilihan.dosen1">
        <div>
          {{ dosenPilihan.dosen1.nama }}
        </div>
      </div>
    </div>

    <div v-if="dosenPilihan.dosen2" class="flex flex-wrap">
      <div class="w-[30vh]">
        Pembimbing Pendamping
      </div>
      <div>
        {{ dosenPilihan.dosen2.nama }}
        <Button variant="destructive" class="mx-2" @click="removeDosen('dosen2')">Delete</Button>
      </div>
    </div>

    <Button @click="submitDosenPbb" :disabled="!statusDone">Submit</Button>
  </div>
</template>

<style scoped></style>
