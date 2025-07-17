import { createMemoryHistory, createRouter } from "vue-router"

import Login from "@/views/Login.vue"
import DosenHome from "@/views/dosen/Home.vue"
import MhsHome from "@/views/mhs/Home.vue"
import MhsPengajuanTa from "@/views/mhs/PengajuanTa.vue"
import DosenPermintaanPbb from "@/views/dosen/PermintaanPbb.vue"
import DosenBimbingan from "@/views/dosen/Bimbingan.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/dosen', component: DosenHome },
    { path: '/dosen/permintaan-pembimbing', component: DosenPermintaanPbb },
    { path: '/dosen/bimbingan', component: DosenBimbingan },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs/pengajuan-ta', component: MhsPengajuanTa },
  ],
})

export default router