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
  }
}
//存储数据
const state={
  username:404,
  token:404
}


Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  mutations,
  state,
})

