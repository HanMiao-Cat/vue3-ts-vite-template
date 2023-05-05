<template>
  <div class="login-wrap">
    <div class="login-wrap-form">
      <div class="login-wrap-title">
        <h1 class="login-wrap-title-greet">欢迎登录</h1>
      </div>
      <a-form
        ref="formRef"
        :model="form"
        label-align="left"
        auto-label-width
        :rules="rules"
        @submit-success="handleSubmit"
      >
        <a-form-item field="name" label="用户名">
          <a-input v-model="form.name" size="large">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="passWord" label="密码">
          <a-input-password v-model="form.passWord" autocomplete size="large">
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-button
          html-type="submit"
          class="login-wrap-submit"
          :type="buttonDisable === false ? 'primary' : undefined"
          :disabled="buttonDisable"
          >登录</a-button
        >
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
import { Notification } from '@arco-design/web-vue';
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const form = reactive<Params.login>({
  name: 'admin',
  passWord: '123456',
});

const rules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const buttonDisable = computed(() => {
  let flag = false;
  let key: keyof Params.login;
  for (key in form) {
    if (!form[key]) {
      flag = true;
    }
  }
  return flag;
});

const handleSubmit = async () => {
  await userStore._GetLogin(form);
  Notification.success({
    title: `登录成功`,
    content: `欢迎回来！${form.name}`,
  });
  setTimeout(() => {
    router.push('/home');
  }, 800);
};
</script>

<style scoped lang="less">
.login-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;

  .login-wrap-form {
    position: absolute;
    top: 50%;
    right: 20%;
    box-sizing: border-box;
    width: 400px;
    height: 400px;
    padding: 36px;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    transform: translateY(-50%);

    .login-wrap-title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 50px;
      color: rgb(var(--arcoblue-6));
    }

    .login-wrap-submit {
      width: 100%;
      height: 36px;
      margin-top: 20px;
    }
  }
}
</style>
