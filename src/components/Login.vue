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

const router = useRouter()
const username = ref('')
const password = ref('')
const loginStatus = ref()

async function login(user, pass) {
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
        router.push(`/`)
      } else {
        console.log(`gagal login!`)
        username.value = ''
        password.value = ''
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <div class="flex justify-center mt-10">
    <Card class="w-[60vh]">
      <CardHeader>
        <CardTitle class="truncate">Welcome to SISTA</CardTitle>
        <CardDescription class="truncate">Sistem Tugas Akhir<br>Prodi Teknik Telekomunikasi<br>POLBAN</CardDescription>
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
        <Button class="cursor-pointer w-[100px]" @click.prevent="login(username, password)">Login</Button>
        <Button class="cursor-pointer w-[100px]" variant="link">Sign-Up</Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped></style>
