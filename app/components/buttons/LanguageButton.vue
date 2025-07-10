<template>
  <div>
    <select v-model="locale">
      <option
        v-for="lang in config.languageInfos"
        :key="lang.value"
        :value="lang.value"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { config } from '~/utils/config'

const { locale } = useI18n()
</script>
