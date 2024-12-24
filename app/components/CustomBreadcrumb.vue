<script setup lang="ts">
const { home, items } = defineProps<{
  home: { icon: string, route: string }
  items: { label: string, route: string }[]
}>()

const route = useRoute()
const isCurrentRoute = computed(() => (itemRoute: string) => route.path === itemRoute)
</script>

<template>
  <Breadcrumb
    :home="home"
    :model="items"
    :dt="{
      root: {
        background: 'transparent',
      },
    }"
  >
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a
          :href="href"
          v-bind="props.action"
          @click="navigate"
        >
          <span :class="[item.icon, 'text-color']" />
          <span :class="{ 'font-semibold': isCurrentRoute(item.route) }">{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
      </a>
    </template>
  </Breadcrumb>
</template>

<style scoped lang="scss">

</style>
