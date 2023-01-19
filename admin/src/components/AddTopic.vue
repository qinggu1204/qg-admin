<template>
<div class="question">
  <el-form :model="question" ref="question" label-width="100px" class="demo-dynamic" >
    <el-form-item
      prop="type"
      label="题目类型"
    >
      <el-select v-model="question.type" placeholder="请选择">
        <el-option
          v-for="item in questionType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      prop="descrpition"
      label="题目内容"
    >
      <el-input v-model="question.description"></el-input>
    </el-form-item>
    <el-form-item
      v-if="question.type==='SINGLE'||question.type==='MULTI'||question.type==='JUDGE'"

      v-for="(Option, index) in question.subOption"
      :label="'选项' + index"
      :key="Option.key"
      :prop="'optionName.' + index + '.optionDesc'"
    >
      <el-input v-model="Option.optionName">选项名称</el-input>
      <el-input v-model="Option.optionDesc">选项内容</el-input>
      <el-button @click.prevent="removeOption(Option)">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="addOption">新增选项</el-button>
    </el-form-item>

    <el-form-item
      prop="subjectId"
      label="学科"
    >
      <el-select v-model="question.subjectId" placeholder="请选择">
        <el-option
          v-for="item in subjectType"
          :key="item.subjectId"
          :label="item.subjectName"
          :value="item.subjectId">
          <span style="float: left">{{ item.subjectName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectId }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      prop="chapterId"
      label="章节"
    >
      <el-select v-model="question.chapterId" placeholder="请选择">
        <el-option
          v-for="item in chapterList"
          :key="item.chapterId"
          :label="item.chapterName"
          :value="item.chapterId">
          <span style="float: left">{{ item.chapterName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.chapterId }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      prop="difficultyLevel"
      label="题目难度等级"
    >
      <el-slider
        v-model="question.difficultyLevel"
        :max="10"
        show-input>
      </el-slider>
    </el-form-item>

    <el-form-item
      prop="questionAns"
      label="标准答案"
    >
      <el-input v-model="question.questionAns"></el-input>
    </el-form-item>
    <el-form-item
      v-for="(subQuestion, index) in question.subQuestionInfo"
      :label="'小题' + index"
      :key="subQuestion.key"
      :prop="'subQuestionInfo.' + index + '.subQuestionDesc'"

    >

      <el-input v-model="subQuestion.subQuestionDesc"></el-input>
      <el-input v-model="subQuestion.subQuestionAns"></el-input>
      <el-button @click.prevent="removeDomain(subQuestion)">删除</el-button>

    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addQuestion('question')">暂存本题</el-button>
      <el-button type="primary" @click="submitForm('question')">提交</el-button>
      <el-button @click="addDomain">新增小题</el-button>
      <el-button @click="resetForm('question')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import httptool from "../http";

export default {
  name: "AddTopic",
  data(){
    return {
      questionType:[
        {
          value:'SINGLE',
          label:'单选题',
        },
        {
          value:'MULTI',
          label:'多选题',
        },
        {
          value:'JUDGE',
          label:'判断题',
        },
        {
          value:'COMPLETION',
          label:'填空题',
        },
        {
          value:'COMPLEX',
          label:'综合题',
        }
      ],
      subjectType:[],
      chapterList:[],
        question:{
          type:'',
          description:'',
          subjectId:'',
          chapterId:'',
          difficultyLevel:0,
          questionAns:'',
          subQuestionInfo: [{
            subQuestionDesc: '',
            subQuestionAns:'',
          }],
          subOption: [{
            optionName: '',
            optionDesc:'',
          }],
        },
      questionList:[],
    }
  },
  watch:{
    'question.subjectId':{
      handler(){
        httptool.get("admin/getChapterBySubject",
          {headers:{'token':this.$store.state.token},params:{'subjectId':this.question.subjectId}}).then(res=>{
          console.log('chapterList',res);
          if(res.status===200){
            this.chapterList=res.data.data
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    },

  },
  mounted() {
    httptool.get("admin/getSubjectList",
      {headers:{'token':this.$store.state.token}}).then(res=>{
      console.log('subjectList',res);
      if(res.status===200){
        console.log(res.data.data);
        this.subjectType=res.data.data
        console.log('subjectType',this.subjectType)
      }
    }).catch(error=>{
      console.log(error);
    })
  },
  methods: {
    submitForm(formName) {
      console.log(this.questionList)
          httptool.post("admin/addQuestion", {'question':this.questionList},{headers:{'token':this.$store.state.token}}).then(res=>{
            console.log('submit',res);
            console.log('question',this.question)
            if(res.status===200){
              this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              this.$router.push('/addtopic')
            }
          }).catch(error=>{
            console.log(error)
          })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.question.subQuestionInfo.indexOf(item)
      if (index !== -1) {
        this.question.subQuestionInfo.splice(index, 1)
      }
    },
    removeOption(item) {
      var index = this.question.subOption.indexOf(item)
      if (index !== -1) {
        this.question.subOption.splice(index, 1)
      }
    },
    addDomain() {
      this.question.subQuestionInfo.push({
        subQuestionDesc: '',
        subQuestionAns:'',
        key: Date.now()
      });

    },
    addQuestion(){
      var q=this.question
      console.log('qqqqq',q)

      this.questionList.push(q)
      this.$refs['question'].resetFields();
    },

    addOption() {
      this.question.subOption.push({
        optionName: '',
        optionDesc: '',
        key: Date.now()
      });
    },
  }

}
</script>

<style scoped>
.question{
  width: 40%;
}
</style>
