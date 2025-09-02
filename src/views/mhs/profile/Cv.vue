<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/mhs/layout/Header.vue';
import Profile from '@/components/mhs/layout/sidebar/Profile.vue';
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

const cvList = ref([])
const inputCv = ref('')

async function tambah(cv) {
  console.log(`tambah ${cv}`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/cv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cv: inputCv.value }),
    })

    const result = await response.json()
    if (result.status) {
      console.log(`update cv success`)
      cvList.value.push(inputCv.value)
      inputCv.value = ''
    } else {
      console.log(`update cv failed!`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function hapus(cv, index) {
  console.log(`hapus ${cv} ${index}`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/cv`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })

    const result = await response.json()
    if (result.status) {
      console.log(`delete cv success`)
      cvList.value.splice(index, 1)
    } else {
      console.log(`delete cv failed!`)
    }
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(async () => {
  console.log(`onMounted Cv`)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/cv`)
    const result = await response.json()
    if (result) {
      cvList.value = result
    }
  } catch (error) {
    console.log(error.message)
  }
})

</script>

<template>
  <Header />
  <Profile />

  <div class="body-head-side text-sm">
    <div v-if="cvList" class="p-2">
      <!-- cv -->
      <div class="text-center sm:text-left">
        <div class="font-semibold text-center sm:text-left mb-2">Curriculum Vitae</div>
        <div v-if="cvList.length !== 0">
          <div class="flex flex-col gap-2 text-center border rounded-md p-2 mb-2 sm:w-[40%]">
            <div v-for="(cv, index) in cvList">
              <div class="flex flex-wrap justify-center sm:justify-between gap-2">
                <div class="content-center">{{ cv }}</div>
                <!-- hapus cv -->
                <Button variant="" class="w-[100px]" @click="hapus(cv, index)">
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- tambah cv -->
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="" class="bg-green-600">
              Tambah Informasi
            </Button>
          </DialogTrigger>
          <DialogContent class="min-w-[200px]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>Tambahkan CV satu per satu</DialogDescription>
            </DialogHeader>

            <input type="text" class="border rounded-md px-2 py-1 text-sm" placeholder="" v-model="inputCv" />

            <DialogFooter>
              <DialogClose as-child>
                <Button variant="secondary" class="cursor-pointer">Cancel</Button>
              </DialogClose>
              <DialogClose as-child>
                <Button @click="tambah(inputCv)" class="cursor-pointer" :disabled="!inputCv">
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