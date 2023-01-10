<template>
  <el-tabs type="border-card">
    <el-tab-pane label="查看学校教务教师信息"><view-affairs></view-affairs></el-tab-pane>
    <el-tab-pane label="查看学校授课教师信息"><view-teachers/></el-tab-pane>
    <el-tab-pane label="查看学校学生信息"><view-students/></el-tab-pane>
  </el-tabs>
</template>

<script>
import ViewTeachers from "./ViewTeachers";
import ViewStudents from "./ViewStudents";
import ViewAffairs from "./ViewAffairs";
export default {
  name: "Info",
  components:{ViewAffairs,ViewStudents,ViewTeachers},
  data(){
    return{
      schoolId: '',
    }
  },
  mounted() {
    this.$bus.$on('schoolInfo',(data)=>{
      console.log('schoolId',data)
      this.schoolId=data.schoolId
      console.log('thisschoolid',this.schoolId)
    })
  }
}
</script>

<style scoped>

</style>
