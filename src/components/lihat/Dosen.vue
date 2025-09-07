<script setup>
import { ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const props = defineProps(['username', 'w', 'h'])

const w = ref()
const h = ref()

if (props.w) {
  w.value = props.w
} else {
  w.value = '32'
}

if (props.h) {
  h.value = props.h
} else {
  h.value = '32'
}

const dataPribadi = ref();

async function lihat() {
  console.log(`lihat`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${props.username}/data-full`)
    const data = await response.json()

    if (!data) {
      dataPribadi.value = null
    } else {
      dataPribadi.value = data
    }
  } catch (error) {
    console.log(error.message)
  }
}
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <svg id="icon-read" @click="lihat" xmlns="http://www.w3.org/2000/svg" :width="w" :height="h"
          viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M11 12q-1.65 0-2.825-1.175T7 8t1.175-2.825T11 4t2.825 1.175T15 8t-1.175 2.825T11 12m11.1 11.5l-3.2-3.2q-.525.3-1.125.5T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2zM16.5 19q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19m-5.475-6q-1.05 1.55-1.05 3.5t1.05 3.5H3v-2.775q0-.85.425-1.575t1.175-1.1q1.275-.65 2.875-1.1t3.55-.45" />
        </svg>
      </DialogTrigger>
      <DialogContent class="min-w-[300px]">
        <DialogHeader>
          <DialogTitle>
            <div v-if="dataPribadi">
              {{ dataPribadi.fullname }}
            </div>
          </DialogTitle>
          <DialogDescription>
            <div v-if="dataPribadi">
              {{ dataPribadi.username }} - {{ dataPribadi.nip }}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div v-if="dataPribadi">
          <div class="max-h-[300px] overflow-y-auto text-sm">
            <div class="flex flex-wrap">
              <div class="min-w-[100px]">
                KBK
              </div>
              <div class="w-full flex-1">
                {{ dataPribadi.kbk }}
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="min-w-[100px]">
                Minat
              </div>
              <div class="flex-1">
                <div v-if="dataPribadi.minat.length === 0">
                  -
                </div>
                <div v-else>
                  <span v-for="(minat, minatIndex) in dataPribadi.minat">
                    {{ minat }}<span v-if="(minatIndex + 1) < dataPribadi.minat.length">, </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>