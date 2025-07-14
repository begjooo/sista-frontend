import { createMemoryHistory, createRouter } from "vue-router"

import Login from "@/views/Login.vue"
import DosenHome from "@/views/dosen/Home.vue"
import MhsHome from "@/views/mhs/Home.vue"
import Sempro from "@/views/mhs/Sempro.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/dosen', component: DosenHome },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs//sempro', component: Sempro },
  ],
})

export default router