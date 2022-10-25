<template>
  <h2 @click="handlePathHome">首页</h2>
  <h2 @click="handlePathGoods">商品页</h2>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

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
