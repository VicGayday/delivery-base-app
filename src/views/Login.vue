<template>
  <form @submit.prevent="submit">
   <input type="text" v-model.trim="ruleForm.username">
   <input type="text" v-model.trim="ruleForm.password">
   <button type="submit">Войти</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
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
    const isValid = computed(() => {
     return ruleForm.password.length >= 8 && ruleForm.username !== ''
    })
    const submit = async () => {
      if (isValid.value) {
        try {
          await router.push('/main');
        } catch (error) {
          console.error('Navigation failed', error);
        }
      }
    };

    return {
      authStore,
      submit,
      ruleForm,
      isValid,
    }
  }
});
</script>
