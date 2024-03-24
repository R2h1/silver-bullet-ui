<template>
  <div class='example-wrap'>
    <YtText :decoration="'underline'" inline>dsfdfs</YtText>
    <YtText 
      :size="16"
      :decoration="'line-through'"
      variant="gradient" 
      :gradient="{ from: 'blue', to: 'cyan', deg: 90 }">From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are visible in the upper jaw when its mouth is open. Each of its thick legs ends with three sharp claws. On Bulbasaur's back is a green plant bulb, which is grown from a seed planted there at birth. The bulb also conceals two slender, tentacle-like vines and provides it with energy through photosynthesis as well as from the nutrient-rich seeds contained within.</YtText>
  </div>
</template>

<script>
import YtText from "./text.vue";

export default {
  components: {
    YtText
  }
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  max-width: 400px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
}
</style>
