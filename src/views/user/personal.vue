<template>
  <div class="personal">
    <!-- <router-link :to="'/edit_profile/' + id"> -->
    <router-link :to="`/edit_profile/${id}`">
      <div class="profile">
        <img :src="inifls.head_img" />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: inifls.gender == 1,
                iconxingbienv: inifls.gender == 0,
              }"
            ></span
            >{{ inifls.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <!-- 判断是男是女 -->
        <span class="iconfont">
          <van-icon name="arrow" />
        </span>
      </div>
    </router-link>
    <!-- 个人内容 -->
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的跟贴" desc="跟贴/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/收藏"></hmcell>
    <hmcell title="设置"></hmcell>
    <hmbutton type="danger" style="margin-top: 20px" @clicks="logout"
      >退出</hmbutton
    >
  </div>
</template>

<script>
import hmcell from "@/components/hm_cell";
import hmbutton from "@/components/hm_button";
import { getUserDetail } from "../../apis/user.js";
import axios from "@/utils/myaxios.js";
export default {
  data() {
    return {
      inifls: {},
      id: "",
    };
  },
  components: {
    hmcell,
    hmbutton,
  },
  methods: {
    logout() {
      // console.log(111);

      this.$router.push({ path: "/login" });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    getUserDetail(this.id)
      .then((res) => {
        // console.log(res.data.data);
        // 获取到内容存到inifls
        this.inifls = res.data.data;
        this.inifls.head_img = axios.defaults.baseURL + this.inifls.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>