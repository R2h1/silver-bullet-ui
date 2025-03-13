<template>
  <div class="example-wrap">
    <Avatar alt="its me" variant="outline" color="#fa5252">MK</Avatar>
    <AvatarGroup alt="its me" variant="outline" color="#fa5252">
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
      />
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
      />
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
      />
      <Avatar>+5</Avatar>
    </AvatarGroup>
  </div>
</template>

<script>
import Avatar from "./avatar.vue";
import AvatarGroup from "../avatar-group";

export default {
  components: {
    Avatar,
    AvatarGroup,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.example-wrap {
  width: 100%;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>
