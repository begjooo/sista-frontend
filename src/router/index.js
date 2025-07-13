import { createMemoryHistory, createRouter } from "vue-router"

import Home from "@/views/Home.vue"
import Login from "@/components/Login.vue"
import DosenHome from "@/views/dosen/Home.vue"
import MhsHome from "@/views/mhs/Home.vue"
import Sempro from "@/views/mhs/Sempro.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/dosen', component: DosenHome },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs//sempro', component: Sempro },
  ],
})

export default router