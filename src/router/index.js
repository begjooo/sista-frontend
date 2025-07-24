import { createMemoryHistory, createRouter } from "vue-router"

import Login from "@/views/Login.vue"

import AdminHome from "@/views/admin/Home.vue"
import AdminMhs from "@/views/admin/Mhs.vue"
import AdminDosen from "@/views/admin/dosen/Dosen.vue"
import AdminCreateDosen from "@/views/admin/dosen/Create.vue"
import AdminTendik from "@/views/admin/Tendik.vue"

import DosenHome from "@/views/dosen/Home.vue"
import DosenTaPengajuan from "@/views/dosen/tugas-akhir/Pengajuan.vue"
import DosenPermintaanPbb from "@/views/dosen/tugas-akhir/PermintaanPbb.vue"
import DosenBimbingan from "@/views/dosen/tugas-akhir/Bimbingan.vue"
import DosenProfilePribadi from "@/views/dosen/profile/Pribadi.vue"
import DosenProfilePenelitian from "@/views/dosen/profile/Penelitian.vue"
import DosenProfileKeamanan from "@/views/dosen/profile/Keamanan.vue"

import TendikHome from "@/views/tendik/Home.vue"

import MhsSignup from "@/views/mhs/Signup.vue"
import MhsHome from "@/views/mhs/Home.vue"
import MhsPengajuanTa from "@/views/mhs/PengajuanTa.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Login },

    { path: '/admin', component: AdminHome },
    { path: '/admin/dosen', component: AdminDosen },
    { path: '/admin/dosen/create', component: AdminCreateDosen },
    { path: '/admin/mhs', component: AdminMhs },
    { path: '/admin/tendik', component: AdminTendik },

    { path: '/dosen', component: DosenHome },
    { path: '/dosen/tugas-akhir/pengajuan', component: DosenTaPengajuan },
    { path: '/dosen/tugas-akhir/permintaan-pbb', component: DosenPermintaanPbb },
    { path: '/dosen/tugas-akhir/bimbingan', component: DosenBimbingan },
    { path: '/dosen/profile/pribadi', component: DosenProfilePribadi },
    { path: '/dosen/profile/penelitian', component: DosenProfilePenelitian },
    { path: '/dosen/profile/keamanan', component: DosenProfileKeamanan },

    { path: '/tendik', component: TendikHome },

    { path: '/mhs/signup', component: MhsSignup },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs/pengajuan-ta', component: MhsPengajuanTa },
  ],
})

export default router