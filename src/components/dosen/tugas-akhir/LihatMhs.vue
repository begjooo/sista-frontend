<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Button from '@/components/ui/button/Button.vue';
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
const props = defineProps(['mhsList', 'taId'])
const mhsDataPribadi = ref()
const mhsPortofolio = ref()
const inputMsg = ref('')

async function lihatMhs(mhsUsername) {
  console.log(mhsUsername)
  try {
    const response = await fetch(`${baseUrl}/mhs/${mhsUsername}/data`)
    const data = await response.json()
    console.log(data)
    if (!data) {
      mhsDataPribadi.value = null
      mhsPortofolio.value = null
    } else {
      mhsDataPribadi.value = data.pribadi
      mhsPortofolio.value = data.portofolio
    }
  } catch (error) {
    console.log(error)
  }
}

async function diskusiUsulan(taId, mhsUsername, mhsName, degree) {
  console.log(taId, mhsUsername, mhsName)
  if (inputMsg.value) {
    try {
      const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/diskusi`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taId, dosenUsername: username, mhsUsername, mhsName, degree: degree, message: inputMsg.value })
      })
      inputMsg.value = ''
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<template>
  <span v-for="(mhs, index) in props.mhsList">
    <Dialog>
      <DialogTrigger as-child>
        <span class="font-semibold cursor-pointer hover:underline" @click="lihatMhs(mhs.username)">
          {{ mhs.name }}
        </span>
      </DialogTrigger>
      <DialogContent class="min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Data Mahasiswa</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div v-if="mhsDataPribadi">
          <div class="border rounded-md text-sm max-h-[400px] overflow-y-auto px-2 py-1">
            <div class="">
              <div class="flex flex-col font-semibold text-center">
                <div>{{ mhsDataPribadi.name }} [{{ mhsDataPribadi.username }}]</div>
                <div>{{ mhsDataPribadi.kelas }} | {{ mhsDataPribadi.prodi }} | {{ mhsDataPribadi.tahun_ajaran }}</div>
              </div>

              <div class="mt-2">
                <div class="font-semibold">Portofolio</div>
                <div v-if="mhsPortofolio">
                  <div v-for="portofolio in mhsPortofolio">
                    <div>{{ portofolio }}</div>
                  </div>
                </div>
                <div v-else>
                  Tidak ada data
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-red-600 font-semibold">
          Data {{ mhs.name }} NIM {{ mhs.username }} tidak ditemukan!
        </div>

        <DialogFooter>
          <DialogClose as-child>
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="" class="cursor-pointer">
                  Jadwalkan Diskusi
                </Button>
              </DialogTrigger>
              <DialogContent class="min-w-[200px]">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>Kirim pesan kepada mahasiswa untuk waktu dan tempat diskusi</DialogDescription>
                </DialogHeader>

                <textarea type="text" class="border rounded-md px-2 py-1 text-sm max-h-[200px] min-h-[50px]"
                  placeholder="Saya tunggu hari Senin dd-mm-yyyy pukul hh:mm WIB di ..." v-model="inputMsg" />

                <DialogFooter>
                  <DialogClose as-child>
                    <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                  </DialogClose>
                  <Button class="cursor-pointer w-[100px]"
                    @click="diskusiUsulan(props.taId, mhs.username, mhs.name, mhs.degree)">Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogClose>
          <DialogClose as-child>
            <Button variant="destructive" class="cursor-pointer w-[100px]">Tolak</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <span v-if="props.mhsList.length > 1 && (index + 1) !== props.mhsList.length">, </span>
  </span>
</template>