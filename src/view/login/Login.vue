<template>
  <div class="login-wrap">
    <div class="login-wrap-form">
      <div class="login-wrap-title">
        <h1 class="login-wrap-title-greet">欢迎登录</h1>
        <p class="login-wrap-title-name">...平台</p>
      </div>
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item field="name" label="用户名">
          <a-input
            v-model="form.name"
            size="large"
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="post" label="密码">
          <a-input
            v-model="form.post"
            size="large"
          >
          <template #prefix>
            <icon-lock/>
          </template>
        </a-input>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" class="login-wrap-submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";
const form = reactive({
  name: "",
  post: "",
});
const handleSubmit = () => {
  console.log(111);
};
</script>

<style scoped lang="less">
.login-wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  .login-wrap-form {
    width: 400px;
    height: 500px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    padding: 30px;
    box-sizing: border-box;
    .login-wrap-title{
      display: flex;
      margin-bottom: 100px;
      align-items: center;
    }
    .login-wrap-submit{
      width: 100%;
      height: 36px;
    }
  }
}
</style>
