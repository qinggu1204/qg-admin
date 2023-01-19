<template>

  <!-- 登录注册页面 -->
  <div class="login-register-container">
    <div class="box">
      <div class="left" v-show="left_show">
        <div>
          <p>手机验证码登录</p>
          <p>Mobile phone </p>
          <p>verification code login</p>

        </div>
        <el-button
          class="button"
          round
          size="small"
          @click="toRegister(), play()"
        >账号密码登录</el-button
        >
      </div>
      <div class="right" v-show="right_show">
        <div>
          <p>Account password login</p>
          <p>账号密码登录</p>
        </div>
        <el-button class="button" round size="small" @click="toLogin(), play()"
        >手机验证码登录</el-button
        >
      </div>
    </div>
    <div
      class="form-box"
      :class="{ move: isMove, back: isBack, newPosition: isNew }"
      :style="{ left: nowLeft + '%' }"
    >
      <transition name="el-fade-in">
        <el-form
          :model="phoneForm"
          status-icon
          :rules="rules"
          ref="phoneForm"
          label-width="100px"
          class="demo-ruleForm"

        >
          <div class="right-form" v-show="login_show">
            <el-form-item label="账号" prop="username">
              <el-input
                ref="inputPhone"
                type="text"
                v-model="phoneForm.phoneNumber"
                autocomplete="off"
                placeholder="请输入手机号"
                style="margin: 20px;width: 180px"

                clearable
              ></el-input>
              <el-button
                type="primary"
                @click="sendCode(phoneForm.phoneNumber)"
                size="small"
                round
              >获取验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="password">
              <el-input
                ref="password"
                type="password"
                v-model="phoneForm.code"
                autocomplete="off"
                placeholder="请输入验证码"
                show-password
                style="margin: 0px;width: 180px"
              ></el-input>

            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitRegister()"
                size="small"
                round
              >手机验证码登录</el-button>

            </el-form-item>
          </div>

          <div class="left-form" v-show="!login_show">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input
                ref="inputName"
                type="tel"
                v-model="loginTable.loginName"
                autocomplete="off"
                placeholder="请输入手机号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="code">
              <el-input
                ref="password"
                type="password"
                v-model="loginTable.password"
                autocomplete="off"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                size="small"
                round
                @click="submitLogin()"
              >账号密码登录</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </transition>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>{{ rcode }}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>


  <!--  <div>-->
  <!--    <el-form :inline="true" :model="loginTable" class="demo-form-inline">-->
  <!--      <el-form-item label="账号">-->
  <!--        <el-input v-model="loginTable.username" placeholder="账号"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="密码">-->
  <!--        <el-input v-model="loginTable.password" placeholder="密码"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item>-->
  <!--        <el-button type="primary" @click="login">登录</el-button>-->
  <!--      </el-form-item>-->
  <!--    </el-form>-->
  <!--  </div>-->
</template>


