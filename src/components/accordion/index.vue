<template>
  <div class='example-wrap'>
    <Accordion v-model="value" :data="groceries" >这是一个 accordion 组件</Accordion>
  </div>
</template>

<script>
import Accordion from "./accordion.vue";

export default {
  components: {
    Accordion,
  },
  data() {
    return {
      groceries: [
        {
          emoji: '🍎',
          value: 'Apples',
          description:
            'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
        },
        {
          emoji: '🍌',
          value: 'Bananas',
          description:
            'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
        },
        {
          emoji: '🥦',
          value: 'Broccoli',
          description:
            'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
        },
      ],
      value: 'Apples'
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
