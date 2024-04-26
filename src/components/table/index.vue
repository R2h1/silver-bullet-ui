<template>
  <div class='example-wrap'>
    <Table ></Table>
  </div>
</template>

<script>
import Table from "./table.vue";

export default {
  components: {
    Table,
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
