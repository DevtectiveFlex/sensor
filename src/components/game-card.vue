<script setup lang="ts">
import { ref } from 'vue';
import { useCardMethods } from '../composables/useCardMethods';

defineProps<{
  image: string;
  description: string;
  stats: {
    health: number | string;
    power: number | string;
  }
}>()
const card = ref<null | HTMLElement>(null);

const {
  cardSettings,
  cardRotateHandler,
  cardDragHandler,
  dragStartHandler,
  resetRotation,
} = useCardMethods(card);
</script>

<template>
  <div
    ref="card"
    class="game-card"
    :style="{
      '--shadow-angle': cardSettings.shadowAngle,
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
        <img
          :src="image"
          draggable="false"
          width="200"
          height="200"
        />
      </div>
      <div class="card__text">{{ description }}</div>
      <div class="card__stat card__stat_power">{{stats.power}}</div>
      <div class="card__stat card__stat_health">{{stats.health}}</div>
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
  transition:
    transform 1s ease,
    box-shadow 1s ease;
  transform: var(--rotate-angle);
  cursor: grab;
  user-select: none;
}

.game-card:hover {
  transition:
    transform 0.01s ease,
    box-shadow 0.01s ease;
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
  top: 30px;
  left: 0;

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
  height: 75%;

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

.card__stat {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  
  width: 50px;
  height: 50px;

  font-size: 24px;
  font-weight: 700;
  background-color: gray;
  border-radius: 50%;
}

.card__stat_power {
  position: absolute;
  bottom: -25px;
  left: -25px;

  background-color: rgba(238, 201, 78, 0.8);
  color: white;
}
.card__stat_health {
  position: absolute;
  bottom: -25px;
  right: -25px;

  background-color: rgba(240, 44, 44, 0.8);
  color: white;
}
</style>
