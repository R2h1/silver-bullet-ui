<template>
  <table :data-with-table-border="withTableBorder" :class="`${prefixClass}`" :style="styles">
    <caption data-with-side="bottom" :class="`${prefixClass}__caption`">{{data.caption}}</caption>
    <thead :data-with-sticky="stickyHeader" :class="`${prefixClass}__thead`">
      <tr :data-with-row-border="withRowBorders" :class="`${prefixClass}__tr`">
        <th :data-with-column-border="withColumnBorders" :class="`${prefixClass}__th`" v-for="(th, index) in data.head" :key="index">{{th}}</th>
      </tr>
    </thead>
    <tbody :class="`${prefixClass}__tbody`">
      <tr :data-striped="striped" :data-hover="highlightOnHover" :data-with-row-border="withRowBorders" :class="`${prefixClass}__tr`" v-for="(tr, index1) in data.body" :key="index1">
        <td :data-with-column-border="withColumnBorders" :class="`${prefixClass}__td`" v-for="(td, index2) in tr" :key="index2">{{td}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr :data-with-row-border="withRowBorders" :class="`${prefixClass}__tr`">
        <th :data-with-column-border="withColumnBorders" :class="`${prefixClass}__th`" v-for="(th, index) in data.foot" :key="index">{{th}}</th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import props from './props.js';

const SPACE_MAP = {
  'xs': 10,
  'sm': 12,
  'md': 16,
  'lg': 20,
  'xl': 32,
}

export default {
  name: 'sb-table',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-table',
    }
  },
  computed: {
    styles() {
      const style = {
        '--table-sticky-header-offset': `${this.stickyHeaderOffset}px`,
        '--table-vertical-spacing': `${SPACE_MAP[this.verticalSpacing] || this.verticalSpacing}px`,
        '--table-horizontal-spacing': `${SPACE_MAP[this.horizontalSpacing] || this.horizontalSpacing}px`,
      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
