<script setup>
import { ref } from 'vue';
import { Label } from '@/components/ui/label'
import Button from '@/components/ui/button/Button.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
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
import { baseUrl } from '@/baseUrl';

const username = localStorage.getItem('username')
const props = defineProps(['currentData'])

const inputMinat = ref('')
const inputJudul = ref('')
const inputDeskripsi = ref('')

async function submit() {
  console.log(`update minat`)
  const data = {
    kbk: props.currentData.kbk,
    minat: inputMinat.value,
    judul: inputJudul.value,
    deskripsi: inputDeskripsi.value,
    mhs_pengusul: [],
    mhs_diskusi: [],
  }
  console.log(data)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (result.status) {
      console.log(`update data success`)
      window.location.reload()
    } else {
      console.log(`update data failed!`)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="">
        Buat Usulan
      </Button>
    </DialogTrigger>
    <DialogContent class="min-w-[300px]">
      <DialogHeader>
        <DialogTitle>Usulan Tugas Akhir</DialogTitle>
        <DialogDescription>Usulkan tugas akhir untuk mahasiswa</DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-2 text-sm">
        <div class="flex flex-wrap justify-between">
          <Label for="minat" class="min-w-[20vh] max-w-[20vh]">Minat</Label>
          <Select id="minat" v-model="inputMinat">
            <SelectTrigger class="min-w-[200px] w-[300px]">
              <SelectValue placeholder="Minat Penelitian" />
            </SelectTrigger>
            <SelectContent>
              <div v-for="minat in props.currentData.minat">
                <SelectItem :value="minat">{{ minat }}</SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>
        <div class="flex flex-wrap justify-between">
          <div>Judul</div>
          <input class="border rounded-md min-w-[200px] w-[300px] px-2 py-1" v-model="inputJudul" />
        </div>
        <div class="flex flex-wrap justify-between">
          <div>Deskripsi</div>
          <textarea :rows="4" class="border rounded-md min-h-[100px] max-h-[200px] min-w-[200px] w-[300px] px-2 py-1" v-model="inputDeskripsi" />
        </div>
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
        </DialogClose>
        <Button class="cursor-pointer w-[100px]" @click="submit">Submit</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>