<template>
  <div class='example-wrap'>
    <List withPadding size="md" :center="true">
      <list-item>
      <ThemeIcon slot="icon" radius="md" size="md" variant="gradient" :gradient="{ from: '#228be6', to: '#4c6ef5', deg: 129 }" > 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>Clone or download repository from GitHub</list-item>
      <list-item ><ThemeIcon slot="icon" radius="md" size="md" variant="gradient" :gradient="{ from: '#228be6', to: '#4c6ef5', deg: 129 }" > 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>Install dependencies with yarn</list-item>
    </List>
  </div>
</template>

<script>
import List from "./list.vue";
import ListItem from './list-item.vue';
import ThemeIcon from '../theme-icon/theme-icon.vue'

export default {
  components: {
    List,
    ListItem,
    ThemeIcon
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
