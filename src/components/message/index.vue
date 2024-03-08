<template>
  <button @click="handleClick">发布</button>
</template>

<script>
import { YtMessage } from ".";
export default {
  data() {
    return {
    }
  },
  methods: {
    handleClick() {
      YtMessage('success', {
        message: '发布成功',
      }, 0)
    }
  }
}
</script>

<style>

</style>