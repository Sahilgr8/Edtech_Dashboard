const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'admin', component: () => import('pages/Admin.vue')
    },
    { path: '/studentDetails',name:'studentDetails', component: () => import('pages/Student.vue')},
    { path: '/adminAnalytics',name:'adminAnalytics', component: () => import('pages/AdminAnalytics.vue')},
    ]
  },
  {
    path: '/student',
    component: () => import('layouts/MainLayoutStudent.vue'),
    children: [
      { path: '',name:'studentDashboard', component: () =>import('src/pages/StudentDashboard.vue')},
      { path: '/studentAnalytics',name:'studentAnalytics', component: () => import('pages/StudentAnalytics.vue')},
    ]
  },
  {
    path:'/',
    name:'login',
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
