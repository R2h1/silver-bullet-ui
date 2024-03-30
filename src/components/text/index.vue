<template>
  <div class='example-wrap'>
    <!-- <YtText :lineClamp="1" showTips :decoration="'underline'" inline> bulb</YtText> -->
    <YtText 
      :size="16"
      verticalCenter
      :decoration="'line-through'"
      variant="gradient"
      :lineClamp="2"
      :tipText="'打发打发士大夫士大夫士大111111夫士大11夫士大11夫士大111111111111'"
      :showTips="true"
      :gradient="{ from: 'blue', to: 'cyan', deg: 90 }">打发打发士大夫士大夫士夫士大11夫士大11夫士大11夫士大111111111111111111</YtText>
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
  width: 319px;
  padding: 10px 16px;
  display: flex;
  gap: 30px;
  align-items: center;
}
</style>
