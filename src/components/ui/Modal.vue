<template>
  <div class="modal" v-if="show" @click.stop="close">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Modal",
  emits: ["visible"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    function close() {
      emit("visible", false)
    }
    return {
      close,
    }
  },
})
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.content {
  margin: auto;
}
</style>
