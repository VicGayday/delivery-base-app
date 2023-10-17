import { defineStore } from "pinia"
import { api } from "@/api/api"
import router from "@/router"
import { Event } from "./types/event"
import { OrderStatus } from "../user/types/user"

export const useEventStore = defineStore({
  id: "eventStore",
  state: () => ({
    eventsData: [] as Event[],
  }),

  actions: {
    async getEvents() {
      try {
        const response = await api.get("/events")
        if (!response.data) {
          throw new Error()
        }
        this.eventsData = response.data
      } catch (error) {
        console.error("Navigation failed", error)
      }
    },

    async addEvent(event: Event) {
      try {
        const response = await api.post("/events/", event)
        if (!response.data) {
          throw new Error()
        }
        this.eventsData.push(event)
        await router.go(-1)
      } catch (error) {
        console.error("failed", error)
      }
    },

    async removeEvent(event: Event) {
      try {
        const response = await api.delete(`/events/${event.id}`)
        if (!response.data) {
          throw new Error()
        }
        const i = this.eventsData.findIndex((s: Event) => s.id === event.id)
        if (i > -1) this.eventsData.splice(i, 1)
      } catch (error) {
        console.error("Navigation failed", error)
      }
    },

    async modifyEvent(event: Event) {
      try {
        const response = await api.patch(`/events/${event.id}`, {
          status: OrderStatus.Completed,
        });
        if (!response.data) {
          throw new Error();
        }
        const i = this.eventsData.find((s: Event) => s.id === event.id);
        if (i) {
          i.status = OrderStatus.Completed;
        }
      } catch (error) {
        console.error("Navigation failed", error);
      }
    }
  },
})
