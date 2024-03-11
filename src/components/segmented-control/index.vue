<template>
  <div class='example-wrap'>
    <segmented-control :data="[
        { label: 'React', value: 'react', disabled: true },
        { label: 'Angular', value: 'ng',  },
        { label: 'Vue', value: 'vue',  },
        { label: 'Svelte', value: 'svelte' },
      ]"  :fullWidth="false" color="red" />
  </div>
</template>

<script>
import SegmentedControl from "./segmented-control.vue";

export default {
  components: {
    SegmentedControl,
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
