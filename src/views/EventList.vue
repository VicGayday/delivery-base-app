<template>
  <div class="wrapper">
    <div class="table center" v-if="isLoading"><Loader /></div>
    <div class="table" v-else>
      <Modal :show.sync="visible">
        <Dialog @answer="handleAnswer" />
      </Modal>

      <div class="row">
        <div class="box num">№</div>
        <div class="box">Имя клиента</div>
        <div class="box">Адрес<Spin sort="address" /></div>
        <div class="box">Дата заказа<Spin sort="date" /></div>
        <div class="box">Статус</div>
        <div class="box">Комментарий</div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div
        v-for="(event, index,) in list"
        :key="event.id"
        class="row"
        :class="{ completed: event.status === OrderStatus.Completed }"
      >
        <div class="box">{{ index + 1 }}</div>
        <div class="box">{{ event.name }}</div>
        <div class="box small">{{ event.address }}</div>
        <div class="box">{{ event.date }}</div>
        <div class="box">{{ event.status }}</div>
        <div class="box">{{ event.comment }}</div>
        <div class="col">
          <button class="btn" v-if="isAdmin" @click="onRemove(event)">
            <SvgImage1 />
          </button>
        </div>
        <div class="col">
          <button
            class="btn"
            v-if="isAdmin && event.status === OrderStatus.New"
            @click="markAsDone(event)"
          >
            <SvgImage2 />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue"

import { useEventStore } from "@/store/event/eventStore"
import { useUserStore } from "@/store/user/userStore"
import SvgImage1 from "@/components/svg/SvgImage1.vue"
import SvgImage2 from "@/components/svg/SvgImage2.vue"
import { Event } from "@/store/event/types/event"
import Loader from "@/components/ui/Loader.vue"
import Modal from "@/components/ui/Modal.vue"
import Dialog from "@/components/Dialog.vue"
import Spin from "@/components/Spin.vue"
import { OrderStatus } from "@/store/user/types/user"

export default defineComponent({
  name: "EventList",
  components: { SvgImage1, SvgImage2, Loader, Modal, Dialog, Spin },
  setup() {
    const currentCustomer = ref<Event | null>(null)
    const visible = ref(false)
    const isLoading = ref(false)

    const eventStore = useEventStore()
    const userStore = useUserStore()
    const list = computed(() => eventStore.eventsData)
    const isAdmin = computed(() => userStore.userData.role === "ADMIN")

    onMounted(async () => {
      isLoading.value = true
      await eventStore.getEvents()
      isLoading.value = false
    })

    async function onRemove(item: Event) {
      if (item !== null) {
        currentCustomer.value = item
        visible.value = true
      }
    }

    async function markAsDone(item: Event) {
      if (item !== null && item.status === OrderStatus.New) {
        await eventStore.modifyEvent(item)
      }
    }

    async function handleAnswer(answer: boolean) {
      if (answer && currentCustomer.value !== null) {
        await eventStore.removeEvent(currentCustomer.value)
      }
      visible.value = false
    }

    function close() {
      visible.value = false
    }

    return {
      eventStore,
      userStore,
      list,
      onRemove,
      markAsDone,
      isLoading,
      visible,
      close,
      currentCustomer,
      handleAnswer,
      isAdmin,
      OrderStatus,
    }
  },
})
</script>
<style scoped>
.table {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 17px 49px 152px;
  margin: 0 auto;
  height: 100%;
}
.center {
  align-items: center;
  justify-content: center;
}
.row {
  display: flex;
}
.row:last-child .box {
  border-bottom: 1px solid var(--text-primary);
}
.box {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  border: 1px solid var(--text-primary);
  border-bottom: none;
  padding: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 16px;
}
.small {
  font: var(--font-s);
}
.box:nth-child(1) {
  flex-basis: 64px;
}

.box:nth-child(2) {
  border-left: 0;
  flex-basis: 163px;
}

.box:nth-child(3) {
  border-left: 0;
  flex-basis: 119px;
}
.box:nth-child(4) {
  border-left: 0;
  flex-basis: 147px;
}

.box:nth-child(5) {
  border-left: 0;
  flex-basis: 88px;
}
.box:nth-child(6) {
  border-left: 0;
  flex-basis: 162px;
}

.completed {
  color: rgba(0, 0, 0, 0.25);
}
.btn {
  width: 18px;
  height: 17px;
  background-color: transparent;
  border: none;
}
.col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 28px;
}
</style>
