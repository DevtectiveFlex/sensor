<script setup lang="ts">

import {  reactive, ref } from 'vue';

  const card = ref<null | HTMLElement>(null);
  const cardSettings = reactive({
    rotateAngle: 'rotateX(0deg) rotateY(0deg)',
    transitionStyle: 'transform 0.1s ease-out',
    shadowAndle:'0px 10px 4px rgba(0,0,0, 0.75)',
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
    cardSettings.rotateAngle = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.3)`;
    cardSettings.shadowAndle = `${rotateY / 2}px ${-rotateX / 2}px 4px rgba(0,0,0, 0.75)`
  }

  function resetRotation(): void {
    cardSettings.transitionStyle = 'transform 1s ease, box-shadow 1s ease';
    cardSettings.rotateAngle = 'rotateX(0deg) rotateY(0deg)';
    cardSettings.shadowAndle = '0px 10px 4px rgba(0,0,0, 0.25)';
  }

  function cardDragHandler(event: DragEvent): void {
    if (card.value) {
      console.table({x: event.clientX, y: event.clientY})
      card.value.style.position = 'absolute';
      card.value.style.left = `${event.clientX - 140}px`;
      card.value.style.top = `${event.clientY - 190}px`;
    }
  }

  function dragStartHandler(event: DragEvent): void {
    const img = new Image();
    img.src =
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";
    event.dataTransfer?.setDragImage(img, 0, 0);
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
    @dragover.prevent="cardDragHandler"
    @dragstart="dragStartHandler"
  >
    <div class="card__content">
      <div class="card__portrait">
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2FjMm9ka2NqazdzY3Vvb3d0bDVqcWttemd1MThkdTc3dTUxcjJ3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gIsyGoDfDi4TSf7SsY/giphy.gif" draggable="false"  width="200" height="200">
      </div>
      <div class="card__text">Lorem ipsum dolor sit amet.</div>
    </div>
  </div>
</template>

<style scoped>
  .game-card {
    aspect-ratio: 2/3;
    padding: 15px;
    background-image: url('../assets/card-back--dark.jpg');
    background-size: cover;
    border-radius: 10px;
    box-shadow: var(--shadow-angle);
    transition: transform 1s ease, box-shadow 1s ease;
    transform: var(--rotate-angle);
    cursor: grab;
    user-select: none;
  }

  .game-card:hover {
    transition: transform 0.01s ease, box-shadow 0.01s ease;
    z-index: 9999;
    border: 2px solid #928181;
  }

  .card__content {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px;
    
  }
  .card__portrait {
    position: relative;
    top: -25px;

    flex-shrink: 0;

    width: 180px;
    height: 180px;
    border-radius: 10px;
    overflow: hidden;
  }

  .card__portrait img {
    position: relative;
    top: 0;

    width: 75%;
    height: 100%;
    
    border-radius: 50%;
  }

  .card__text {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px;

    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.25);

    overflow: hidden;
  }
</style>