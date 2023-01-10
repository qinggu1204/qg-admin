<template>
  <div>
    <el-form :inline="true" :model="path.subjectId" class="demo-form-inline">
      <el-form-item label="学科编号">
        <el-input v-model="path.subjectId" placeholder="学科编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searching">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="chapterId"
        label="章节编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="chapterName"
        label="章节名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="importanceLevel"
        label="重要程度"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import httptool from "../http";

export default {
  name: "QuerySubject",
  data(){
    return{
      path:{
        subjectId:'',
      },
      tableData:{
      chapterId:'',
      chapterName:'',
      importanceLevel:'',
      }
    }
  },
  methods:{
    searching(){
      httptool.get("admin/getChapterBySubject/1",
        {headers:{'token':this.$store.state.token},params:this.path}).then(res=>{
        this.tableData=res.data.data
        console.log('subject',this.tableData)
      }).catch(error=>{
        console.log(error);
      })
    }
  }

}
</script>

<style scoped>

</style>
