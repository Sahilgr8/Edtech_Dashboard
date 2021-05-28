
const routes = [
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/admin', component: () => import('pages/admin.vue') },
      { path: '/student', component: () => import('pages/student.vue') }
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
