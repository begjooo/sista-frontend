import { createMemoryHistory, createRouter } from "vue-router"
import About from "@/views/About.vue"
import Login from "@/views/Login.vue"
import DosenHome from "@/views/dosen/Home.vue"
import MhsHome from "@/views/mhs/Home.vue"
import PilihPbb from "@/views/mhs/PilihPbb.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/about', component: About },
    { path: '/dosen', component: DosenHome },
    { path: '/mhs', component: MhsHome },
    { path: '/mhs/pilih-pbb', component: PilihPbb },
  ],
})

export default router