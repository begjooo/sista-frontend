<script setup>
import { ref, onMounted } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/header/Mhs.vue';
import Profile from '@/components/sidebar/mhs/Profile.vue';
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
        <div class="font-semibold text-center sm:text-left mb-2">
          <div class="flex gap-2">
            <div class="content-center">
              Curriculum Vitae
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
                  <DialogDescription>Tambahkan CV satu per satu</DialogDescription>
                </DialogHeader>

                <input type="text" class="border rounded-sm px-2 py-1 text-sm" placeholder="" v-model="inputCv" />

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
        <div v-if="cvList.length !== 0">
          <div class="flex flex-col gap-2 text-center border rounded-sm p-2 mb-2 sm:w-[40%]">
            <div v-for="(cv, index) in cvList">
              <div class="flex flex-wrap justify-center sm:justify-between gap-2">
                <div class="content-center">{{ cv }}</div>
                <!-- hapus cv -->
                <svg id="icon-delete" @click="hapus(cv, index)" xmlns="http://www.w3.org/2000/svg" width="20"
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