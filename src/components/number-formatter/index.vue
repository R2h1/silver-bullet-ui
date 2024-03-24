<template>
  <div class='example-wrap'>
    <NumberFormatter 
      prefix="$ " 
      :decimalScale="4" 
      suffix=" RUB"  
      value="10000000"
      :allowNegative="false"
      thousandSeparator="," 
      fixedDecimalScale />
  </div>
</template>

<script>
import NumberFormatter from "./number-formatter.vue";

export default {
  components: {
    NumberFormatter
  }
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
}
</style>
