<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { baseUrl } from '@/baseUrl'

const router = useRouter()
const username = localStorage.getItem('username')

const props = defineProps(['dosenList', 'mhsName', 'mhsTahun', 'mhsTa', 'degree'])
const availableDosen = props.dosenList
  .filter((item) => item.username !== props.mhsTa.dosen1_username && item.username !== props.mhsTa.dosen2_username)
  .sort((a, b) => {
    let fa = a.fullname.toLowerCase(), fb = b.fullname.toLowerCase();
    if (fa < fb) return -1
    if (fa > fb) return 1
    return 0
  })

const selectedDosen = ref()

async function submit(dosen) {
  console.log(`submit`)
  let usulanPdp = {
    ta_id: props.mhsTa.id,
    username: dosen.username,
    fullname: dosen.fullname,
    degree: props.degree,
    tahap: 'Pengusulan',
    msg: '',
  }

  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/tugas-akhir/usulan-pdp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(usulanPdp),
    })

    const result = await response.json()
    if (result) {
      window.location.reload()
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
        <Button variant="" class="bg-green-600 cursor-pointer mx-2">
          Usulkan {{ props.degree }}
        </Button>
      </DialogTrigger>

      <DialogContent class="min-w-[200px] text-sm">
        <DialogHeader>
          <DialogTitle>Pilih {{ props.degree }}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div class="max-h-[300px] overflow-y-auto flex flex-col gap-2">
          <div v-for="(dosen, dosenIndex) in availableDosen">
            <div v-if="dosen.fullname" class="text-center rounded-sm py-1 px-2 cursor-pointer hover:bg-gray-200"
              @click="selectedDosen = dosen">
              <div class="font-semibold underline">{{ dosen.fullname }}</div>
              <div class="mt-1">
                <Badge class="bg-blue-800">KBK {{ dosen.kbk }}</Badge>
              </div>
              <div class="flex flex-wrap gap-2 justify-center my-1">
                <span v-for="minat in dosen.minat">
                  <Badge class="bg-orange-600">{{ minat }}</Badge>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedDosen">
          <div class="text-center border-t border-blue-800 pt-2">
            Anda memilih
            <span class="font-semibold">
              {{ selectedDosen.fullname }}
            </span>
            sebagai Dosen {{ props.degree }}
          </div>
        </div>

        <DialogFooter>
          <DialogClose as-child>
            <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
          </DialogClose>
          <AlertDialog>
            <AlertDialogTrigger :disabled="!selectedDosen">
              <Button variant="" class="cursor-pointer w-[100px]"
                :class="{ 'bg-gray-400 hover:bg-gray-400': !selectedDosen }">
                Submit
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent class="w-[400px]">
              <AlertDialogHeader>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogDescription>
                  Anda Yakin memilih <span class="font-bold">{{ selectedDosen.fullname }}</span> sebagai Dosen
                  {{ props.degree }}?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel class="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction @click="submit(selectedDosen)" class="cursor-pointer">
                  Saya sangat yakin!
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>