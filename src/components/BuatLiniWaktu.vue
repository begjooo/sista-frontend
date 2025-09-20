<script setup>
import { ref } from 'vue';
import IconNew from './icons/IconNew.vue';
import { Button } from './ui/button';
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDate, parseDate } from '@internationalized/date'
import { Calendar } from "@/components/ui/calendar"
import IconDate from './icons/IconDate.vue';
import { baseUrl } from '@/baseUrl';

const namaAturan = ref()
const tglAwal = ref()
const tglAkhir = ref()

async function submit() {
  try {
    const response = await fetch(`${baseUrl}/ta/lini-waktu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        nama: namaAturan.value,
        awal_ket: `${namaAturan.value.replace(/ /g, "_").toLowerCase()}_tgl_awal`,
        awal_val: new CalendarDate(tglAwal.value.year, tglAwal.value.month, tglAwal.value.day).toString(),
        akhir_ket: `${namaAturan.value.replace(/ /g, "_").toLowerCase()}_tgl_akhir`,
        akhir_val: new CalendarDate(tglAkhir.value.year, tglAkhir.value.month, tglAkhir.value.day).toString(),
      })
    })
  } catch (error) {
    console.log(error.message)
  }
}

</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <Button id="icon-create" variant="outline">
          <IconNew /> Buat Lini Waktu
        </Button>
      </DialogTrigger>
      <DialogContent class="min-w-[200px] text-sm">
        <DialogHeader>
          <DialogTitle>Buat Lini Waktu Tugas Akhir</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div class="flex flex-col gap-2">
          <div class="flex flex-wrap gap-1">
            <div class="min-w-[150px] max-w-[150px] content-center">Nama</div>
            <input class="border rounded-md flex-1 py-2 px-3" v-model="namaAturan" />
          </div>

          <div class="flex flex-wrap gap-1">
            <div class="min-w-[150px] max-w-[150px] content-center">Tanggal Awal</div>
            <div>
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline" class="w-[150px]">
                    <IconDate />{{ tglAwal }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar v-model="tglAwal" :weekday-format="'short'" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div class="flex flex-wrap gap-1">
            <div class="min-w-[150px] max-w-[150px] content-center">Tanggal Akhir</div>
            <div>
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline" class="w-[150px]">
                    <IconDate />{{ tglAkhir }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar v-model="tglAkhir" :weekday-format="'short'" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose as-child>
            <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
          </DialogClose>
          <!-- <DialogClose as-child> -->
          <Button class="cursor-pointer w-[100px]" @click="submit">Submit</Button>
          <!-- </DialogClose> -->
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>