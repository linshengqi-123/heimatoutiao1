<template>
  <div class="commentItem">
    <!-- 调用自身组件 -->

    <commentlten
      v-if="parent.parent"
      :parent="parent.parent"
      @replay="hanlderReplay"
    >
    </commentlten>
    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <!-- 嵌套组件内使用子传父再父传另外一个子 -->
      <span @click="hanlderReplay(parent)">回复</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
export default {
  // 调用自身
  name: "commentlten",
  props: {
    parent: {
      type: Object,
    },
  },
  methods: {
    // 子传父
    hanlderReplay(v) {
      console.log(" 子传父", v);
      this.$emit("replay", v);
    },
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>