<template>
  <Navbar />
  <div class="container">
    <app-message />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Navbar from "../components/Navbar.vue"
import Message from "../components/ui/Message.vue"

export default defineComponent({
  name: "MainLayout",
  components: { Navbar, Message },
  setup() {},
})
</script>

<style scoped></style>
