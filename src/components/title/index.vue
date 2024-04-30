<template>
  <div class='example-wrap'>
    <Title >这是一个h1标题</Title>
    <Title :order="2" >这是一个h2标题</Title>
    <Title :order="3" >这是一个h3标题</Title>
    <Title :order="4" >这是一个h4标题</Title>
    <Title :order="5" >这是一个h5标题</Title>
    <Title :order="6" >这是一个h6标题`</Title>

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
