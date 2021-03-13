<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/qiuxinfa/boot-vue-online-exam-sever">
            <el-dropdown-item>Github</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="setPhFormVisible = true">修改头像</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="setPwFormVisible = true">修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <el-dialog
        :visible.sync="setPwFormVisible" >
          <div style="width:80%;margin: 0 auto">
              <el-form :inline="false" label-width="90px" class="demo-ruleForm">
                <el-form-item label="密码"   prop="password">
                  <el-input type="password" placeholder="新密码" auto-complete="off" v-model="newPw"></el-input>
                </el-form-item>
              </el-form>
              <el-form :inline="false" label-width="90px" class="demo-ruleForm">
                <el-form-item label="确认密码"   prop="password">
                  <el-input type="password" placeholder="确认密码" auto-complete="off" v-model="AuthPw"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="setPwFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="changePw">确 定</el-button>
            </div>
    </el-dialog>
    <!-- 修改头像 -->
    <el-dialog
        :visible.sync="setPhFormVisible" >
          <div style="width:80%;margin: 0 auto">
            <el-form  status-icon  :inline="true" label-width="90px" class="demo-ruleForm">
                <el-form-item label="头像"   prop="NewPhotoUrl">
                <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="NewPhotoUrl" :src="NewPhotoUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                </el-form-item>
              </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="setPhFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePh">确 定</el-button>
          </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { changeUserPw,changeUserPh,upload} from '@/api/user'
import { formatDate } from '@/utils/date'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
    ])
  },
  data() {
    return {
      setPwFormVisible: false,
      setPhFormVisible: false,
      newPw: '', // 新密码
      AuthPw: '', // 验证密码
      NewPhotoUrl: '', // 新头像地址
    }
  },
  mounted() {
    
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleAvatarSuccess(res, file) {
     // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      let formData = new FormData();
      formData.append("multipartFiles", file);
      upload(formData).then(response => {
        if(response.data.code == 200){
          //console.log("返回的头像名："+response.data.data)
          this.NewPhotoUrl = response.data.data
          // console.log(response.data.data);
        }
      }).catch(err =>{
        this.$message({
          message: '上传头像失败',
          type: 'error'
        });
      })
    },
    changePw() {
      if(this.newPw !== this.AuthPw){
        this.$message({
          message: '两次输入密码不相同，请重新修改',
          type: 'error'
        });
        return
      }
      let data = {
        name: this.name,
        newPw: this.newPw,
      }
      changeUserPw(data).then(res=> {
        let msg = "修改失败"
        let msgType = 'error'
        if(res.data.code == 200 ){
          msg = "修改成功"
          msgType = 'success'
        }
        this.$message({
          message: msg,
          type: msgType
        });
        //退出登录
        setTimeout(()=>{
          this.logout();
        },500)
      }).catch(err =>{
        this.$message({
          message: '修改失败',
          type: 'error'
        });
      })
    },
    changePh() {
      let data = {
        name: this.name,
        newPh: this.NewPhotoUrl,
      }
      changeUserPh(data).then(res=> {
        let msg = "修改失败"
        let msgType = 'error'
        if(res.data.code == 200 ){
          msg = "修改成功"
          msgType = 'success'
        }
        this.$message({
          message: msg,
          type: msgType
        });
        setTimeout(()=>{
          this.logout();
        },500)
      }).catch(err =>{
        this.$message({
          message: '修改失败',
          type: 'error'
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.avatar-uploader .el-upload{
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
