<template>
  <div class="cateManager">
    <hm_header title="栏目管理">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <div class="delCate">
      <h3>点击删除频道</h3>
      <div class="list">
        <span
          v-for="value in cateList"
          :key="value.id"
          @click="removrcate(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span
          v-for="value in unaddcateList"
          :key="value.id"
          @click="addcate(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getcategory } from "@/apis/category.js";
import hm_header from "@/components/hm_header.vue";
export default {
  components: {
    hm_header,
  },
  data() {
    return {
      // 已添加
      cateList: [],
      // 未添加
      unaddcateList: [],
    };
  },
  async mounted() {
    // 先读取本地存储的数据，如果没有数据才发送请求获取
    this.cateList = JSON.parse(localStorage.getItem("cateList") || "[]");
    if (!this.cateList) {
      let res = await getcategory();
      console.log("栏目", res);
      this.cateList = res.data.data;
      // 判断
      if (localStorage.getItem("hmtoutiao_token")) {
        this.cateList.splice(0, 2);
      } else {
        this.cateList.splice(0, 1);
      }
    }
    this.unaddcateList = JSON.parse(
      localStorage.getItem("unaddcateList") || "[]"
    );
  },
  methods: {
    // 删除栏目
    removrcate(value) {
      this.unaddcateList.push(value);
      this.cateList = this.cateList.filter((v) => {
        return v.id != value.id;
      });
      // 将两个数组存储到本地存储,本地存储只能存储字符串
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("unaddcateList", JSON.stringify(this.unaddcateList));
    },

    // 添加栏目
    addcate(value) {
      this.cateList.push(value);
      this.unaddcateList = this.unaddcateList.filter((v) => {
        return v.id != value.id;
      });
      // 将两个数组存储到本地存储,本地存储只能存储字符串
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("unaddCateList", JSON.stringify(this.unaddCateList));
    },
  },
};
</script>

<style lang="less" scoped>
.delCate,
.addCate {
  padding: 10px;
  h3 {
    line-height: 30px;
    font-weight: bold;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 21%;
      border: 1px solid #ccc;
      margin: 5px;
      padding: 10px 15px;
      text-align: center;
      border-radius: 10px;
    }
  }
}
</style>

