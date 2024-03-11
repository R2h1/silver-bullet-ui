<template>
  <div class='example-wrap'>
    <center inline> 
      <div style="background: rgba(34, 139, 230, .1)">All elements inside Center are centered</div>
    </center>
  </div>
</template>

<script>
import Center from "./center.vue";

export default {
  components: {
    Center,
  }
}
</script>

<style scoped>
.example-wrap {
  width: 100%;
  margin: 10px 0 0 10px;
  display: block;
}
</style>
