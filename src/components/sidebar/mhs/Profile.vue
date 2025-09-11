<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
  {
    name: 'Curriculum Vitae',
    link: '/mhs/profile/cv',
  },
  {
    name: 'Pribadi',
    link: '/mhs/profile/pribadi',
  },
  {
    name: 'Keamanan',
    link: '/mhs/profile/keamanan',
  },
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
          <div v-if="menu.name === 'Curriculum Vitae'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 256 256"><!-- Icon from Phosphor by Phosphor Icons - https://github.com/phosphor-icons/core/blob/main/LICENSE -->
              <path fill="currentColor"
                d="m211.48 35.32l-130.25-23a20 20 0 0 0-23.18 16.22l-29.75 169a20 20 0 0 0 16.22 23.16l130.25 23a20 20 0 0 0 3.52.31A20 20 0 0 0 198 227.46l29.75-169a20 20 0 0 0-16.27-23.14M175 219.36L52.63 197.75L81 36.64l122.37 21.61ZM91.9 67a12 12 0 0 1 13.9-9.73L173 69.14A12 12 0 0 1 171 93a12.6 12.6 0 0 1-2.1-.18L101.63 80.9A12 12 0 0 1 91.9 67M85 106.39a12 12 0 0 1 13.91-9.73l67.22 11.88a12 12 0 0 1-2.13 23.81a12.5 12.5 0 0 1-2.1-.18l-67.21-11.88a12 12 0 0 1-9.69-13.9m-7 39.39a12 12 0 0 1 13.9-9.73l33.64 5.95a12 12 0 0 1-2.07 23.82a11.6 11.6 0 0 1-2.1-.19l-33.61-5.93A12 12 0 0 1 78 145.78" />
            </svg>
          </div>
          <div v-else-if="menu.name === 'Pribadi'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from Ultimate free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ -->
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path
                  d="M23.25 23.25a6.72 6.72 0 0 0-6.34-4.5a6.72 6.72 0 0 0-6.34 4.5M13.35 11a6.85 6.85 0 0 0 4.93 2.09a6.9 6.9 0 0 0 2.72-.52" />
                <path d="M12.79 13.12a4.12 4.12 0 1 0 8.24 0a4.12 4.12 0 0 0-8.24 0m3.99 5.63v4.5" />
                <path d="M5.74 21.35A11.25 11.25 0 1 1 22.89 9.18" />
                <path
                  d="M8 19.4a26.1 26.1 0 0 1-.9-11.84a16.1 16.1 0 0 1 2.19-6.48M.77 11.25h8.98M2.48 6h19.04M1.69 16.5h8.06m4.96-15.42A14.3 14.3 0 0 1 16.63 6" />
              </g>
            </svg>
          </div>
          <div v-else-if="menu.name === 'Keamanan'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from TDesign Icons by TDesign - https://github.com/Tencent/tdesign-icons/blob/main/LICENSE -->
              <path fill="currentColor"
                d="M5.5 7.5a6.5 6.5 0 0 1 13 0V9H21v14H3V9h2.5zm2 1.5h9V7.5a4.5 4.5 0 1 0-9 0zM5 11v10h14V11zm2 1.504h2.004V15H7zM7 16.5h2.004v2.504H7z" />
            </svg>
          </div>
          {{ menu.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>