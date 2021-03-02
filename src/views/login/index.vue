<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit" ref="loginForm" class="login-form">
      <van-field
        v-model="userInfo.mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userForm.mobile"
        clearable
        name="mobile"
        @focus="show=true"
        @blur="show=false"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="userInfo.code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="userForm.code"
        name="code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 5"
            format="ss 秒"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            @click="getCode"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <van-number-keyboard
      :show="show"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
      v-model="userInfo.mobile"
    />
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'Login',

  data() {
    return {
      userInfo: {
        mobile: '13911111119',
        code: '246810'
      },
      userForm: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3579]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }
        ]
      },
      isShowCountDown: false,
      show: false
    }
  },

  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true
      })
      try {
        const { data } = await login(this.userInfo)
        this.$toast.success('登录成功')
        this.$store.commit('setTokenObj', data.data)
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码输入错误')
        }
        this.$toast.fail('登录失败')
      }
    },
    async getCode() {
      try {
        await this.$refs.loginForm.validate('mobile')
        this.isShowCountDown = true
        try {
          await getSmsCode(this.userInfo.mobile)
          this.$toast('发送成功')
        } catch (err) {
          if (err.response.status === 429) {
            this.$toast('发送太频繁了,请稍后再试')
          } else {
            this.$toast('发送失败,请稍后再试')
          }
        }
      } catch (err) {
        this.$toast.fail('手机号格式不正确')
      }
    },
    onInput(value) {
    },
    onDelete(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 180px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border: none;
    border-radius: 23px;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .login-form {
    .van-field {
      height: 100px;
      line-height: 60px;
    }
  }
}
</style>
