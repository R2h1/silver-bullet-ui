<template>
  <div class='example-wrap'>
    <Table horizontalSpacing="sm" striped highlightOnHover  withTableBorder :stickyHeader="true" :withColumnBorders="true" :data="tableData"></Table>
  </div>
</template>

<script>
import Table from "./table.vue";

export default {
  components: {
    Table,
  },
  data() {
    return {
      tableData: {
        caption: 'Some elements from periodic table',
        head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
        body: [
          [6, 12.011, 'C', 'Carbon'],
          [7, 14.007, 'N', 'Nitrogen'],
          [39, 88.906, 'Y', 'Yttrium'],
          [56, 137.33, 'Ba', 'Barium'],
          [58, 140.12, 'Ce', 'Cerium'],
        ],
        foot: ['Element position', 'Atomic mass', 'Symbol', 'Element name']
      }
    }
  }
}
</script>

<style scoped>
.example-wrap {
  width: 100%;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>
