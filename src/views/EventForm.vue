<template>
  <form class="wrapper" @submit.prevent="submit">
    <div>Добавить заказ</div>
    <input
      v-model="inputs.name"
      type="text"
      class="input"
      placeholder="Введите ваше имя"
    />
    <input
      v-model="inputs.address"
      type="text"
      class="input"
      placeholder="Введите ваш адрес"
    />
    <input
      v-model="inputs.comment"
      type="text"
      class="input"
      placeholder="Комметарий"
    />
    <div class="red" v-if="errorMessage">{{ errorMessage }}</div>
    <button type="submit" class="btn">Добавить заказ</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { useEventStore } from "@/store/event/eventStore"
import { useUserStore } from "@/store/user/userStore"
import { OrderStatus } from "@/store/user/types/user"

export default defineComponent({
  name: "EventForm",
  components: {},
  setup() {
    const eventStore = useEventStore()
    const userStore = useUserStore()
    const data = Date.now()

    const inputs = reactive({
      id: Date.now(),
      name: userStore.userData.name,
      address: "",
      date: data.toString(),
      status: OrderStatus.New,
      comment: "",
    })

    const errorMessage = ref("")

    const submit = () => {
      if (inputs.name && inputs.address != "") {
        eventStore.addEvent({ ...inputs })
        inputs.name = ""
        inputs.address = ""
        inputs.comment = ""
        errorMessage.value = ""
      } else {
        errorMessage.value = "Заполните адрес/имя пользователя"
      }
    }

    return { inputs, submit, eventStore, userStore, errorMessage }
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
.red {
  color: #c90c0c;
}
</style>
