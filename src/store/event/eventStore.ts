import { defineStore } from "pinia"
import { api } from "@/api/api"
import router from "@/router"
import { Event, SortOrder, EventSortField } from "./types/event"
import { OrderStatus } from "../user/types/user"
import format from "date-fns/format"
import { ru } from "date-fns/locale"

export const useEventStore = defineStore({
  id: "eventStore",
  state: () => ({
    eventsData: [] as Event[],
    sort: EventSortField.ADDRESS,
    order: "asc" as SortOrder,
    isLoading: false,
  }),

  actions: {
    async getEvents() {
      try {
        const response = await api.get("/events")
        if (!response.data) {
          throw new Error()
        }
        const res = response.data
        this.eventsData = res.map((item: any) => {
          const strDate = format(item.date, "dd MMMM yyyy k:mm", { locale: ru })
          return { ...item, date: strDate }
        })
      } catch (error) {
        console.error("Navigation failed", error)
      }
    },

    async addEvent(event: Event) {
      const eventBD = { ...event, date: parseInt(event.date) }

      try {
        const response = await api.post("/events/", eventBD)
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
        })
        if (!response.data) {
          throw new Error()
        }
        const i = this.eventsData.find((s: Event) => s.id === event.id)
        if (i) {
          i.status = OrderStatus.Completed
        }
      } catch (error) {
        console.error("Navigation failed", error)
      }
    },

    async sortEvents() {
      this.isLoading = true
      try {
        const response = await api.get("/events", {
          params: {
            _sort: this.sort,
            _order: this.order,
          },
        })
        const res = response.data
        this.eventsData = res.map((item: any) => {
          const strDate = format(item.date, "dd MMMM yyyy k:mm", { locale: ru })
          return { ...item, date: strDate }
        })
        this.isLoading = false

        if (!response.data) {
          throw new Error()
        }
      } catch (error) {
        console.error("Navigation failed", error)
      }
    },

    setSort(sort: EventSortField) {
      this.sort = sort
    },

    setOrder(order: SortOrder) {
      this.order = order
    },
  },
})
