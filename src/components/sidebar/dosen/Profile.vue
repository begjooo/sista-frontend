<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const selectedIndex = Number(localStorage.getItem('sidebarIndex'))
const menuList = ref([
  {
    name: 'Pribadi',
    link: '/dosen/profile/pribadi',
  },
  {
    name: 'Penelitian',
    link: '/dosen/profile/penelitian',
  },
  {
    name: 'Keamanan',
    link: '/dosen/profile/keamanan',
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
          <div v-if="menu.name === 'Pribadi'">
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
          <div v-else-if="menu.name === 'Penelitian'">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from Ultimate free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ -->
              <path fill="currentColor"
                d="m8.75 21.2l2.51 2.51a1 1 0 0 0 1.41 0a1 1 0 0 0 0-1.42l-2.5-2.5a.26.26 0 0 1 0-.31a5.5 5.5 0 1 0-10-1.7a5.45 5.45 0 0 0 4.08 4.11a5.55 5.55 0 0 0 4.23-.72a.24.24 0 0 1 .27.03M5.5 20A3.5 3.5 0 1 1 9 16.53A3.5 3.5 0 0 1 5.5 20" />
              <path fill="currentColor"
                d="M24 18.5V4.41A2 2 0 0 0 23.41 3L21 .59A2 2 0 0 0 19.59 0H8a2 2 0 0 0-2 2v7.3a.24.24 0 0 0 .22.24a8 8 0 0 1 1.46.31a.24.24 0 0 0 .32-.23V2.5a.5.5 0 0 1 .5-.5h10.88a.47.47 0 0 1 .35.15l2.12 2.12a.47.47 0 0 1 .15.35V18a.5.5 0 0 1-.5.5h-9.12a.25.25 0 0 0-.23.17a6 6 0 0 1-.42 1a.33.33 0 0 0 0 .24l.46.45a.47.47 0 0 0 .29.13H22a2 2 0 0 0 2-1.99" />
              <path fill="currentColor"
                d="M11.27 12.48a1 1 0 0 0 1-.39l1.65-2.32a.24.24 0 0 1 .33-.07l1.51.9a1 1 0 0 0 1.24-.15l.1-.12l2.69-3.74a1 1 0 1 0-1.62-1.16l-2 2.8a.25.25 0 0 1-.33.06l-1.52-.9a1 1 0 0 0-1.32.28l-2.31 3.26a.9.9 0 0 0-.17.59a.5.5 0 0 0 0 .13a8 8 0 0 1 .64.77Z" />
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