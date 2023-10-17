<template>
  <div class="container">
    <Suspense>
      <component :is="layout + '-layout'" v-if="layout" />
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"
import MainLayout from "@/layout/MainLayout.vue"
import LoginLayout from "@/layout/LoginLayout.vue"

export default defineComponent({
  name: "App",
  components: { MainLayout, LoginLayout },
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout),
    }
  },
})
</script>

<style>
.container {
  margin: auto;
  max-width: 797px;
  min-height: 546px;
  background: var(--background-primary);
}
</style>
