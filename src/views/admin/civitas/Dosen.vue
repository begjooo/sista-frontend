<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl } from '@/baseUrl';
import { useRouter } from 'vue-router';
import { Label } from '@/components/ui/label'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Header from '@/components/header/Admin.vue';
import Civitas from '@/components/sidebar/admin/Civitas.vue';
import LihatDosen from '@/components/lihat/Dosen.vue';
import EditDosen from '@/components/edit/Dosen.vue';
import RemoveAccount from '@/components/delete/Account.vue';
import IconUserNew from '@/components/icons/IconUserNew.vue';

const entityList = ref([])
const router = useRouter()

const maxUsernameLength = 6;

const newData = ref({
  username: '',
  password: '',
  job: 'dosen',
})

const inputUsername = ref('')
const inputPassword = ref('')
const inputConfirmPassword = ref('')
const registrationStatus = ref({
  status: true,
  message: '',
})

function checkUsername(username) {
  const regex = /^[a-zA-Z0-9]+$/
  return regex.test(username)
}

function setPassword(password, confirmPassword) {
  if (password && confirmPassword) {
    if (password === confirmPassword) {
      return password
    } else {
      return ''
    }
  } else {
    return ''
  }
}

async function submit() {
  const isUsernameValid = checkUsername(inputUsername.value)
  if (isUsernameValid && inputUsername.value.length === maxUsernameLength) {
    newData.value.username = inputUsername.value
  } else {
    newData.value.username = ''
  }

  newData.value.password = setPassword(inputPassword.value, inputConfirmPassword.value)

  if (!newData.value.username) {
    return `Invalid 'Kode'`
  } else if (!newData.value.password) {
    return `Invalid 'Password'`
  } else {
    console.log(`submit new ${newData.value.job} account`)

    try {
      console.log(newData.value)
      const response = await fetch(`${baseUrl}/register/dosen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(newData.value),
      });

      const result = await response.json()

      if (result.status === true) {
        router.push('/')
      } else {
        registrationStatus.value = result
      }
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}/dosen/list-full`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
    entityList.value = await response.json()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Header />
  <Civitas />

  <div class="body-head-side">
    <div v-if="entityList">
      <div>
        <table class="w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead class="">Kode</TableHead>
              <TableHead class="">NIP</TableHead>
              <TableHead class="">Nama</TableHead>
              <TableHead class="">Jab. Fungsional</TableHead>
              <TableHead class="">email</TableHead>
              <TableHead class="">KBK</TableHead>
              <TableHead class="flex justify-end">
                <div class="content-center">
                  <Dialog>
                    <DialogTrigger as-child>
                      <IconUserNew id="icon-create" class="w-[20px] h-[20px]" />
                    </DialogTrigger>
                    <DialogContent class="min-w-[300px]">
                      <DialogHeader>
                        <DialogTitle>Buat Akun Dosen</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>

                      <div class="grid items-center gap-2 text-sm">
                        <div class="flex gap-4">
                          <Label for="username" class="min-w-[20vh] max-w-[20vh]">Kode</Label>
                          <input id="username" placeholder="Kode" class="w-full rounded-sm py-1 px-2 min-w-[20vh]"
                            :class="[(checkUsername(inputUsername) === false ? 'bg-red-200' : 'bg-blue-100'), (inputUsername.length === maxUsernameLength ? 'bg-blue-100' : 'bg-red-200')]"
                            v-model="inputUsername" />
                        </div>

                        <div class="flex gap-4">
                          <Label for="password" class="min-w-[20vh] max-w-[20vh]">Password</Label>
                          <input type="password" id="password" placeholder="Password"
                            class="w-full rounded-sm py-1 px-2 min-w-[20vh]"
                            :class="[(inputPassword === '' ? 'bg-red-200' : 'bg-blue-100')]" v-model="inputPassword" />
                        </div>
                        <div class="flex gap-4">
                          <Label for="confirmPassword" class="min-w-[20vh] max-w-[20vh]">Confirm Password</Label>
                          <input type="password" id="confirmPassword" placeholder="Confirm Password"
                            class="w-full rounded-sm py-1 px-2 min-w-[20vh]"
                            :class="[(inputConfirmPassword === '' ? 'bg-red-200' : 'bg-blue-100'), (inputConfirmPassword !== inputPassword ? 'bg-red-200' : 'bg-blue-100')]"
                            v-model="inputConfirmPassword" />
                        </div>
                        <div v-if="inputConfirmPassword && inputPassword !== inputConfirmPassword"
                          class="text-right text-sm italic font-bold text-red-500">Invalid password
                        </div>
                        <div v-else-if="inputConfirmPassword !== '' && inputPassword === inputConfirmPassword"
                          class="text-right text-sm italic font-bold text-blue-800">
                          Correct!
                        </div>
                        <div v-if="!registrationStatus.status" class="text-right text-sm italic font-bold text-red-500">
                          {{ registrationStatus.message }}
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
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="entity in entityList">
              <TableCell class="font-mono">{{ entity.username }}</TableCell>
              <TableCell class="font-mono">{{ entity.nip }}</TableCell>
              <TableCell class="">{{ entity.fullname }}</TableCell>
              <TableCell class="">{{ entity.jabatan_fungsional }}</TableCell>
              <TableCell class="">{{ entity.email }}</TableCell>
              <TableCell class="">{{ entity.kbk }}</TableCell>
              <TableCell class="flex gap-1 justify-end">
                <LihatDosen :username="entity.username" :w="20" :h="20" />
                <EditDosen :username="entity.username" :currentData="entity" :w="20" :h="20" />
                <RemoveAccount :job="'dosen'" :username="entity.username" :w="20" :h="20" />
              </TableCell>
            </TableRow>
          </TableBody>
        </table>
      </div>
    </div>
  </div>


</template>