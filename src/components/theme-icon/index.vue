<template>
  <div class='example-wrap'>
    <h2>ThemeIcon</h2>
    <h5>使用主题颜色渲染元素内的图标</h5>
    <div>
      <span>默认：</span>
      <ThemeIcon size="xl" variant="default" radius="md"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>
    </div>
    <div>
      <span>渐变：</span>
      <ThemeIcon radius="md" size="xl" variant="gradient" :gradient="{ from: '#228be6', to: '#4c6ef5', deg: 129 }" > 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>
    </div>
    <div>
      <span>填充：</span>
      <ThemeIcon size="xl" radius="md"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>
    </div>
    <div>
      <span>浅色：</span>
      <ThemeIcon size="xl" variant="light" radius="md"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>
    </div>
    <div>
      <span>轮廓：</span>
      <ThemeIcon size="xl" variant="outline" radius="md"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>
    </div>
    <div>
      <span>透明：</span>
      <ThemeIcon size="xl" variant="white"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-heart"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>
      </ThemeIcon>
    </div>
  </div>
</template>

<script>
import ThemeIcon from "./theme-icon.vue";

export default {
  components: {
    ThemeIcon
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
  color: rgba(0, 0, 0, 0.6);
  user-select: none;
}
</style>
