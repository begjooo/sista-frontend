<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';
import Profile from '@/components/dosen/layout/sidebar/Profile.vue';
import { Button } from '@/components/ui/button';
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

const username = localStorage.getItem('username')

const userData = ref()
const minatList = ref()
const inputMinat = ref('')

async function tambah(minat) {
  console.log(`tambah ${minat}`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/penelitian/minat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ minat: inputMinat.value }),
    })

    const result = await response.json()
    if (result.status) {
      console.log(`update minat success`)
      minatList.value.push(inputMinat.value)
      inputMinat.value = ''
    } else {
      console.log(`update minat failed!`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function hapus(minat, index) {
  console.log(`hapus ${minat} ${index}`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/penelitian/minat`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })

    const result = await response.json()
    if (result.status) {
      console.log(`delete minat success`)
      minatList.value.splice(index, 1)
    } else {
      console.log(`delete minat failed!`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(async () => {
  console.log(`onMounted Minat`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/penelitian`)
    userData.value = await response.json()
    minatList.value = userData.value.minat
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <Header />
  <Profile />

  <div class="body-head-side">
    <div v-if="userData" class="p-2 text-sm">
      <!-- minat -->
      <div class="text-center sm:text-left">
        <div class="font-semibold text-center sm:text-left">Minat Penelitian</div>
        <div class="flex flex-col gap-2 text-center border rounded-md p-2 my-2 sm:w-[40%]">
          <div v-for="(minat, index) in minatList">
            <div class="flex flex-wrap justify-center sm:justify-between gap-2">
              <div class="content-center">{{ minat }}</div>
              <!-- hapus minat -->
              <Button variant="" class="w-[100px]" @click="hapus(minat, index)">
                Hapus
              </Button>
            </div>
          </div>
        </div>

        <!-- tambah minat -->
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="" class="bg-green-600">
              Tambah Minat
            </Button>
          </DialogTrigger>
          <DialogContent class="min-w-[200px]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>Tambahkan minat penelitian satu per satu</DialogDescription>
            </DialogHeader>

            <input type="text" class="border rounded-md px-2 py-1 text-sm" placeholder="" v-model="inputMinat" />

            <DialogFooter>
              <DialogClose as-child>
                <Button variant="secondary" class="cursor-pointer">Cancel</Button>
              </DialogClose>
              <DialogClose as-child>
                <Button @click="tambah(inputMinat)" class="cursor-pointer" :disabled="!inputMinat">
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
</template>