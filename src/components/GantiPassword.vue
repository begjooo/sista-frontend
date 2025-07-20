<script setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
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
          <Label for="newPassword1" class="min-w-[20vh] max-w-[20vh] border">New Password</Label>
          <input id="newPassword1" class="w-full border rounded-md py-1 px-2 min-w-[20vh]" />
        </div>
        <div class="flex gap-2">
          <Label for="confirmPassword2" class="min-w-[20vh] max-w-[20vh] border">Confirm Password</Label>
          <input id="confirmPassword2" class="w-full border rounded-md py-1 px-2 min-w-[20vh]" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>