<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import Header from '@/components/dosen/layout/Header.vue';
import TugasAkhir from '@/components/dosen/layout/sidebar/TugasAkhir.vue';
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
const usulanTaList = ref([])
const mhsDataPribadi = ref()
const mhsPortofolio = ref()
const inputMsg = ref('')

async function lihatMhs(username) {
  console.log(username)
  try {
    const response = await fetch(`${baseUrl}/mhs/${username}/data`)
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

async function diskusiUsulan(taId, mhsUsername, mhsName) {
  console.log(mhsUsername, mhsName)
  if (inputMsg.value) {
    try {
      const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/diskusi`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taId, dosenUsername: username, mhsUsername, mhsName, message: inputMsg.value })
      })
      inputMsg.value = ''
    } catch (error) {
      console.log(error)
    }
  }
}

async function terimaUsulan(taId, mhsUsername) {
  console.log(mhsUsername)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/terima`, {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taId, username: username, mhsUsername })
    })
  } catch (error) {
    console.log(error)
  }
}

async function tolakUsulan(taId, mhsUsername) {
  console.log(mhsUsername)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan/tolak`, {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taId, username: username, mhsUsername })
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  console.log(`UsulanMhs`)
  try {
    const response = await fetch(`${baseUrl}/dosen/${username}/tugas-akhir/usulan-mhs/list`)
    usulanTaList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <TugasAkhir />

  <div class="body-head-side text-sm">
    <div v-if="usulanTaList">
      <div v-for="usulan in usulanTaList" class="rounded-md bg-blue-50 m-2 px-2 py-2 ">
        <div class="flex flex-col">
          <div class="border-b mb-1 pb-1">
            <span v-if="usulan.tahap === 'Pengusulan'">
              <span class="font-semibold">Permintaan</span>
              dari {{ usulan.name }}
            </span>
            <span v-if="usulan.tahap === 'Diskusi'">
              <span class="font-semibold">Diskusi</span>
              dengan {{ usulan.name }}
            </span>
            sebagai <span class="font-semibold">{{ usulan.degree }}</span>
            <div v-if="usulan.tahap === 'Diskusi'" class="border rounded-md mt-1 px-2 py-1">
              <div>Pesan anda kepada {{ usulan.name }}</div>
              <div class="italic">{{ usulan.msg }}</div>
            </div>
          </div>


          <div class="flex flex-wrap border-b mb-1 pb-1">
            <div class="min-w-[150px]">KBK</div>
            <div class="font-semibold">{{ usulan.kbk }}</div>
          </div>
          <div class="flex flex-wrap border-b mb-1 pb-1">
            <div class="min-w-[150px]">Bidang Peminatan</div>
            <div class="font-semibold">{{ usulan.minat }}</div>
          </div>
          <div class="flex flex-wrap border-b mb-1 pb-1">
            <div class="min-w-[150px]">Judul</div>
            <div class="font-semibold">{{ usulan.judul }}</div>
          </div>
          <div class="md:flex border-b mb-1 pb-1">
            <div class="min-w-[150px] text-center md:text-left">Deskripsi</div>
            <div class="text-justify flex-auto">{{ usulan.deskripsi }}</div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="" @click="lihatMhs(usulan.username)" class="cursor-pointer">
                Profile MHS
              </Button>
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
                      <div>{{ mhsDataPribadi.kelas }} | {{ mhsDataPribadi.prodi }} | {{ mhsDataPribadi.tahun_ajaran }}
                      </div>
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
                Data {{ usulan.name }} NIM {{ usulan.username }} tidak ditemukan!
              </div>
            </DialogContent>
          </Dialog>

          <span v-if="usulan.tahap === 'Diskusi' && usulan.message">
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
                  placeholder="" v-model="inputMsg" />

                <DialogFooter>
                  <DialogClose as-child>
                    <Button variant="secondary" class="cursor-pointer w-[100px]">Cancel</Button>
                  </DialogClose>
                  <Button class="cursor-pointer w-[100px]"
                    @click="diskusiUsulan(usulan.id, usulan.username, usulan.name)">Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </span>
          <span v-else>
            <Button variant="" class="cursor-pointer bg-green-600" @click="terimaUsulan(usulan.id, usulan.username)">Terima</Button>
          </span>

          <Button variant="destructive" class="cursor-pointer" @click="tolakUsulan(usulan.id, usulan.username)">Tolak</Button>
        </div>
      </div>
    </div>
  </div>
</template>