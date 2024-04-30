<template>
  <div class='example-wrap'>
    <Title >1</Title>
    <Title :order="2" >2</Title>
    <Title :order="3" >3</Title>
    <Title :order="4" >4</Title>
    <Title :order="5" >5</Title>
    <Title :order="6" >6`</Title>

    <Title :order="3" size="h1" >H3 heading with h1 font-size</Title>
    <Title :order="3" :textWrap="'wrap'">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatibus inventore iusto cum dolore molestiae perspiciatis! Totam repudiandae impedit maxime!</Title>
    <Title :order="2" :lineClamp="2" >  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo
        amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur
        non repudiandae enim adipisci?</Title>
  </div>
</template>

<script>
import Title from "./title.vue";

export default {
  components: {
    Title,
  },
  data() {
    return {
      
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
