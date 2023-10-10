<template>
  <form @submit.prevent="submit">
   <input type="text" v-model.trim="ruleForm.username">
   <input type="text" v-model.trim="ruleForm.password">
   <button type="submit">Войти</button>
   <p class="auth-error-warning" v-if="isAuthError">Неправильный логин или/и пароль. Проверьте введенные данные</p>
   <p class="auth-error-warning" v-if="isDataError">Убедитесь, что вы заполнили имя пользователя и/или пароль содержит не менее 8 символов</p>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/AuthStore';
import router from '@/router';

export default defineComponent({
  name: 'Login',
  components: {
  },
  async setup() {
    const authStore = useAuthStore();
     const ruleForm = reactive({
        username: "",
        password: "",
    });
    const isAuthError = ref(false);
    const isDataError = ref(false);
    const isValid = computed(() => {
     return ruleForm.password.length >= 8 && ruleForm.username !== ''
    })
    const submit = async () => {
      isDataError.value = false;
      isAuthError.value = false;
      if (isValid.value) {
        try {
          const response = await axios.post('http://localhost:8000/login', {
            username: ruleForm.username,
            password: ruleForm.password
          });
          if (response.data.user === ruleForm.username && response.data.password === ruleForm.password) {
            await router.push('/main');
          }
        } catch (error) {
          isAuthError.value = true;
          console.error('Navigation failed', error);
        }
      } else {
        isDataError.value = true;
      }
    };

    return {
      authStore,
      submit,
      ruleForm,
      isValid,
      isAuthError,
      isDataError,
    }
  }
});
</script>

<style scoped>
  .auth-error-warning {
    color: #c91111;
  }
</style>
