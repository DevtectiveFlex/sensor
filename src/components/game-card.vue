<script setup lang="ts">

import {  reactive, ref } from 'vue';

  const card = ref<null | HTMLElement>(null);
  const cardSettings = reactive({
    rotateAngle: 'rotateX(0deg) rotateY(0deg)',
    transitionStyle: 'transform 0.1s ease-out',
    shadowAndle:'0px 10px 4px rgba(0,0,0, 0.25)',
  })

  function cardRotateHandler(event: MouseEvent): void {
    if (card.value === null) {
      console.log('canseled') 
      return;
    }
    const rect = card.value.getBoundingClientRect();
    
    const y = event.clientY - rect.top - rect.height / 2;
    const x = event.clientX - rect.left - rect.width / 2;

    const rotateX = y * 1.5 / 5;
    const rotateY = -x / 2.5;

    cardSettings.transitionStyle = 'transform 0.1s ease-out';
    cardSettings.rotateAngle = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    cardSettings.shadowAndle = `${rotateY / 2}px ${-rotateX / 2}px 4px rgba(0,0,0, 0.25)`
  }

  function resetRotation(): void {
    cardSettings.transitionStyle = 'transform 1s ease, box-shadow 1s ease';
    cardSettings.rotateAngle = 'rotateX(0deg) rotateY(0deg)';
    cardSettings.shadowAndle = '0px 10px 4px rgba(0,0,0, 0.25)';
  }

  function cardDragHandler(event: DragEvent): void {
    console.log(event.clientX)
  }
</script>

<template>
  <div
    ref="card"
    class="game-card"
    :style="{
      '--shadow-angle': cardSettings.shadowAndle,
      '--rotate-angle': cardSettings.rotateAngle,
      '--transition-style': cardSettings.transitionStyle,
    }"
    draggable="true"
    @mousemove="cardRotateHandler" 
    @mouseout="resetRotation"
    @dragstart="cardDragHandler"
  >
  </div>
</template>

<style scoped>
  .game-card {
    width: 200px;
    height: 300px;
    background: linear-gradient( to left top, #242424, #FFFFFF);
    border-radius: 10px;
    box-shadow: var(--shadow-angle);
    transition: transform 1s ease, box-shadow 1s ease;
    transform: var(--rotate-angle);
    cursor: grab;
  }

  .game-card:hover {
    transition: transform 0.01s ease, box-shadow 0.01s ease;
  }

  .eye {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 25%;
    border-radius: 50%;
    background-color: white;
  }

  .eye-ball {
    width: 25%;
    height: 50%;
    background-color: black;
    border-radius: 50%;
    margin: 0 auto;

  }
</style>