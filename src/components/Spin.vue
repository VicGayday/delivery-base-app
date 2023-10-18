<template>
  <div class="spin">
    <button class="btn" @click="sortAsc"><ArrowUp /></button>

    <button class="btn" @click="sortDesc"><ArrowDown /></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useEventStore } from "@/store/event/eventStore"

import ArrowUp from "./svg/ArrowUp.vue"
import ArrowDown from "./svg/ArrowDown.vue"

export default defineComponent({
  name: "Spin",
  components: { ArrowUp, ArrowDown },
  props: ["sort"],
  async setup(props) {
    const eventStore = useEventStore()

    async function sortAsc() {
      eventStore.setSort(props.sort)
      eventStore.setOrder("asc")
      await eventStore.sortEvents()
    }

    async function sortDesc() {
      eventStore.setSort(props.sort)
      eventStore.setOrder("desc")
      await eventStore.sortEvents()
    }
    return {
      sortAsc,
      sortDesc,
    }
  },
})
</script>
<style scoped>
.spin {
  display: flex;
  flex-direction: column;
}
.btn {
  border: none;
  width: 18px;
  height: 15px;
  background-color: transparent;
}
.btn:hover {
  background-color: var(--background-secondary);
}
</style>
