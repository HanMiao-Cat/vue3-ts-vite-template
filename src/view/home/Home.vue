<template>
  <h2 @click="handlePathHome">首页</h2>
  <h2 @click="handlePathGoods">商品页</h2>
  <div></div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../../store/user';

  const router = useRouter();
  const userInfo = useUserStore();
  console.log(userInfo.getToken)

  const handlePathHome = () => {
    console.log(router)
    router.push('/home')
  }
  const handlePathGoods = () => {
    router.push('/goods')
  }
</script>


<style lang="less">

</style>