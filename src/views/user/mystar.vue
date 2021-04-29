<template>
  <div class="mystar">
    <hm_header title="我的收藏">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <hm_postBlock
      v-for="value in starlist"
      :key="value.id"
      :post="value"
    ></hm_postBlock>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import hm_postBlock from "@/components/hm_postBlock.vue";
import { getUserStars } from "@/apis/user.js";
export default {
  components: {
    hm_header,
    hm_postBlock,
  },
  data() {
    return {
      starlist: [],
    };
  },
  async mounted() {
    let res = await getUserStars();
    console.log("收藏", res);
    this.starlist = res.data.data;
  },
};
</script>

<style>
</style>