<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Label } from '@/components/ui/label'
import Button from '@/components/ui/button/Button.vue';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { baseUrl } from '@/baseUrl';

const router = useRouter()
const usernameLength = 6;

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
  const regex = /^[0-9]+$/
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
  if (isUsernameValid && inputUsername.value.length === usernameLength) {
    newData.value.username = inputUsername.value
  } else {
    newData.value.username = ''
  }

  newData.value.password = setPassword(inputPassword.value, inputConfirmPassword.value)

  if (!newData.value.username) {
    return `Invalid 'NIP'`
  } else if (!newData.value.password) {
    return `Invalid 'Password'`
  } else {
    console.log(`submit new ${newData.value.job} account`)

    try {
      console.log(newData.value)
      const response = await fetch(`${baseUrl}/register/dosen`, {
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
        <CardTitle class="truncate pb-1">Buat Akun Dosen</CardTitle>
      </CardHeader>

      <CardContent>
        <form class="text-sm">
          <div class="grid items-center gap-2">
            <div class="flex gap-4">
              <Label for="username" class="min-w-[20vh] max-w-[20vh]">NIP</Label>
              <input id="username" placeholder="NIP" class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
                :class="[(checkUsername(inputUsername) === false ? 'bg-red-200' : 'bg-blue-100'), (inputUsername.length === usernameLength ? 'bg-blue-100' : 'bg-red-200')]"
                v-model="inputUsername" />
            </div>
            <!-- <div class="flex gap-4">
              <Label for="job" class="min-w-[20vh] max-w-[20vh]">Pekerjaan</Label>
              <Select id="job" v-model="newData.job">
                <SelectTrigger class="w-full min-w-[20vh]">
                  <SelectValue placeholder="Pekerjaan" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="dosen">Dosen</SelectItem>
                  <SelectItem value="tendik">Tendik / PLP</SelectItem>
                </SelectContent>
              </Select>
            </div> -->
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