<template>
  <div class='example-wrap'>
    <Highlight :highlight="highlight" :highlightStyles="highlightStyles">  
      You can change styles of highlighted part if you do not like default styles
    </Highlight>
  </div>
</template>

<script>
import Highlight from "./highlight.vue";

export default {
  components: {
    Highlight
  },
  data() {
    return {
      highlight: ['highlighted', 'default'],
      highlightStyles: {
        backgroundImage:
          'linear-gradient(45deg, #22b8cf, #5c7cfa)',
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    }
  },
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  margin: 30px 0 10px 10px;
}
</style>
