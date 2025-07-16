import { createMemoryHistory, createRouter } from "vue-router"

import Login from "@/views/Login.vue"
import DosenHome from "@/views/dosen/Home.vue"
import MhsHome from "@/views/mhs/Home.vue"
import PengajuanPbb from "@/views/mhs/PengajuanPbb.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/dosen', component: DosenHome },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs/pengajuan', component: PengajuanPbb },
  ],
})

export default router