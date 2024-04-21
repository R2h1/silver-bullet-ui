<template>
  <button @click="handleClick">发布</button>
</template>

<script>
import MessageList from './messageList.vue';

export default {
  components: {
    MessageList
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick() {
      this.$message.success({
        message: '发布成功',
        duration: 0,
        closable: true,
      })
    }
  }
}
</script>

<style>

</style>