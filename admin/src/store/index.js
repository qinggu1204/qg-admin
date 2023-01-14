import Vuex from "vuex";
import Vue from "vue";
//响应动作
const actions={
 success (context,value){
   console.log('a success')
   context.commit('Success',value)
 },
  username (context,value){
    context.commit('Username',value)
  },
  schoolId(context,value){
   console.log('vuex schoolId',value)
    context.commit('SchoolId',value)
  }
}
//操作数据
const mutations={
  Success(state,value){
    console.log('m success',value)
    state.token=value
  },
  Username(state,value){
    state.username=value
  },
  SchoolId(context,value){
    console.log('m schoolId',value)

    state.schoolId=value
  }
}
//存储数据
const state={
  username:'empty',
  token:'empty',
  schoolId:'empty'
}


Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  mutations,
  state,
})

