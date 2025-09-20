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
import IconUserSearch from '../icons/IconUserSearch.vue';

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
    const response = await fetch(`${baseUrl}/dosen/${props.username}/data-full`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
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
        <IconUserSearch id="icon-read" @click="lihat" :width="w" :height="h" />
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