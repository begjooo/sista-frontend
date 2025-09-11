<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
  {
    name: 'Usulan Judul dari Dosen',
    link: '/dosen/tugas-akhir/usulan',
  },
  {
    name: 'Usulan Judul dari Mhs',
    link: '/dosen/tugas-akhir/usulan-mhs',
  },
  {
    name: 'Usulan Pemb. Pendamping dari Mhs',
    link: '/dosen/tugas-akhir/usulan-pdp',
  },
  {
    name: 'Mhs Bimbingan yang diterima',
    link: '/dosen/tugas-akhir/bimbingan',
  }
])

function changeIndex(index) {
  localStorage.setItem('sidebarIndex', index)
}
</script>

<template>
  <div class="sidebar-nav">
    <div v-for="(menu, index) in menuList" :key="index">
      <RouterLink :to="menu.link">
        <Button variant="link" class="text-white cursor-pointer pl-2" @click="changeIndex(index)"
          :class="{ 'underline': index === selectedIndex }">
          <div v-if="menu.name === 'Usulan Judul dari Dosen'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from Ultimate free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ -->
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.25 14.261h5.25m-5.25 4.5h5.25m-5.25-9h5.25" />
                <path
                  d="M8.25 14.636a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75m0 5.25a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75m0-8.25a.375.375 0 1 1 0-.75m0 .75a.375.375 0 1 0 0-.75" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 4.5h3.75A1.5 1.5 0 0 1 21 6v15.75a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5h3.75a3.75 3.75 0 0 1 7.5 0" />
                <path d="M12 4.511a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75" />
              </g>
            </svg>
          </div>
          <div v-else-if="menu.name === 'Usulan Judul dari Mhs'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from Ultimate free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ -->
              <path fill="currentColor"
                d="M4.715 17.13a.23.23 0 0 0 .116-.165V6.287a.97.97 0 0 1 .37-.776a.24.24 0 0 0 .116-.194V3.715a.26.26 0 0 0-.117-.194a.28.28 0 0 0-.213 0A2.91 2.91 0 0 0 2.89 6.287v11.94a.25.25 0 0 0 .165.233c.1.033.21-.002.272-.087a4.7 4.7 0 0 1 1.388-1.243m14.26-13.648a.28.28 0 0 0-.214 0a.26.26 0 0 0-.087.194v1.64a.24.24 0 0 0 .087.195a.97.97 0 0 1 .398.776v12.62a.97.97 0 0 1-.97.97h-1.467a.25.25 0 0 0-.242.243a2.5 2.5 0 0 1-.389 1.33a.24.24 0 0 0 0 .242a.25.25 0 0 0 .214.127h1.893a2.91 2.91 0 0 0 2.912-2.912V6.287a2.91 2.91 0 0 0-2.136-2.805M6.773 6.045a.25.25 0 0 0 .252.242h9.94a.25.25 0 0 0 .252-.242V3.133a.25.25 0 0 0-.252-.243h-2.194a.25.25 0 0 1-.242-.223c0-1.868-2.023-3.036-3.64-2.102a2.43 2.43 0 0 0-1.214 2.102a.25.25 0 0 1-.243.223H7.026a.25.25 0 0 0-.252.243Zm6.076-3.398a.74.74 0 0 1-.737.728a.728.728 0 1 1 .737-.728m1.738 16.512a1.213 1.213 0 0 0-1.708.155l-.845.718a.25.25 0 0 1-.262 0a.24.24 0 0 1-.146-.223v-6.241a1.456 1.456 0 0 0-2.912 0v4.125c0 .13-.103.238-.233.243h-1.34A3.24 3.24 0 0 0 3.9 21.168v2.35c0 .133.108.242.242.242h8.125a.24.24 0 0 0 .184-.087l2.3-2.825a1.213 1.213 0 0 0-.164-1.69" />
            </svg>
          </div>
          <div v-else-if="menu.name === 'Usulan Pemb. Pendamping dari Mhs'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from Ultimate free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ -->
              <path fill="currentColor"
                d="M18 14.5a5.86 5.86 0 0 0-2.61.61a.5.5 0 0 0-.27.31a.56.56 0 0 0 .06.4a8.9 8.9 0 0 1 1.32 4.68a.51.51 0 0 0 .5.5h6.5a.5.5 0 0 0 .5-.5a6 6 0 0 0-6-6m-3.81-4.25a3.75 3.75 0 1 0 7.5 0a3.75 3.75 0 1 0-7.5 0M2.75 7.75a4.75 4.75 0 1 0 9.5 0a4.75 4.75 0 1 0-9.5 0" />
              <path fill="currentColor" d="M15 20.5a7.5 7.5 0 0 0-15 0a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5" />
            </svg>
          </div>
          <div v-else-if="menu.name === 'Mhs Bimbingan yang diterima'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 32 32"><!-- Icon from OpenSearch UI by OpenSearch Contributors - https://github.com/opensearch-project/oui/blob/main/LICENSE.txt -->
              <path fill="currentColor"
                d="M24 0a8 8 0 1 1-4.906 14.32l-4.774 4.774a8 8 0 1 1-1.414-1.414l4.774-4.774A8 8 0 0 1 24 0M8 18a6 6 0 1 0 0 12a6 6 0 0 0 0-12M24 2a6 6 0 1 0 0 12a6 6 0 0 0 0-12" />
              <path fill="currentColor" d="M32 20v12H20V20zm-2 2h-8v8h8zM12 0v12H0V0zm-2 2H2v8h8z"
                class="ouiIcon__fillSecondary" />
            </svg>
          </div>
          {{ menu.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>