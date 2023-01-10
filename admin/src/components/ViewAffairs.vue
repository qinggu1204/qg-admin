<template>
  <div>
    <h2>affairs</h2>
    <el-table
      :data="this.pageTicket"
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
          :current-page="affairData.current"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="affairData.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="affairData.total">
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
      tableData:{
        teacherId:'',
        teacherName:'',
      },
      affairData:{
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
        currentPage:'',
        pageSize:'',
        schoolId:'',
        loginName:'',
      }
    }
  },
  mounted() {
    this.object.loginName=this.$store.state.username
    console.log('loginName',this.object.loginName)
    this.$bus.$on('schoolInfo',(data)=>{
      this.schoolId=data.schoolId
      console.log('thisschoolid',this.object.schoolId)
    })
    //
    httptool.get("/admin/getNeteacherList",
      {headers:{'token':this.$store.state.token},params:this.object}).then(res=>{
      console.log('affairsListall',res);
      if(res.status===200){
        console.log('affairlist',res.data.data.records);
        this.affairData.records=res.data.data.records
        this.affairData.total=res.data.data.total
        this.affairData.size=res.data.data.size
        this.affairData.current=res.data.data.current
        this.affairData.pages=res.data.data.pages
        this.getPageInfo();
        console.log('affairsData',this.affairData)
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
    getPageInfo(){
      //清空pageTicket中的数据
      this.pageTicket=[];
      // 获取当前页的数据
      for(let i=(this.affairData.current-1)*this.affairData.size;i<this.affairData.total;i++){
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.affairData.records[i]);
        //判断是否达到一页的要求
        if(this.pageTicket.length===this.affairData.size) break;
      }
    },
    //分页时修改每页的行数,这里会自动传入一个size
    handleSizeChange(size){
      //修改当前每页的数据行数
      this.affairData.size=size;
      //数据重新分页
      this.getPageInfo();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber){
      //修改当前的页码
      this.affairData.current=pageNumber;
      //数据重新分页
      this.getPageInfo()
    }

  }
}
</script>

<style scoped>

</style>
