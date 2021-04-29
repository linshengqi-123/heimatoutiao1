<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      <van-search
        v-model.trim="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="search"
      >
      </van-search>
      <div @click="search">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <p v-for="item in SearchHistory" :key="item" @click="Searchbyee(item)">
        {{ item }}
      </p>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        :to="{ path: `/postdetail/${value.id}` }"
        v-for="value in searchlist"
        :key="value.id"
        >{{ value.title }}</router-link
      >
    </div>
  </div>
</template>
<script>
import { searchPost } from "@/apis/post.js";
export default {
  data() {
    return {
      // 输入内容
      userKey: "",
      //   渲染搜索内容
      searchlist: [],
      //   搜索历史记录
      SearchHistory: [],
    };
  },

  methods: {
    // 搜索功能实现
    async search() {
      let res = await searchPost(this.userKey);
      console.log(res);
      this.searchlist = res.data.data;

      let index = this.SearchHistory.indexOf(this.userKey);

      if (index !== -1) {
        //   删除重复内容
        this.SearchHistory.splice(index, 1);
      }
      // 让搜索历史记录置顶
      this.SearchHistory.unshift(this.userKey);
      localStorage.setItem(
        "Search_History",
        JSON.stringify(this.SearchHistory)
      );
    },
    Searchbyee(item) {
      console.log(item);

      this.userKey = item;
      this.search();
    },
  },
  mounted() {
    this.SearchHistory =
      JSON.parse(localStorage.getItem("Search_History")) || [];
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>