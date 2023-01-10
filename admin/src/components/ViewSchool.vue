<template>
  <el-table
    :data="schoolTable"
    style="width: 100%">
    <el-table-column
      label="学校编号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.schoolId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="学校名称"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>学校名: {{ scope.row.schoolName }}</p>
          <p>地址: 留和路288号</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.schoolName }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="gotoInfo(scope.row)">详情页</el-button>
        <el-button
          size="mini"
          @click="gotoAffairs">查看教务教师信息</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="gotoStudent">查看学生列表</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="gotoTeacher">查看学生列表</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import httptool from "../http";

export default {
  name: "ViewSchool",
  data(){
    return{
        schoolTable:{
          'schoolId':'',
          'schoolName':'',
        },
        page:{
          'pageSize':'',
          'currentPage':''
        }
    }
  },
  created() {
    httptool.get("admin/getSchoolList",
      {headers:{'token':this.$store.state.token},params:this.page}).then(res=>{
      console.log('!!',res);
      if(res.status===200){
        console.log(res.data.data.records);
        this.schoolTable=res.data.data.records
      }
    }).catch(error=>{
      console.log(error);
    })
  },
  methods:{
    gotoInfo(schoolId){
      this.$router.push('/info')
      this.$bus.$emit('schoolInfo',schoolId)
    },
    gotoAffairs(){
      this.$router.push('/viewaffairs')
    },
    gotoStudent(){
      this.$router.push('/viewstudents')
    },
    gotoTeacher(){
      this.$router.push('/viewteachers')
    }
  }
}
</script>

<style scoped>

</style>
