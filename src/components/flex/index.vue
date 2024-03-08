<script setup lang="ts">
import Flex from "./flex.vue";

</script>

<template>
  <div class='example-wrap'>
    <Flex > 
      <button >button1</button>
      <button >button2</button>
      <button >button3</button>
    </Flex>
    <Flex justify="center" >
      <button >button1</button>
      <button >button2</button>
      <button >button3</button>
    </Flex>
    <Flex justify="between" >
      <button >button1</button>
      <button >button2</button>
      <button >button3</button>
    </Flex>
    <Flex justify="end" >
      <button >button1</button>
      <button >button2</button>
      <button >button3</button>
    </Flex>
    <Flex wrap="wrap" :space="[20, 1000]"> 
      <button >button1</button>
      <button >button2</button>
      <button >button3</button>
    </Flex>
    <Flex wrap align="start">
      <button >button1</button>
      <button >button2</button>
      <button >button3</button> 
    </Flex>
    <Flex style="height: 100px;" justify="center" :space="20" >
      <button >button1</button>
      <button >button2</button>
      <button >button3</button> 
    </Flex>
  </div>
</template>


<style scoped>
.example-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
