<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">
      </el-col>
      <el-col :span="12" :xs="24" style="position: relative;height: 100vh;">
        <el-form :class="{ login_form_hidden: !loginFormFlag, login_form: loginFormFlag }" :model="loginForm"
          :rules="rules" ref="forms">
          <div class="login_top">
            <img src="@/assets/images/logo.png" alt="米哈游">
          </div>
          <el-form-item prop="username">
            <el-input class="username-input" v-model="loginForm.username" placeholder="输入手机号/邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="password-input" v-model="loginForm.password" placeholder="输入密码" type="password" show-password
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item class="login_tip_info">
            <span>没有账号？</span>
            <span>立即注册</span>
            <span>忘记密码</span>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_button" @click="login">
              进入游戏
            </el-button>
          </el-form-item>
        </el-form>
        <el-tooltip class="tooltip" placement="left" effect="light">
          <template #content>
            <span style="font-size: 15px;" v-if="!loginFormFlag">弹<br />出<br />登<br />录</span>
            <span style="font-size: 15px;" v-else>收<br />起<br />登<br />录</span>
          </template>
          <el-icon class="show_login" @click="showLogin" size="40px" color="#ffffff">
            <component :is="!loginFormFlag? 'ArrowLeftBold':'ArrowRightBold'"></component>
          </el-icon>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
// 引入用户相关小仓库
import useUserStore from '@/store/modules/user';
import router from '@/router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
import { useRoute } from 'vue-router';

let $route = useRoute();
// 获取el-form组件
let forms = ref();
// 控制登录按钮加载动画
let loading = ref(false);
// 获取用户仓库
let userStore = useUserStore();
// 登录信息
let loginForm = reactive({ username: 'admin', password: 'atguigu123' });
// 登录按钮回调
const login = async () => {
  await forms.value.validate();
  // 开始加载
  loading.value = true;
  userStore.userLogin(loginForm).then(() => {
    //编程式导航跳转到展示数据首页
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    let redirect: any = $route.query.redirect;
    router.push({ path: redirect || '/' });
    ElNotification({
      title: `HI,${getTime()}好`,
      message: "欢迎回来",
      type: 'success',
    })
    // 成功加载效果消失
    loading.value = false;
  }).catch((error) => {
    // 失败加载效果消失
    loading.value = false;
    ElNotification({
      title: error,
      type: 'error',
    })
  });
}
// 自定义校验规则
const validateUserName = (_rule, value, callback) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('账号长度至少五位'));
  }
}
// 表单校验规则
const rules = {
  username: [
    { required: true, message: '账号不能为空', trigger: 'change' },
    { validator: validateUserName, trigger: 'change' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'change' },
    { min: 5, message: '密码至少五位', trigger: 'change' },
  ],
}
let loginFormFlag = ref(false);
const showLogin = () => {
  loginFormFlag.value = !loginFormFlag.value;
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: "原神";
  src: url("@/assets/fonts/汉仪文黑-85W.ttf");
}


.login_container {
  width: '100%';
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  overflow: hidden;


  .login_form {
    position: absolute;
    width: 24.25rem;
    height: 21rem;
    background-color: rgb(255, 255, 255);
    padding: 0 1.95rem;
    border-radius: 8px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.8s ease-in-out;
  }

  .login_form_hidden {
    position: absolute;
    width: 24.25rem;
    height: 21rem;
    background-color: rgb(255, 255, 255);
    padding: 0 1.95rem;
    border-radius: 8px;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.8s ease-in-out;
  }
}

.login_top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.625rem;

  img {
    width: 202px;
    height: 76px;
  }
}

.username-input,
.password-input {
  height: 3rem;
  margin: 0 auto;
  width: 100%;
  font-size: 1rem;

  ::v-deep .el-input__wrapper {
    border: 1px rgb(230, 230, 230) solid;
    box-shadow: none;
  }

  ::v-deep .el-input__inner {
    color: rgb(50, 50, 50);
    font-weight: 500;
    font-family: "原神";
  }

  ::v-deep .el-input__inner::-webkit-input-placeholder {
    color: rgb(204, 204, 204);
  }
}

.login_tip_info {
  margin: 18px auto;
  margin-top: -10px;
  height: 1.8rem;
  width: 20rem;
  font-family: "原神";

  span {
    font-size: 18px;
  }

  span:nth-child(1) {
    color: rgb(153, 153, 153);
  }

  span:nth-child(2) {
    color: rgb(220, 188, 96);
  }

  span:nth-child(3) {
    color: rgb(220, 188, 96);
    position: absolute;
    right: 0;
  }
}

.login_button {
  margin: 0 auto;
  height: 3rem;
  width: 20rem;
  font-family: "原神";
  font-size: 25px;
  color: rgb(244, 216, 168);
  line-height: 15px;
  background: rgb(57, 59, 64);
  border: 0;
  border-radius: 5px;
}

.show_login {
  position: fixed;
  right: 5px;
  top: 50vh;
  cursor: pointer;
}
</style>
