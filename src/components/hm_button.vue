<template>
  <div
    class="btn"
    :class="{
      success: type == 'success',
      danger: type == 'danger',
      primary: type == 'primary',
    }"
    @click="login"
  >
    <slot>登录</slot>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String },
  },
  methods: {
    login(e) {
      // console.log("click", e);
      // 子传父
      this.$emit("clicks", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 314 * 100vw/360;
  height: 50px;
  background-color: rgb(172, 172, 172);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  margin: 0 auto;
}
.success {
  background-color: rgb(43, 255, 0);
  color: #fff;
}
.danger {
  background-color: rgb(255, 30, 0);
  color: #fff;
}
.primary {
  background-color: rgb(0, 81, 255);
  color: #fff;
}
</style>