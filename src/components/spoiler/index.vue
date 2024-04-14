<template>
  <div class='example-wrap'>
    <Spoiler v-model="visible" hideLabel="收起" showLabel="点击查看详情">
      We Butter the Bread with Butter was founded in 2007 by Marcel Neumann, who was originally guitarist for Martin Kesici's band, and Tobias Schultka. The band was originally meant as a joke, but progressed into being a more serious musical duo. The name for the band has no particular meaning, although its origins were suggested from when the two original members were driving in a car operated by Marcel Neumann and an accident almost occurred. Neumann found Schultka "so funny that he briefly lost control of the vehicle." Many of their songs from this point were covers of German folk tales and nursery rhymes.
    </Spoiler>
  </div>
</template>

<script>
import Spoiler from "./spoiler.vue";

export default {
  components: {
    Spoiler
  },
  data() {
    return {
      visible: false,
    }
  },
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  width: 278px;
  margin: 30px 0 10px 10px;
  display: flex;
  align-items: center;
}
</style>
