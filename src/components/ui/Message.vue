<template>
  <div v-if="message">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "Loader",
  props: ["msg"],
  setup(props) {
    const message = props.msg

    return {
      message,
    }
  },
})
</script>

<style scoped></style>
