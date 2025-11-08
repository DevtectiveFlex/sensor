<script setup lang="ts">
import GameCard from './components/game-card.vue';
</script>

<template>
  <GameCard :stats="{
    health: 20,
    power: 12,
  }" 
  image="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2FjMm9ka2NqazdzY3Vvb3d0bDVqcWttemd1MThkdTc3dTUxcjJ3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gIsyGoDfDi4TSf7SsY/giphy.gif" 
  description="lorem ru" />
</template>
