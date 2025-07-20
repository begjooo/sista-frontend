<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Button from '@/components/ui/button/Button.vue';
import { baseUrl } from '@/baseUrl';
import { onMounted } from 'vue';

const router = useRouter()
const username = ref('')
const password = ref('')
const loginStatus = ref()

function routeToHome(data) {
  console.log(`routeToHome()`)
  console.log(`login success! save username to local storage`)

  localStorage.setItem('username', data.username)
  switch (data.job) {
    case 'admin':
      console.log(`go to /admin`)
      router.push('/admin')
      break
    case 'dosen':
      console.log(`go to /dosen`)
      router.push('/dosen')
      break
    case 'tendik':
      console.log(`go to /tendik`)
      router.push('/tendik')
      break
    default:
      console.log(`go to /mhs`)
      router.push('/mhs')
      break
  }
}

async function login(user, pass) {
  // console.log(`login()`)
  if (user && pass) {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: user, password: pass }),
      })

      loginStatus.value = await response.json()

      if (loginStatus.value) {
        // console.log(`login success`)
        routeToHome(loginStatus.value)
      } else {
        // console.log(`login failed!`)
        username.value = ''
        password.value = ''
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    // console.log(`user or pass is empty`)
  }
}

onMounted(async () => {
  console.log(`/ onMounted()`)
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    loginStatus.value = await response.json()
    // console.log('loginStatus.value', loginStatus.value)

    if (loginStatus.value) {
      // console.log(`user has been stored`)
      routeToHome(loginStatus.value)
    } else {
      // console.log(`no cookies! please login`)
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="loginStatus === 0">
    <div class="flex justify-center mt-10">
      <Card class="w-[60vh]">
        <CardHeader>
          <CardTitle class="truncate">Welcome to SISTA</CardTitle>
          <CardDescription class="truncate">Sistem Tugas Akhir<br>Prodi Teknik Telekomunikasi<br>POLBAN
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div class="grid items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="username">Username</Label>
                <input id="username" placeholder="username" class="w-full border rounded-md py-1 px-2"
                  v-model="username" />
              </div>

              <div class="flex flex-col space-y-1.5">
                <div class="flex flex-wrap justify-between">
                  <Label for="password">Password</Label>
                  <a class="cursor-pointer text-xs italic hover:underline" variant="">Forget Password</a>
                </div>
                <input id="password" type="password" placeholder="password" class="w-full border rounded-md py-1 px-2"
                  v-model="password" />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter class="flex flex-wrap justify-between">
          <Button class="cursor-pointer w-[100px]" @click="login(username, password)">Login</Button>
          <RouterLink to="/mhs/signup">
            <!-- <RouterLink to="/dosen/signup"> -->
            <Button class="cursor-pointer w-[100px]" variant="link">Sign-Up</Button>
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
