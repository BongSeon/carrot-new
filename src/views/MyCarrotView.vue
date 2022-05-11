<template>
  <div class="mycarrot" v-show="show">
    <slot-header>
      <template v-slot:title> 나의 당근 </template>
    </slot-header>
    <section class="first">
      <div class="my-info-wrap">
        <div class="my-avatar-wrap" @click="$refs.file.click()">
          <img class="my-avatar" :src="userInfo.photoURL" alt="my avatar" />
          <div class="my-avatar-over"></div>
          <input
            type="file"
            style="display: none"
            ref="file"
            accept="image/png, image/jpeg"
            @change="uploadAvatar($event.target.files)"
          />
        </div>
        <div class="my-info">
          <h1 class="display-name">{{ userInfo.displayName }}</h1>
          <p>{{ userInfo.email }}</p>
        </div>
      </div>
      <button class="btn btn-primary btn-logout" @click="logout">
        로그아웃
      </button>
    </section>
    <section class="second">
      <button class="btn-list">
        <!-- 판매내역 -->
        <img src="@/assets/icons/list-btn-1.jpg" alt="" />
      </button>
      <button class="btn-list">
        <!-- 구매내역 -->
        <img src="@/assets/icons/list-btn-2.jpg" alt="" />
      </button>
      <button class="btn-list">
        <!-- 관심목록 -->
        <img src="@/assets/icons/list-btn-3.jpg" alt="" />
      </button>
    </section>
  </div>
</template>

<script>
import useAuth from '@/mixins/useAuth.js'
import useStorage from '@/mixins/useStorage.js'
import postDoc from '@/mixins/postDoc.js'

export default {
  mixins: [useAuth, useStorage, postDoc],
  components: {},
  data() {
    return {
      userInfo: { photoURL: '', displayName: '', email: '', uid: '' },
      //  photoURL: '', displayName: '', email: '', uid: '',
      show: false
    }
  },
  setup() {},
  created() {
    setTimeout(() => {
      this.show = true
    }, 50)
  },
  async mounted() {
    this.userInfo = this.$store.getters['user/userInfo']
    // console.log('user:', user)
    this.$getCurrentUser()
  },
  unmounted() {},
  methods: {
    async uploadAvatar(files) {
      // console.log(files[0])
      const file = files[0]
      const path = `avatars/${this.userInfo.uid}/${file.name}`
      this.$uploadImage(file, path)
    },
    handleAfterImageUpload(url) {
      this.photoURL = url

      this.userInfo.photoURL = url
      this.$store.commit('user/setUser', this.userInfo)

      //upload한 이후 downloadURL을
      // users 의  uid 에 해당하는 doc의 photo_url 여기에 업데이트 해줘야함
      this.$updateDoc('users', this.userInfo.uid, { photo_url: url })
      // Authentication 쪽에도 업데이트 해줘야함

      this.$updateProfile(this.auth.currentUser, { photoURL: url })
    },
    logout() {
      this.$logout()
      this.$store.commit('user/logout')
      this.$router.push({ path: '/login' })
    },
    logoutSuccess() {
      console.log('logoutSuccess')
    }
  }
}
</script>

<style scoped>
/* mycarrot */
.mycarrot section {
  padding: 0;
  padding: 10px;
  /* background-color: antiquewhite; */
  margin-bottom: 10px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
}
.mycarrot section.first {
  border-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mycarrot section.second {
  display: flex;
  justify-content: space-evenly;
}
.mycarrot h1 {
  margin: 0;
}
.mycarrot .my-avatar-wrap {
  position: relative;
  /* background-color: rgba(127, 255, 212, 0.342); */
  width: 60px;
  cursor: pointer;
}
.mycarrot .my-avatar {
  width: 100%;
  border-radius: 50%;
}

.mycarrot .my-avatar-over {
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 14px;
  /* vertical-align: text-bottom; */
}
.mycarrot .my-avatar-over:hover {
  background-color: rgba(0, 0, 0, 0.276);
}
.mycarrot .my-avatar-over:hover::after {
  position: absolute;
  background-color: rgba(8, 8, 8, 0.285);
  content: '변경';
  display: flex;
  justify-content: center;
  align-items: flex-end;
  line-height: 36px;
  left: 0;
  top: 50%;
  border-radius: 0 0 60px 60px;
  width: 100%;
  height: 50%;
}
.mycarrot .my-info-wrap {
  display: flex;
}
.mycarrot .my-info {
  padding-left: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
}
.mycarrot .my-info .display-name {
  font-family: 'SuncheonB';
  font-size: 18px;
}
.mycarrot .btn-logout {
  height: 38px;
}
.mycarrot .btn-list {
  background-color: transparent;
}
.mycarrot .btn-list img {
  width: 72px;
}
</style>
