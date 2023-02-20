<template>
  <div class="home-content">
    <canvas ref="myCanvas" style="border: 1px solid #ccc"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const myCanvas = ref<HTMLCanvasElement>();
const init = () => {
  if (myCanvas.value) {
    const nxt = myCanvas.value.getContext("2d") as CanvasRenderingContext2D;
    // nxt.moveTo(50, 50);
    // nxt.lineTo(250, 50);
    // nxt.lineWidth = 20;
    // nxt.strokeStyle = "pink";
    // nxt.lineCap = "round";
    // nxt.stroke();

    // beginPath: 重新开启一条线段，不然第二条线段会影响第一条线段样式
    // nxt.beginPath();
    // nxt?.moveTo(50, 120.5);
    // nxt?.lineTo(250, 120.5);
    // nxt.lineWidth = 4;
    // nxt.strokeStyle = "red";
    // nxt.lineCap = "butt";
    // nxt?.stroke();


    // 折线
    // nxt.moveTo(20, 120);
    // nxt.lineTo(50, 50);
    // nxt.lineTo(100, 100);
    // nxt.lineTo(200, 20);
    // nxt.lineTo(250, 100);
    // nxt.stroke();

    // 描边矩形
    // nxt.strokeStyle = 'pink';
    // nxt.strokeRect(50, 30, 200, 80);

    // 填充矩形
    nxt.fillStyle = 'pink';
    nxt.fillRect(50, 30, 200, 80);
  }
};
onMounted(() => {
  init();
});
</script>

<style lang="less"></style>
