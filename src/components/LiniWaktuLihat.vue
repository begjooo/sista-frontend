<script setup>
import { baseUrl } from '@/baseUrl';
import { onMounted, ref } from 'vue';
import LiniWaktu from './LiniWaktu.vue';

const liniWaktuList = ref()
const groupedLw = ref()

onMounted(async (req, res) => {
  console.log(`onMounted LiniWaktuLihat`)

  try {
    const response = await fetch(`${baseUrl}/ta/lini-waktu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })

    liniWaktuList.value = await response.json()
    if (liniWaktuList.value) {
      groupedLw.value = Object.groupBy(liniWaktuList.value, ({ name }) => name)
    }
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <div>
    <div>
      Lini Waktu
    </div>
    <div v-if="liniWaktuList">
      <!-- {{ groupedLw }}
      {{ liniWaktuList }} -->
      <!-- <div v-for="lw in liniWaktuList">
        {{ lw }}
        {{ lw.value }}
        <LiniWaktu :awal="lw.value" :akhir="lw.value" />
      </div> -->
      <div v-for="(group, groupIndex) in groupedLw">
        <div>{{ groupIndex }}</div>
        <div v-for="lw in group">
          {{ lw.keterangan.includes('awal') }}
          <div v-if="lw.keterangan.includes('awal')">
            
          </div>
        </div>

        <!-- {{ lw.value }} -->
        <!-- <LiniWaktu :awal="lw.value" :akhir="lw.value" /> -->
      </div>
    </div>
    <div>
      <table>

      </table>
    </div>
  </div>
</template>