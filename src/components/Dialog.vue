<template>
  <div class="dialog-wrapper">
    <div>Вы действительно хотите удалить заказ?</div>
    <div class="dialog">
      <div class="dialog-option">
        <input
          id="radio-1"
          type="radio"
          name="radio"
          value="1"
          @change="emit('answer', true)"
        />
        <label for="radio-1">OK</label>
      </div>
      <div class="dialog-option">
        <input
          id="radio-2"
          type="radio"
          name="radio"
          value="2"
          @change="emit('answer', false)"
        />
        <label for="radio-2">Отмена</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Dialog",
  emits: ["answer"],
  setup(props, { emit }) {
    return {
      emit,
    }
  },
})
</script>
<style scoped>
.dialog-wrapper {
  width: 335px;
  height: 215px;
  background-color: var(--background-primary);
  padding: 63px 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
.dialog {
  display: flex;
  gap: 55px;
}
.dialog-option {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 27px;
  background-color: var(--background-input);
}

.dialog input[type="radio"] {
  display: none;
}
.dialog-option label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.dialog input[type="radio"]:checked + label {
  opacity: 1;
  padding-bottom: 2px;
  border-bottom: 2px solid var(--background-primary);
}
</style>
