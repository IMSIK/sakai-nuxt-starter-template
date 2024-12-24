const layoutConfig = reactive({
  darkTheme: false,
  menuMode: 'static',
  activeMenuItem: null,
})

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: '',
})

export function useLayout() {
  const changeThemeSettings = (theme: string, darkTheme: boolean) => {
    layoutConfig.darkTheme = darkTheme
  }

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle()

      return
    }

    document.startViewTransition(() => executeDarkModeToggle())
  }

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme
    document.documentElement.classList.toggle('p-dark')
  }

  const setActiveMenuItem = (item: any) => {
    layoutConfig.activeMenuItem = item.value || item
  }

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === 'overlay')
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive

    if (window.innerWidth > 991)
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive
    else
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
  }

  const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive)

  const isDarkTheme = computed(() => layoutConfig.darkTheme)

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    changeThemeSettings,
    toggleDarkMode,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    setActiveMenuItem,
  }
}
