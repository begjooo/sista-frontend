<script setup>
import { onMounted, ref } from 'vue';
import Header from '@/components/header/Admin.vue';
import Sidebar from '@/components/sidebar/admin/TugasAkhir.vue';
import { baseUrl } from '@/baseUrl';
import { CalendarDate, parseDate } from '@internationalized/date'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
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
import LiniWaktuComponent from '@/components/LiniWaktu.vue';

const aturan = ref();

const jmlPenguji = ref()
const usulanTglAwal = ref()
const usulanTglAkhir = ref()
const pelaksanaanTglAwal = ref()
const pelaksanaanTglAkhir = ref()

async function submitChange() {
  console.log(`submitChange()`)
  aturan.value = {
    jmlPenguji: jmlPenguji.value,
    usulan: {
      awal: new CalendarDate(usulanTglAwal.value.year, usulanTglAwal.value.month, usulanTglAwal.value.day).toString(),
      akhir: new CalendarDate(usulanTglAkhir.value.year, usulanTglAkhir.value.month, usulanTglAkhir.value.day).toString(),
    },
    pelaksanaan: {
      awal: new CalendarDate(pelaksanaanTglAwal.value.year, pelaksanaanTglAwal.value.month, pelaksanaanTglAwal.value.day).toString(),
      akhir: new CalendarDate(pelaksanaanTglAkhir.value.year, pelaksanaanTglAkhir.value.month, pelaksanaanTglAkhir.value.day).toString(),
    },
  }

  try {
    const response = await fetch(`${baseUrl}/ta/aturan`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(aturan.value),
    })

    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  console.log(`onMounted Daftar`)
  try {
    const response = await fetch(`${baseUrl}/ta/aturan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
    aturan.value = await response.json()
    if (aturan.value) {
      jmlPenguji.value = aturan.value.jmlPenguji
      usulanTglAwal.value = parseDate(aturan.value.usulan.awal)
      usulanTglAkhir.value = parseDate(aturan.value.usulan.akhir)
      pelaksanaanTglAwal.value = parseDate(aturan.value.pelaksanaan.awal)
      pelaksanaanTglAkhir.value = parseDate(aturan.value.pelaksanaan.akhir)
    }
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <Sidebar />

  <div class="body-head-side text-sm">
    <div v-if="aturan">
      <div class="border m-2 py-1 px-2 rounded-sm">
        <Dialog>
          <DialogTrigger as-child>
            <div
              class="py-2 cursor-pointer text-orange-600 hover:text-blue-600 hover:font-semibold flex gap-2 underline w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" />
              </svg>
              <div class="content-center ">Ubah Peraturan</div>
            </div>
          </DialogTrigger>
          <DialogContent class="min-w-[200px] text-sm">
            <DialogHeader>
              <DialogTitle>Ubah Aturan</DialogTitle>
              <DialogDescription>
                Perubahan Aturan akan berdampak pada alur sistem
              </DialogDescription>
            </DialogHeader>

            <div>
              <div class="flex flex-wrap gap-1">
                <label for="jml-penguji" class="min-w-[150px] max-w-[150px] content-center">Jumlah Penguji</label>
                <Select id="jml-penguji" v-model="jmlPenguji">
                  <SelectTrigger class="w-full min-w-[150px] max-w-[150px] flex-1">
                    <SelectValue placeholder="Jab. Funsional" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="pt-4 pb-2 font-semibold text-base">Tanggal Usulan Pembimbing</div>
              <div class="flex flex-wrap gap-1 pb-2">
                <div class="min-w-[150px] max-w-[150px] content-center">Awal</div>
                <div>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline" class="w-[150px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                          <path fill="currentColor"
                            d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                        </svg>
                        {{ usulanTglAwal }}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar v-model="usulanTglAwal" :weekday-format="'short'" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div class="flex flex-wrap gap-1">
                <div class="min-w-[150px] max-w-[150px] content-center">Akhir</div>
                <div>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline" class="w-[150px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                          <path fill="currentColor"
                            d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                        </svg>
                        {{ usulanTglAkhir }}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar v-model="usulanTglAkhir" :weekday-format="'short'" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div class="pt-4 pb-2 font-semibold text-base">Tanggal Pelaksanaan Tugas Akhir</div>
              <div class="flex flex-wrap gap-1 pb-2">
                <div class="min-w-[150px] max-w-[150px] content-center">Awal</div>
                <div>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline" class="w-[150px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                          <path fill="currentColor"
                            d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                        </svg>
                        {{ pelaksanaanTglAwal }}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar v-model="pelaksanaanTglAwal" :weekday-format="'short'" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div class="flex flex-wrap gap-1">
                <div class="min-w-[150px] max-w-[150px] content-center">Akhir</div>
                <div>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline" class="w-[150px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                          <path fill="currentColor"
                            d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                        </svg>
                        {{ pelaksanaanTglAkhir }}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar v-model="pelaksanaanTglAkhir" :weekday-format="'short'" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose as-child>
                <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
              </DialogClose>
              <DialogClose as-child>
                <Button class="cursor-pointer w-[100px]" @click="submitChange">Submit</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div class="pb-2">
          Jumlah Penguji {{ aturan.jmlPenguji }}
        </div>

        <div class="pb-2">
          <div class="font-semibold">
            Lini Waktu Pengusulan Pembimbing
          </div>
          <LiniWaktuComponent :awal="aturan.usulan.awal" :akhir="aturan.usulan.akhir" />
        </div>

        <div class="">
          <div class="font-semibold">
            Lini Waktu Pelaksanaan Tugas Akhir
          </div>
          <LiniWaktuComponent :awal="aturan.pelaksanaan.awal" :akhir="aturan.pelaksanaan.akhir" />
        </div>
      </div>
    </div>
  </div>
</template>