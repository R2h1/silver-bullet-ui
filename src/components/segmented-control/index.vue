<script setup lang="ts">
import SegmentedControl from "./segmented-control.vue";

</script>

<template>
  <div class='example-wrap'>
    <segmented-control :data="['React1', 'React2', 'React3']" orientation="horizontal"/>
  </div>
</template>

<style scoped>
.example-wrap {
  width: 100%;
  display: block;
}
</style>
