<template>
  <div>
    <el-table
      :data="tableData.records"
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
            @click="gotoInfo(scope.row.schoolId)">详情页</el-button>
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
            @click="gotoTeacher">查看教师列表</el-button>
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
import httptool from "../http";

export default {
  name: "ViewSchool",
  data(){
    return{
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
          pageSize:10,
          currentPage:1
        }
    }
  },
  created() {
    httptool.get("admin/getSchoolList",
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
  methods:{
    handleSizeChange(size){
      //修改当前每页的数据行数
      this.object.pageSize=size;
      //数据重新分页

      console.log('object',this.object)
      httptool.get("admin/getSchoolList",
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

      console.log('object',this.object)

      httptool.get("admin/getSchoolList",
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


    gotoInfo(schoolId){
      console.log('viewSchool,before vuex',schoolId)
      this.$store.dispatch('schoolId',schoolId)
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
