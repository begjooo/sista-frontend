<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { baseUrl } from '@/baseUrl'
import { useRouter } from 'vue-router'

const props = defineProps(['pass'])
const currentPassword = props.pass

const username = localStorage.getItem('username')
const router = useRouter()

const inputPassword = ref('')
const inputConfirmPassword = ref('')

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
    console.log(`password/confirm password is empty`)
    return ''
  }
}

async function submit() {
  console.log(`submit`)
  const newPassword = setPassword(inputPassword.value, inputConfirmPassword.value)

  if (!newPassword) {
    console.log(`invalid password`)
  } else {
    console.log(`submit new password`)

    try {
      const response = await fetch(`${baseUrl}/dosen/${username}/profile/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      })
      const result = await response.json()
      if (result) {
        console.log(`changes password success`)
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="">
        Change Password
      </Button>
    </DialogTrigger>
    <DialogContent class="min-w-[200px]">
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <Label for="newPassword" class="min-w-[20vh] max-w-[20vh]">New Password</Label>
          <input type="password" id="newPassword" class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
            :class="[(inputPassword === '' ? 'bg-red-200' : 'bg-blue-100')]" v-model="inputPassword" />
        </div>
        <div class="flex gap-2">
          <Label for="confirmPassword2" class="min-w-[20vh] max-w-[20vh]">Confirm Password</Label>
          <input type="password" id="confirmPassword2" class="w-full border rounded-md py-1 px-2 min-w-[20vh]"
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
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary" class="cursor-pointer w-[100px]" @click="">Cancel</Button>
        </DialogClose>
        <Button class="cursor-pointer w-[100px]" @click="submit">Submit</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>