<script setup>
import { ref } from 'vue'

const props = defineProps(['awal', 'akhir'])

const daysLeft = ref()
const hoursLeft = ref()
const minutesLeft = ref()

function currentToDeadline(ms) {
  console.log(`<LiniWaktu /> currentToDeadline`)
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  daysLeft.value = Math.floor(ms / millisecondsInDay);
  const remainingMsAfterDays = ms % millisecondsInDay;

  hoursLeft.value = Math.floor(remainingMsAfterDays / millisecondsInHour);
  const remainingMsAfterHours = remainingMsAfterDays % millisecondsInHour;

  minutesLeft.value = Math.floor(remainingMsAfterHours / millisecondsInMinute);
}

currentToDeadline(new Date(props.akhir) - new Date())

</script>

<template>
  <div class="text-sm">
    <div class="flex flex-wrap">
      <div class="w-[100px] content-center">Mulai</div>
      <div>{{ props.awal }}, 07:00 WIB</div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-[100px] content-center">Berakhir</div>
      <div>{{ props.akhir }}, 07:00 WIB</div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-[100px] content-center">Durasi</div>
      <div class="font-semibold">{{ (new Date(props.akhir) - new Date(props.awal)) /
        (1000 * 60 * 60 * 24) + 1 }} hari</div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-[100px] content-center">Tersisa</div>
      <div class="font-semibold" :class="{ 'text-red-600': daysLeft < 3, 'text-blue-800': daysLeft >= 3 }">
        {{ daysLeft }} hari, {{ hoursLeft }} jam, {{ minutesLeft }} menit
      </div>
    </div>
  </div>
</template>