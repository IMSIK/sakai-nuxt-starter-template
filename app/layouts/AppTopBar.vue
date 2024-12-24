<script setup>
import { useLayout } from './composables/layout'

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout()
const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)

onMounted(() => {
  bindOutsideClickListener()
})
onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

const onTopBarMenuButton = () => topbarMenuActive.value = !topbarMenuActive.value

const onProfileClick = () => topbarMenuActive.value = false

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value,
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false
      }
    }

    document.addEventListener('click', outsideClickListener.value)
  }
}

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}

const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return
  const sidebarEl = document.querySelector('.layout-topbar-menu')
  const topbarEl = document.querySelector('.layout-topbar-menu-button')

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}
</script>

<template>
  <div class="layout-topbar">
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars" />
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v" />
    </button>

    <div
      class="layout-topbar-menu"
      :class="topbarMenuClasses"
    >
      <button
        type="button"
        class="layout-topbar-button"
        @click="toggleDarkMode"
      >
        <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]" />
        <span>Dark Mode</span>
      </button>
      <button
        as="router-link"
        class="layout-topbar-button"
        @click="onTopBarMenuButton()"
      >
        <i class="pi pi-calendar" />
        <span>Calendar</span>
      </button>
      <button
        as="router-link"
        class="layout-topbar-button"
        @click="onProfileClick"
      >
        <i class="pi pi-user" />
        <span>Profile</span>
      </button>
      <button
        as="router-link"
        class="layout-topbar-button"
      >
        <i class="pi pi-cog" />
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
