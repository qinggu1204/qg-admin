import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hello from "../components/Hello";
import AddTopic from "../components/AddTopic";
import ModifyStudentId from "../components/ModifyStudentId";
import ModifyTeacherId from "../components/ModifyTeacherId";
import QuerySubject from "../components/QuerySubject";
import SetAffairs from "../components/SetAffairs";
import ViewSchool from "../components/ViewSchool";
import ViewAffairs from "../components/ViewAffairs";
import ViewStudents from "../components/ViewStudents";
import ViewTeachers from "../components/ViewTeachers";
import Login from "../components/Login";
import Info from "../components/Info";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addtopic',
      name: 'AddTopic',
      component: AddTopic,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/modifystudentid',
      name: 'ModifyStudentId',
      component: ModifyStudentId,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/modifyteacherid',
      name: 'ModifyTeacherId',
      component: ModifyTeacherId,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/querysubject',
      name: 'QuerySubject',
      component: QuerySubject,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/setaffairs',
      name: 'SetAffairs',
      component: SetAffairs,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/viewschool',
      name: 'ViewSchool',
      component: ViewSchool,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/viewaffairs',
      name: 'ViewAffairs',
      component: ViewAffairs,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: Info,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/viewstudents',
      name: 'ViewStudents',
      component: ViewStudents,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/viewteachers',
      name: 'ViewTeachers',
      component: ViewTeachers,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        keepAlive: true
      }
    }
  ]
})