<script>
import httptool from "../http";
export default {
  name: "Login",
  data() {
// 手机号校验器
    const phoneValidator = (rule, value, callback) => {};
// 确认密码校验器
    const code = (rule, value, callback) => {};
// 密码强度校验器
    const passwordValidator = (rule, value, callback) => {};
    return {token:0,
      rcode:'',
      dialogVisible: false,

      left_show: true,
      right_show: false,
      login_show: true,
      isMove: false,
      isBack: false,
      isNew: false,
      timer1: null,
      timer2: null,
      timer3: null,
      movable: true,
      nowLeft: 49,
      phoneIsAble: false,
      loginTable:{
        loginName:'',
        password:'',
      },
      phoneForm: {
        phoneNumber: "",
        code: "",

      },
      rules: {
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "手机号应为6位", trigger: "blur" },
          { validator: code, trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "手机号应为11位", trigger: "blur" },
          { validator: phoneValidator, trigger: "blur" },
        ],


      },
    };
  },
  methods: {
    sendCode(phoneNumber){
      httptool.get("user/sendCode",{params:{'phoneNumber':phoneNumber}}).then(res=>{
        console.log('!!',res);
        if(res.status===200){
          console.log(res.data.data);
          this.rcode=res.data.data
          this.dialogVisible=true
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
// 跳转至注册
    toRegister() {
      if (this.movable) {
        this.timer1 = setTimeout(() => {
          this.left_show = false;
          clearTimeout(this.timer1);
          this.timer1 = null;
          this.movable = true;
          this.isNew = true;
          this.$refs.inputName.focus();
          this.reset();
        }, 700);
        this.timer2 = setTimeout(() => {
          this.right_show = true;
          clearTimeout(this.timer2);
          this.timer2 = null;
        }, 240);
        this.timer3 = setTimeout(() => {
          this.login_show = false;
          this.phoneForm.phoneNumber = "";
          this.phoneForm.code = "";
          clearTimeout(this.timer3);
          this.timer3 = null;
        }, 350);
      }
    },
// 跳转至登录
    toLogin() {
      if (this.movable) {
        this.isNew = false;
        this.timer1 = setTimeout(() => {
          this.right_show = false;
          clearTimeout(this.timer1);
          this.timer1 = null;
          this.movable = true;
          this.$refs.inputPhone.focus()
          this.reset();
        }, 700);
        this.timer2 = setTimeout(() => {
          this.left_show = true;
          clearTimeout(this.timer2);
          this.timer2 = null;
        }, 240);
        this.timer3 = setTimeout(() => {
          this.login_show = true;
          this.loginTable.loginName = "";
          this.loginTable.password = "";
          clearTimeout(this.timer3);
          this.timer3 = null;
        }, 350);
      }
    },
// 播放动画
    play() {
      if (this.movable) {
        this.movable = false;
        if (this.nowLeft === 49) {
          this.isMove = true;
        } else {
          this.isBack = true;
        }
      }
    },
// 动画重置
    reset() {
      if (this.nowLeft === 49) {
        this.isMove = false;
        this.nowLeft = 25;
      } else {
        this.isBack = false;
        this.nowLeft = 49;
      }
    },
// 判断密码是否一致

// 注册操作
    async submitRegister() {
      console.log('phoneData',this.phoneForm)
      httptool.post("user/loginByCode", this.phoneForm).then(res=>{
        console.log(res);
        if(res.data.code===200){
          console.log(res.data.data)
          this.$store.dispatch('username',this.phoneForm.phoneNumber)
          this.$store.dispatch('success',res.data.data)
          this.$router.push('/hello')
        }
      }).catch(error=>{
        console.log(error)
      })
    },
// 登录操作
    async submitLogin() {
      console.log('loginData',this.loginTable)

      httptool.post("user/login", this.loginTable).then(res=>{
        console.log(res);
        if(res.data.code===200){
          console.log(res.data.data)
          this.$store.dispatch('username',this.loginTable.phoneNumber)
          this.$store.dispatch('success',res.data.data)
          this.$router.push('/hello')
        }
      }).catch(error=>{
        console.log(error)
      })
    },
  },
  mounted() {
    this.$refs.inputPhone.focus();//获取登录表单账号input焦点
  },
};
</script>



<style lang="less" scoped>
.login-register-container {
  width: 100%;
  height: 100vh;
  background: url("../assets/background.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  color: black;

  .box {
    position: absolute;
    width: 800px;
    height: 480px;
    top: 50%;
    left: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: translate(-50%, -50%);
    border-radius: 24px;
    box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.4);

    .left,
    .right {
      position: absolute;
      height: 100%;
      top: 30%;

      p {
        font-size: 30px;
        font-weight: 40;
        color: black;

      }

      div {
        transform: translate(0, 180px);
      }

      .button {
        transform: translateY(280px);
      }

    }
    .left {
      left: 25%;
      transform: translate(-50%, -50%);
    }

    .right {
      right: 25%;
      transform: translate(50%, -50%);
    }

  }
  .form-box {
    position: absolute;
    top: 50%;
    left: 49%;
    height: 560px;
    width: 400px;
    background: url("../assets/background.jpg") no-repeat -960px center;
    border-radius: 20px;
    transform: translate(20%, -50%);
    box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.8);
    z-index: 2;

    .demo-ruleForm {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

  }
  @keyframes move {
    0% {
      left: 49%;
      background: url("../assets/background.jpg") no-repeat -960px center;
    }
    100% {
      left: 25%;
      background: url("../assets/background.jpg") no-repeat -480px center;
    }
  }

  @keyframes back {
    0% {
      left: 25%;
      background: url("../assets/background.jpg") no-repeat -480px center;
    }
    100% {
      left: 49%;
      background: url("../assets/background.jpg") no-repeat -960px center;
    }
  }

  .move {
    animation: move 0.7s ease-in-out 1 alternate forwards;
  }

  .back {
    animation: back 0.7s ease-in-out 1 alternate forwards;
  }

  .newPosition {
    background: url("../assets/background.jpg") no-repeat -480px center !important;
  }

  .myInput {
    width: 180px;
  }

}
</style>
