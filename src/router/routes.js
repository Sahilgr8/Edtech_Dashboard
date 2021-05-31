import store from 'src/store/index.js'

const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'admin', component: () => import('pages/Admin.vue')
      // ,beforeEnter:(to,from,next)=>{
      //   if(store.state.authenticated==false){
      //     next("/")
      //   }else{
      //     next()
      //   }
      // }
    },
    { path: '/studentDetails',name:'studentDetails', component: () => import('pages/Student.vue')}
    ]
  },
  {
    path: '/student',
    component: () => import('layouts/MainLayoutStudent.vue'),
    children: [
      { path: '',name:'student', component: () => import('pages/Index.vue')
      // ,beforeEnter:(to,from,next)=>{
      //       if(store.state.authenticated==false){
      //         next("/")
      //       }else{
      //         next()
      //       }
      //     }
        }
    ]
  },
  {
    path:'/',
    component:()=> import('pages/login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
