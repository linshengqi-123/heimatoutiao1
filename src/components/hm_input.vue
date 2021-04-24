<template>
  <input
    type="text"
    class="hminput"
    @input="handelinput"
    :class="{ success: flag, error: !flag }"
    @blur="handlerBlur"
  />
</template>

<script>
export default {
  // 创建一个第三方变量
  data() {
    return {
      flag: "",
    };
  },
  props: {
    rules: {
      type: RegExp,
    },
    msg: {
      type: String,
      default: "输入错误",
    },
  },
  methods: {
    handelinput(e) {
      // this.pn = "class";
      //   console.log(e.target);
      // 子传父 必须是input事件
      let value = e.target.value;
      //   console.log(this.rules.test(value));

      // 校验用户输入是否合法
      if (this.rules) {
        if (this.rules.test(value)) {
          //   console.log("ok");
          this.flag = true;
        } else {
          //   console.log("no ok");
          this.flag = false;
        }
      }

      this.$emit("input", value);
    },
    // 失焦
    handlerBlur(e) {
      let value = e.target.value;
      if (this.rules) {
        // 判断是否传递了规则
        // 进行用户数据的校验
        if (!this.rules.test(value)) {
          // 合法
        //   console.log(this.msg);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.hminput {
  width: 314 / 360vw * 100;
  height: 50px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 20px;
  color: #ccc;
  line-height: 50px;
}
.success {
  border-bottom-color: rgb(39, 167, 7);
}
.error {
  border-bottom-color: rgb(226, 19, 4);
}
</style>