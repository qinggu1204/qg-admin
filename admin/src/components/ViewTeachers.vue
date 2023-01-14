<template>
  <div class="about">
    <el-input
      placeholder="请输入内容"
      v-model="inputVal"
      @keyup.enter.native="Search_table()"
      clearable
    >
    </el-input>
    <el-table :data="tableData.records">
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
            @click="updataTeacherId(scope.row.userId)">修改教师工号</el-button>

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
          :total="tableData.total">
        </el-pagination>

      </el-col>
    </el-row>

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
      object:{
        currentPage:'1',
        pageSize:'10',
        schoolId:'',
        loginName:'',
      }
    };
  },
  methods: {
    handleSizeChange(size){
      //修改当前每页的数据行数
      this.object.pageSize=size;
      //数据重新分页
          this.object.schoolId=this.$store.state.schoolId

      console.log('object',this.object)
      httptool.get("admin/getTeacherList",
        {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
        console.log('!!',res);
        if(res.status===200){
          console.log(res.data.data.records);
          this.tableData.records=res.data.data.records
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

      console.log('object',this.object)

      httptool.get("admin/getTeacherList",
        {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
        console.log('!!',res);
        if(res.status===200){
          console.log(res.data.data.records);
          this.tableData.records=res.data.data.records
          this.tableData.total=res.data.data.total
          this.tableData.size=res.data.data.size
          this.tableData.current=res.data.data.current
          this.tableData.pages=res.data.data.pages
        }
      }).catch(error=>{
        console.log(error);
      })
    },

    updataTeacherId(teacherId) {
      this.$prompt('请输入新工号', '教师'+teacherId, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        httptool.put("admin/updateTeacherNumber",{'teacherId':teacherId,'newTeacherNumber':value},{headers:{'token':this.$store.state.token}}).then(res=>{
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
    console.log('token token token',this.$store.state.token)
    this.object.schoolId=this.$store.state.schoolId
    this.object.loginName=this.$store.state.username
    console.log('viewschoolid before get',this.object.schoolId)
    httptool.get("/admin/getTeacherList",
      {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
      console.log('!!',res);
      if(res.status===200){
        console.log(res.data.data.records);
        this.tableData.records=res.data.data.records
        this.tableData.total=res.data.data.total
        this.tableData.size=res.data.data.size
        this.tableData.current=res.data.data.current
        this.tableData.pages=res.data.data.pages
      }
    }).catch(error=>{
      console.log(error);
    })
  },
};
</script>
<style scoped>

</style>
