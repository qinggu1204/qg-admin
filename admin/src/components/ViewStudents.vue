<template>
  <div>
    <h2>students</h2>
    <el-input
      placeholder="请输入内容"
      v-model="inputVal"
      @keyup.enter.native="Search_table()"
      clearable
    ></el-input>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="studentId"
        label="学生编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="学生姓名"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button
            size="mini"
            @click="updataStudentId(scope.row.studentId)">修改学生学号</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import httptool from "../http";

export default {
  name: "ViewStudents",
  data(){
    return{
      inputVal:'',
      tableData:[],
      showTable:[],
      studentData:{
        studentId:'',
        studentName:'',
      },
      object:{
        currentPage:'',
        pageSize:'',
        schoolId:'',
        loginName:'',
      }
    }
  },
  methods:{
    updataStudentId(studentId) {
      this.$prompt('请输入新学号', '学生'+studentId, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        console.log('updataStudentId')
        httptool.put("admin/updateStudentNumber",{'studentId':studentId,'newStudentNumber':value},{headers:{'token':this.$store.state.token}}).then(res=>{
          console.log("@@@@@",res);
          if(res.status===200)
            this.$message({
              type: 'success',
              message: '新绑定的学号为: ' + value
            });
        }).catch(error=>{
          console.log(error)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },



    Search_table() {
      const Search_List = [];
      let res1 = this.inputVal;
      const res = res1.replace(/\s/gi, "");
      let searchArr = this.showTable;
      console.log('showTable',this.showTable)
      searchArr.forEach((e) => {
        let studentId = e.studentId;
        let studentName = e.studentName;
        if (studentId.includes(res)) {
          if (Search_List.indexOf(e) == "-1") {
            Search_List.push(e);
          }
        }
        if (studentName.includes(res)) {
          if (Search_List.indexOf(e) == "-1") {
            Search_List.push(e);
          }
        }
      });
      this.tableData = Search_List;
    },
  },
  watch: {
    inputVal(item1, item2) {
      if (item1 == "") {
        this.tableData = this.showTable;
      }
    },
  },
  mounted() {
    this.object.loginName=this.$store.state.username
    console.log('loginName',this.object.loginName)
    this.$bus.$on('schoolInfo',(data)=>{
      this.object.schoolId=data.schoolId
      console.log('thisschoolid',this.object.schoolId)
    })
    httptool.get("admin/getStudentList",
      {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
      console.log('!!',res);
      if(res.status===200){
        console.log(res.data.data.records);
        this.tableData=res.data.data.records
        this.showTable=res.data.data.records
        // console.log(res.data.data);
        // this.tableData=res.data.data
        // this.showTable=res.data.data
      }
    }).catch(error=>{
      console.log(error);
    })
  }
}
</script>

<style scoped>

</style>
