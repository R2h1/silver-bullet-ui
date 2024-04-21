<template>
  <div class='example-wrap'>
    <Blockquote>
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-info-circle"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path><path d="M12 9h.01"></path><path d="M11 12h1v4h1"></path></svg>
      Life is like an npm install – you never know what you are going to get.
      <template slot="cite">– Forrest Gump</template>
    </Blockquote>
  </div>
</template>

<script>
import Blockquote from "./blockquote.vue";

export default {
  components: {
    Blockquote
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  width: 273px;
  line-height: 24.8px;
  margin: 30px 0 10px 10px;
}
</style>
