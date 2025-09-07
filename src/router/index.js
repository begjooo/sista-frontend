import { createMemoryHistory, createRouter } from "vue-router"

import Login from "@/views/Login.vue"

import AdminHome from "@/views/admin/Home.vue"
import AdminMhs from "@/views/admin/civitas/Mhs.vue"
import AdminDosen from "@/views/admin/civitas/Dosen.vue"
import AdminTendik from "@/views/admin/civitas/Tendik.vue"
import AdminTaDaftar from "@/views/admin/tugas-akhir/Daftar.vue"
import AdminTaUsulan from "@/views/admin/tugas-akhir/Usulan.vue"
import AdminTaPeraturan from "@/views/admin/tugas-akhir/Peraturan.vue"
import AdminTaPengumuman from "@/views/admin/tugas-akhir/Pengumuman.vue"

import DosenHome from "@/views/dosen/Home.vue"
import DosenTaUsulan from "@/views/dosen/tugas-akhir/Usulan.vue"
import DosenTaUsulanMhs from "@/views/dosen/tugas-akhir/UsulanMhs.vue"
import DosenTaUsulanPbbPdp from "@/views/dosen/tugas-akhir/UsulanPbbPdp.vue"
import DosenTaBimbingan from "@/views/dosen/tugas-akhir/Bimbingan.vue"
import DosenProfilePribadi from "@/views/dosen/profile/Pribadi.vue"
import DosenProfileKeamanan from "@/views/dosen/profile/Keamanan.vue"
import DosenProfilePenelitian from "@/views/dosen/profile/Penelitian.vue"

import TendikHome from "@/views/tendik/Home.vue"

import MhsSignup from "@/views/mhs/Signup.vue"
import MhsHome from "@/views/mhs/Home.vue"
import MhsTaUsulanPbb from "@/views/mhs/tugas-akhir/UsulanPbb.vue"
import MhsProfileCv from "@/views/mhs/profile/Cv.vue"
import MhsProfilePribadi from "@/views/mhs/profile/Pribadi.vue"
import MhsProfileKeamanan from "@/views/mhs/profile/Keamanan.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Login },

    { path: '/admin', component: AdminHome },
    { path: '/admin/tugas-akhir/daftar', component: AdminTaDaftar },
    { path: '/admin/tugas-akhir/usulan', component: AdminTaUsulan },
    { path: '/admin/tugas-akhir/peraturan', component: AdminTaPeraturan },
    { path: '/admin/tugas-akhir/pengumuman', component: AdminTaPengumuman },
    { path: '/admin/civitas/dosen', component: AdminDosen },
    { path: '/admin/civitas/mhs', component: AdminMhs },
    { path: '/admin/civitas/tendik', component: AdminTendik },

    { path: '/dosen', component: DosenHome },
    { path: '/dosen/tugas-akhir/usulan', component: DosenTaUsulan },
    { path: '/dosen/tugas-akhir/usulan-mhs', component: DosenTaUsulanMhs },
    { path: '/dosen/tugas-akhir/usulan-pdp', component: DosenTaUsulanPbbPdp },
    { path: '/dosen/tugas-akhir/bimbingan', component: DosenTaBimbingan },
    { path: '/dosen/profile/pribadi', component: DosenProfilePribadi },
    { path: '/dosen/profile/keamanan', component: DosenProfileKeamanan },
    { path: '/dosen/profile/penelitian', component: DosenProfilePenelitian },

    { path: '/tendik', component: TendikHome },

    { path: '/mhs/signup', component: MhsSignup },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs/tugas-akhir/usulan-pbb', component: MhsTaUsulanPbb },
    { path: '/mhs/profile/cv', component: MhsProfileCv },
    { path: '/mhs/profile/pribadi', component: MhsProfilePribadi },
    { path: '/mhs/profile/keamanan', component: MhsProfileKeamanan },
  ],
})

export default router