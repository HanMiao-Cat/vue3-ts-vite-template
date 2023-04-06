<template>
  <div class="home-wrap">
    <div class="header-content">
      <HeaderTable />
    </div>
    <Table />
  </div>
</template>

<script setup lang="ts">
import HeaderTable from './components/headerTable.vue';
import Table from './components/table.vue';
</script>

<style lang="less">
.home-wrap {
  .header-content {
    width: 60%;
  }
}
</style>
