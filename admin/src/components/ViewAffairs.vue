<template>
  <div>
    <h2>affairs</h2>
    <el-input
      placeholder="请输入内容"
      v-model="inputVal"
      @keyup.enter.native="Search_table()"
      clearable
    >
    </el-input>
    <el-table
      :data="tableData.records"
      style="width: 100%">
      <el-table-column
        prop="teacherId"
        label="教师编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="教师号码"
        width="180">
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
import httptool from "../http";

export default {
  name: "ViewAffairs",
  data(){
    return{
      inputVal: "",
      showTable: [],

      tableData:{
        records:[],
        total:0,
        size:0,
        current:0,
        orders:[],
        optimizeCountSql:'',
        searchCount:'',
        pages:0,
      },
      pageTicket:[],
      object:{
        currentPage:1,
        pageSize:10,
        schoolId:'',
        loginName:'',
      }
    }
  },
  mounted() {
    console.log('loginName',this.object.loginName)
    this.object.schoolId=this.$store.state.schoolId

      console.log('thisschoolid viewaffairs',this.object.schoolId)

    //
    httptool.get("/admin/getNeteacherList",
      {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
      console.log('affairsListall',res);
      if(res.status===200){
        console.log('affairlist',res.data.data.records);
        this.tableData.records=res.data.data.records
        this.showTable=res.data.data.records
        this.tableData.total=res.data.data.total
        this.tableData.size=res.data.data.size
        this.tableData.current=res.data.data.current
        this.tableData.pages=res.data.data.pages
        this.$message({
          message:'加载成功',
          type:'success',
        })
      }else {
        this.$message.error(res.data.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  },
  methods:{
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

      console.log('object',this.object)

      httptool.get("admin/getTeacherList",
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
    Search_table() {
      const Search_List = [];
      let res1 = this.inputVal;
      const res = res1.replace(/\s/gi, "");
      let searchArr = this.showTable;
      console.log('showTable',this.showTable)
      searchArr.forEach((e) => {
        let teacherId = e.teacherId.toString();
        let teacherName = e.teacherName.toString();
        let loginName = e.loginName.toString();
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
      this.tableData.records = Search_List;
    },

  },
  watch: {
    inputVal(item1, item2) {
      if (item1 == "") {
        this.tableData.records = Zhis.showTable;
      }
    },
  },
}
</script>

<style scoped>

</style>
