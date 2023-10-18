<template>
  <div class="wrapper">
    <div class="form center" v-if="isLoader"><Loader /></div>

    <form class="form" v-else @submit.prevent="submit">
      <div class="auth-error-warning" v-if="showMessage"><Message :msg="errorMsg" /></div>
      <p class="auth-error-warning" v-if="isDataError">Убедитесь, что вы заполнили имя пользователя и/или пароль содержит не менее 8 символов</p>
      <input
        type="text"
        class="input"
        placeholder="username"
        v-model.trim="ruleForm.username"
      />
      <input
        type="text"
        class="input"
        placeholder="password"
        v-model.trim="ruleForm.password"
      />
      <button class="btn" type="submit">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue"
import { useLoginStore } from "@/store/login/loginStore"
import { useUserStore } from "@/store/user/userStore"
import Loader from "@/components/ui/Loader.vue"
import Message from "@/components/ui/Message.vue"

export default defineComponent({
  name: "LoginForm",
  components: { Loader, Message },
  async setup() {
    const loginStore = useLoginStore()
    const userStore = useUserStore()

    const ruleForm = reactive({
      username: "",
      password: "",
      isLoading: true,
      error: "",
    })
     const isDataError = ref(false)
     const showMessage = ref(false)

    const isValid = computed(() => {
      return ruleForm.password.length >= 8 && ruleForm.username !== ""
    })
    const errorMsg = computed(() => {
      if (loginStore.loginData?.error) {
        return loginStore.loginData.error
      } else {
        return ""
      }
    })
    const isLoader = computed(() => {
      if (loginStore.loginData?.isLoading) {
        return true
      } else {
        return false
      }
    })

    async function submit() {
      isDataError.value = false;
      showMessage.value = false;
      if (isValid.value) {
        await loginStore.setLogin(ruleForm)
        userStore.initAuthData()
        if (loginStore.loginData?.error) {
        showMessage.value = true;
      } else {
        showMessage.value = false;
      }
      }
      else {
        isDataError.value = true;
      }

    }
    return {
      submit,
      ruleForm,
      isValid,
      loginStore,
      userStore,
      errorMsg,
      isLoader,
      isDataError,
      showMessage,
    }
  },
})
</script>
<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 171px 49px 152px;
}
.form {
  width: 344px;
  height: 245px;
  background: var(--background-secondary);
  padding: 57px;
  padding-left: 38px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.center {
  align-items: center;
}
.input {
  width: 180px;
  height: 34px;
  background: var(--background-input);
  outline: none;
  border: none;
  padding: 0 10px;
}
.btn {
  width: 104px;
  height: 29px;
  background: var(--background-input);
  margin-left: 94px;
  border: none;
}
.auth-error-warning {
  color: #c90c0c;
}
</style>
