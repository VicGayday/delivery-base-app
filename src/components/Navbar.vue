<template>
  <div class="navbar">
    <ul class="nav">
      <li class="nav-item">
        <router-link to="/events">Все заказы</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/events/new">Добавить заказ</router-link>
      </li>
    </ul>

    <span class="profile">{{ profile }}</span>
    <button class="button" @click="onLogout">Выйти</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import { useLoginStore } from "@/store/login/loginStore"
import { useUserStore } from "@/store/user/userStore"

export default defineComponent({
  name: "Navbar",
  components: {},

  async setup() {
    const loginStore = useLoginStore()
    const userStore = useUserStore()
    const profile = computed(() => userStore.userData.name)

    onMounted(() => {
      userStore.initAuthData()
    })
    function onLogout() {
      loginStore.logout()
    }

    return {
      onLogout,
      loginStore,
      userStore,
      profile,
    }
  },
})
</script>

<style scoped>
.navbar {
  width: 100%;
  height: var(--navbar-height);
  background: var(--background-navbar);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 22px;
  padding-right: 15px;
}
.button {
  width: 78px;
  height: 27px;
  background: var(--background-secondary);
  border: none;
}
.nav {
  display: flex;
  gap: 38px;
  margin-right: auto;
}

.nav-item a {
  color: var(--text-secondary);
}
.profile {
  margin-right: 15px;
}
</style>
