import { createMemoryHistory, createRouter } from "vue-router"

import Login from "@/views/Login.vue"

import AdminHome from "@/views/admin/Home.vue"
import AdminMhs from "@/views/admin/Mhs.vue"
import AdminDosen from "@/views/admin/dosen/Dosen.vue"
import AdminCreateDosen from "@/views/admin/dosen/Create.vue"
import AdminTendik from "@/views/admin/Tendik.vue"

import DosenHome from "@/views/dosen/Home.vue"
import DosenPenelitianMinat from "@/views/dosen/penelitian/Minat.vue"
import DosenTaUsulan from "@/views/dosen/tugas-akhir/Usulan.vue"
import DosenTaUsulanMhs from "@/views/dosen/tugas-akhir/UsulanMhs.vue"
import DosenTaBimbingan from "@/views/dosen/tugas-akhir/Bimbingan.vue"
import DosenProfilePribadi from "@/views/dosen/profile/Pribadi.vue"
import DosenProfileKeamanan from "@/views/dosen/profile/Keamanan.vue"

import TendikHome from "@/views/tendik/Home.vue"

import MhsSignup from "@/views/mhs/Signup.vue"
import MhsHome from "@/views/mhs/Home.vue"
import MhsTaUsulanPbb from "@/views/mhs/tugas-akhir/UsulanPbb.vue"

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
    { path: '/dosen/penelitian/minat', component: DosenPenelitianMinat },
    { path: '/dosen/tugas-akhir/usulan', component: DosenTaUsulan },
    { path: '/dosen/tugas-akhir/usulan-mhs', component: DosenTaUsulanMhs },
    { path: '/dosen/tugas-akhir/bimbingan', component: DosenTaBimbingan },
    { path: '/dosen/profile/pribadi', component: DosenProfilePribadi },
    { path: '/dosen/profile/keamanan', component: DosenProfileKeamanan },

    { path: '/tendik', component: TendikHome },

    { path: '/mhs/signup', component: MhsSignup },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs/tugas-akhir/usulan-pbb', component: MhsTaUsulanPbb },
  ],
})

export default router