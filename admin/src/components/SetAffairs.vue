<template>
  <div class="about">
    <el-input
      placeholder="请输入内容"
      v-model="inputVal"
      @keyup.enter.native="Search_table()"
      clearable
    >
    </el-input>
    <el-table :data="tableData">
      <el-table-column prop="teacherId" label="教师编号" width="180"> </el-table-column>
      <el-table-column prop="teacherName" label="教师姓名" width="180"> </el-table-column>
      <el-table-column prop="loginName" label="教师电话" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button
            size="mini"
            @click="setaffair(scope.row.userId)">设置为教务教师</el-button>
          <el-button
            size="mini"
            @click="updataTeacherId(scope.row.teacherId)">修改教师工号</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { tableData } from "../assets/tablelist";
import httptool from "../http";
export default {
  name:'SetAffairs',
  data() {
    return {
      inputVal: "",
      showTable: [],
      tableData: [],
      teacherTable:{
        teacherId:'',
        newTeacherNumber:''
      }
    };
  },
  methods: {
    updataTeacherId(teacherId) {
      this.$prompt('请输入新工号', '教师'+teacherId, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        httptool.put("admin/updateTeacherNumber",{'teacherId':teacherId},{headers:{'token':this.$store.state.token}}).then(res=>{
          console.log("@@@@@",res);
          if(res.status===200)
            this.$message({
              type: 'success',
              message: '新绑定的工号为: ' + value
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
    setaffair(userId) {
      console.log('userId', userId)
      httptool.post("admin/addNeteacher", {'userId': userId}).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
        }
      }).catch(error => {
        console.log(error)
      })
    },
    Search_table() {
      const Search_List = [];
      let res1 = this.inputVal;
      const res = res1.replace(/\s/gi, "");
      let searchArr = this.showTable;
      console.log('showTable',this.showTable)
      searchArr.forEach((e) => {
        let teacherId = e.teacherId;
        let teacherName = e.teacherName;
        let loginName = e.loginName;
        if (teacherId.includes(res)) {
          if (Search_List.indexOf(e) == "-1") {
            Search_List.push(e);
          }
        }
        if (teacherName.includes(res)) {
          if (Search_List.indexOf(e) == "-1") {
            Search_List.push(e);
          }
        }
        if (loginName.includes(res)) {
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
    httptool.get("/admin/getNeteacherList",
      {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
      console.log('!!',res);
      if(res.status===200){
        console.log(res.data.data);
        this.tableData=res.data.data
        this.showTable=res.data.data
      }
    }).catch(error=>{
      console.log(error);
    })
  },
};
</script>
<style scoped>

</style>
