<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <el-container>
        <el-aside width="200px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu default-active="1-1" class="el-menu-vertical-demo" @select="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu>
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">学科信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/addtopic">添加题目信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/viewschool">
              <i class="el-icon-setting"></i>
              <span slot="title">查看学校信息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <h1>管理员界面</h1>
          </el-header>
          <el-main>
            <router-view>

            </router-view>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>



    </div>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isCollapse: false,
      activeIndex: '1',
      activeIndex2: '1',

    };
  },
  mounted() {
    console.log('app',this)
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
  methods:{
    handleOpen(key, keyPath) {
      this.$router.push(key)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 190px;
  min-height: 400px;
}
</style>
