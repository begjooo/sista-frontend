<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Label } from '@/components/ui/label'
import Button from '@/components/ui/button/Button.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { baseUrl } from '@/baseUrl';

const router = useRouter()
const usernameLength = 3;

const yearPresent = new Date().getFullYear()

const newData = ref({
  username: '',
  password: '',
  name: '',
  email: '',
  tahunAjaran: '',
  kelas: '',
  prodi: '',
})

const inputUsername = ref('')
const inputEmail = ref('')
const inputPassword = ref('')
const inputConfirmPassword = ref('')
const registrationStatus = ref({
  status: true,
  message: '',
})

function checkUsername(username) {
  const regex = /^[0-9]+$/
  return regex.test(username)
}

function checkEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

function setPassword(password, confirmPassword) {
  if (password && confirmPassword) {
    if (password === confirmPassword) {
      // console.log(`password correct`)
      return password
    } else {
      // console.log(`password incorrect`)
      return ''
    }
  } else {
    // console.log(`password/confirm password is empty`)
    return ''
  }
}

async function submit() {
  const isUsernameValid = checkUsername(inputUsername.value)
  if (isUsernameValid && inputUsername.value.length === usernameLength) {
    newData.value.username = inputUsername.value
  } else {
    newData.value.username = ''
  }

  const isEmailValid = checkEmail(inputEmail.value)
  if (isEmailValid) {
    newData.value.email = inputEmail.value
  } else {
    newData.value.email = ''
  }

  newData.value.password = setPassword(inputPassword.value, inputConfirmPassword.value)

  if (!newData.value.name) {
    return `Invalid 'Nama'`
  } else if (!newData.value.username) {
    return `Invalid 'NIM'`
  } else if (!newData.value.email) {
    return `Invalid 'Email'`
  } else if (!newData.value.tahunAjaran) {
    return `Invalid 'Tahun Ajaran'`
  } else if (!newData.value.prodi) {
    return `Invalid 'Program Studi'`
  } else if (!newData.value.kelas) {
    return `Invalid 'Kelas'`
  } else if (!newData.value.password) {
    return `Invalid 'Password'`
  } else {
    console.log(`submit new account`)

    try {
      const response = await fetch(`${baseUrl}/register/mhs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
</script>

<template>
  <div class="flex justify-center mt-10">
    <Card class="w-[60vh]">
      <CardHeader>
        <CardTitle class="truncate pb-1">Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <form class="text-sm">
          <div class="grid items-center gap-2">
            <div class="flex gap-4">
              <Label for="name" class="min-w-[20vh] max-w-[20vh]">Nama</Label>
              <input id="name" placeholder="Nama" class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
                :class="[(newData.name === '' ? 'bg-red-200' : 'bg-blue-100')]" v-model="newData.name" />
            </div>
            <div class="flex gap-4">
              <Label for="username" class="min-w-[20vh] max-w-[20vh]">NIM</Label>
              <input id="username" placeholder="NIM" class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
                :class="[(checkUsername(inputUsername) === false ? 'bg-red-200' : 'bg-blue-100'), (inputUsername.length === usernameLength ? 'bg-blue-100' : 'bg-red-200')]"
                v-model="inputUsername" />
            </div>
            <div class="flex gap-4">
              <Label for="email" class="min-w-[20vh] max-w-[20vh]">Email</Label>
              <input type="email" id="email" placeholder="xxx@yyy.zzz"
                class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
                :class="[(checkEmail(inputEmail) === false ? 'bg-red-200' : 'bg-blue-100')]" v-model="inputEmail" />
            </div>
            <div class="flex gap-4">
              <Label for="tahunAjaran" class="min-w-[20vh] max-w-[20vh]">Tahun Ajaran</Label>
              <Select id="tahunAjaran" v-model="newData.tahunAjaran">
                <SelectTrigger class="w-full min-w-[20vh]"
                  :class="[(newData.tahunAjaran === '' ? 'bg-red-200' : 'bg-blue-100')]">
                  <SelectValue placeholder="Tahun Ajaran" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem :value="(yearPresent - 1) + '/' + (yearPresent)">
                    {{ yearPresent - 1 }}/{{ yearPresent }}
                  </SelectItem>
                  <SelectItem :value="(yearPresent) + '/' + (yearPresent + 1)">
                    {{ yearPresent }}/{{ yearPresent + 1 }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex gap-4">
              <Label for="prodi" class="min-w-[20vh] max-w-[20vh]">Program Studi</Label>
              <Select id="prodi" v-model="newData.prodi">
                <SelectTrigger class="w-full min-w-[20vh]"
                  :class="[(newData.prodi === '' ? 'bg-red-200' : 'bg-blue-100')]">
                  <SelectValue placeholder="Teknik Telekomunikasi" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="D3 Teknik Telekomunikasi">D3 Teknik Telekomunikasi</SelectItem>
                  <SelectItem value="D4 Teknik Telekomunikasi">D4 Teknik Telekomunikasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex gap-4">
              <Label for="kelas" class="min-w-[20vh] max-w-[20vh]">Kelas</Label>
              <input id="kelas" placeholder="Kelas" class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
                :class="[(newData.kelas === '' ? 'bg-red-200' : 'bg-blue-100')]" v-model="newData.kelas" />
            </div>
            <div class="flex gap-4">
              <Label for="password" class="min-w-[20vh] max-w-[20vh]">Password</Label>
              <input type="password" id="password" placeholder="Password"
                class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
                :class="[(inputPassword === '' ? 'bg-red-200' : 'bg-blue-100')]" v-model="inputPassword" />
            </div>
            <div class="flex gap-4">
              <Label for="confirmPassword" class="min-w-[20vh] max-w-[20vh]">Confirm Password</Label>
              <input type="password" id="confirmPassword" placeholder="Confirm Password"
                class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
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
        </form>
      </CardContent>

      <CardFooter class="flex flex-wrap justify-between">
        <Button class="cursor-pointer w-[100px]" @click="submit">Submit</Button>
      </CardFooter>
    </Card>
  </div>
</template>