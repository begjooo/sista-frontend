<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Dosen.vue';
import Profile from '@/components/sidebar/dosen/Profile.vue';
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
const minatList = ref([])
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
    if (userData.value) {
      minatList.value = userData.value.minat
    }
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
        <div class="font-semibold text-center sm:text-left mb-2">
          <div class="flex gap-2">
            <div class="content-center">
              Minat Penelitian
            </div>
            <Dialog>
              <DialogTrigger as-child>
                <svg id="icon-create" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M3 16v-2h7v2zm0-4v-2h11v2zm0-4V6h11v2zm13 12v-4h-4v-2h4v-4h2v4h4v2h-4v4z" />
                </svg>
              </DialogTrigger>
              <DialogContent class="min-w-[200px]">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>Tambahkan minat penelitian satu per satu</DialogDescription>
                </DialogHeader>

                <input type="text" class="border rounded-sm px-2 py-1 text-sm" placeholder="" v-model="inputMinat" />

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
        <div v-if="minatList && minatList.length !== 0">
          <div class="flex flex-col gap-2 text-center border rounded-sm p-2 mb-2 sm:w-[40%]">
            <div v-for="(minat, index) in minatList">
              <div class="flex flex-wrap justify-center sm:justify-between gap-2">
                <div class="content-center">{{ minat }}</div>
                <!-- hapus minat -->
                <svg id="icon-delete" @click="hapus(minat, index)" xmlns="http://www.w3.org/2000/svg" width="20"
                  height="20" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>