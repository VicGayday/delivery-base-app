<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Message from "../components/ui/Message.vue"

export default defineComponent({
  name: "App",
  components: { Message },
  setup() {
    return { Message }
  },
})
</script>

<style scoped></style>
