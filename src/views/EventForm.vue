<template>
  <form class="wrapper" @submit.prevent="submit">
    <div>Добавить заказ</div>
    <div class="mb-3">
      <input
        v-model="inputs.name"
        type="text"
        class="input"
        placeholder="Введите ваше имя"
      />
    </div>
    <div class="mb-3">
      <input
        v-model="inputs.address"
        type="text"
        class="input"
        placeholder="Введите ваш адрес"
      />
    </div>
    <div class="mb-3">
      <input
        v-model="inputs.comment"
        type="text"
        class="input"
        placeholder="Комметарий"
      />
    </div>
    <button type="submit" class="btn">Добавить заказ</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { useEventStore } from "@/store/event/eventStore"
import { useUserStore } from "@/store/user/userStore"
import { OrderStatus } from "@/store/user/types/user"

export default defineComponent({
  name: "EventForm",
  components: {},
  setup() {
    const eventStore = useEventStore()
    const userStore = useUserStore()
    const data = new Date(Date.now())
    const inputs = reactive({
      id: Date.now().toString(),
      date: `${data.getDate()} / ${
        data.getMonth() + 1
      } / ${data.getFullYear()}`,
      name: userStore.userData.name,
      address: "",
      status: OrderStatus.New,
      comment: "",
    })

    const submit = () => {
      eventStore.addEvent({ ...inputs })

      inputs.name = ""
      inputs.address = ""
      inputs.comment = ""
    }

    return { inputs, submit, eventStore, userStore }
  },
})
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 39px 49px 152px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.input {
  width: 162px;
  height: 28px;
  border: none;
  outline: none;
  opacity: 0.5;
  padding-left: 5px;
}
.btn {
  width: 115px;
  height: 25px;
  background: var(--background-secondary);
  border: none;
  outline: none;
}
</style>
