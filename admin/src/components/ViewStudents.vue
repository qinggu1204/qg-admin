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
      :data="tableData.records"
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
    <el-row>
      <el-col style="text-align:right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="object.currentPage"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="object.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.pages">
        >
        </el-pagination>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import httptool from "../http";

export default {
  name: "ViewStudents",
  data(){
    return{
      inputVal:'',
      tableData:{
        records:[],
        total:10,
        size:10,
        current:1,
        orders:[],
        optimizeCountSql:'',
        searchCount:'',
        pages:2,
      },
      showTable:[],
      studentData:{
        studentId:'',
        studentName:'',
      },
      object:{
        currentPage:1,
        pageSize:10,
        schoolId:'',
        loginName:'',
      }
    }
  },
  methods:{
    handleSizeChange(size){
      //修改当前每页的数据行数
      this.object.pageSize=size;
      //数据重新分页
          this.object.schoolId=this.$store.state.schoolId

      console.log('object',this.object)
      httptool.get("admin/getStudentList",
        {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
        console.log('!!',res);
        if(res.status===200){
          console.log(res.data.data.records);
          this.tableData.records=res.data.data.records
          this.showTable=res.data.data.records

          this.tableData.total=res.data.data.total
          this.tableData.size=res.data.data.size
          this.tableData.current=res.data.data.current
          this.tableData.pages=res.data.data.pages
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    //调整当前的页码
    handleCurrentChange(pageNumber){
      //修改当前的页码
      this.object.currentPage=pageNumber;
      //数据重新分页
      this.object.schoolId=this.$store.state.schoolId

        console.log('thisschoolid viewstudents',this.object.schoolId)

      console.log('object',this.object)

      httptool.get("admin/getStudentList",
        {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
        console.log('!!',res);
        if(res.status===200){
          console.log(res.data.data.records);
          this.tableData.records=res.data.data.records
          this.showTable=res.data.data.records

          this.tableData.total=res.data.data.total
          this.tableData.size=res.data.data.size
          this.tableData.current=res.data.data.current
          this.tableData.pages=res.data.data.pages
        }
      }).catch(error=>{
        console.log(error);
      })
    },




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
        let studentId = e.studentId.toString();
        let studentName = e.studentName.toString();
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
      this.tableData.records = Search_List;
    },
  },
  watch: {
    inputVal(item1, item2) {
      if (item1 == "") {
        this.tableData.records = this.showTable;
      }
    },
  },
  mounted() {
    console.log('loginName',this.object.loginName)
    this.object.schoolId=this.$store.state.schoolId
    console.log('thisschoolid viewstudent',this.object.schoolId)

    httptool.get("admin/getStudentList",
      {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
      console.log('!!',res);
      if(res.status===200){
        console.log(res.data.data.records);
        this.tableData.records=res.data.data.records
        this.showTable=res.data.data.records
        this.tableData.total=res.data.data.total
        this.tableData.size=res.data.data.size
        this.tableData.current=res.data.data.current
        this.tableData.pages=res.data.data.pages
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
