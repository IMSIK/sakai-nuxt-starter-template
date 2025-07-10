<template>
  <Button
    class="lang-btn"
    :label="currentLanguageName"
    @click="toggleLanguage"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { config } from '~/utils/config'

// get languages and get init lang
const languages = config.languageInfos ?? []
const defaultLanguageName = languages[0]?.name ?? ''
const defaultLanguageValue = languages[0]?.value ?? ''

const { locale } = useI18n()

// cal current language
const currentLanguageName = computed((): string => {
  if (languages.length === 0) return defaultLanguageName
  const info = languages.find(l => l.value === locale.value)
  return info?.name ?? defaultLanguageName
})

// switch
function toggleLanguage(): void {
  if (languages.length === 0) return
  const idx = languages.findIndex(l => l.value === locale.value)
  const nextIdx = (idx + 1) % languages.length
  locale.value = languages[nextIdx]?.value ?? defaultLanguageValue
}
</script>

<style scoped lang="scss">
.lang-btn {
  min-width: 100px;
  text-transform: none;
  color: black !important;
}
</style>
