<template>
  <div>

    <el-form :inline="true" :model="studentTable" class="demo-form-inline">
      <el-form-item label="原绑定学号">
        <el-input v-model="studentTable.studentId" placeholder="原学号"></el-input>
      </el-form-item>
      <el-form-item label="新绑定学号">
        <el-input v-model="studentTable.newStudentNumber" placeholder="新学号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import httptool from "../http";

export default {
  name: "ModifyStudentId",
  data(){
    return{
      success:0,
      studentTable:{
        studentId:"",
        newStudentNumber:"",
      }
    }
  },
  methods:{
    submit(){
      httptool.put("admin/updateStudentNumber",this.studentTable,{headers:{'token':this.$store.state.token}}).then(res=>{
        console.log("@@@@@",res);
        if(res.status===200)
          this.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
      }).catch(error=>{
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
