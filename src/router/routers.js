import Main from '@/components/main';
import parentView from '@/components/parent-view';

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  权限模块定义： access数组  父路由access拥有子路由access值 按钮路由access值除外
 *  （若页面存在权限功能按钮，则该页面需重新定义路由，并定义子路由（包含按钮路由，该页面路由, 页面路由参数保持一致），设置隐藏hideMenu: true）
 * }
 */

export default [
  {
    path: '/',
    name: '_home',
    redirect: 'website',
    component: Main,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/website',
    name: 'website',
    meta: {
      title: '官网',
      notCache: true,
      hideInMenu: false,
      icon: 'md-home'
    },
    component: () => import('@/view/website/website.vue')
  },
  {
    path: '/solution',
    name: 'solution',
    meta: {
      title: '解决方案',
      notCache: true,
      hideInMenu: true
    },
    component: () => import('@/view/website/solution.vue')
  },
  {
    path: '/partner',
    name: 'partner',
    meta: {
      title: '合作伙伴',
      notCache: true,
      hideInMenu: true
    },
    component: () => import('@/view/website/partner.vue')
  },
  {
    path: '/about-us',
    name: 'about-us',
    meta: {
      title: '关于我们',
      notCache: true,
      hideInMenu: true
    },
    component: () => import('@/view/website/about-us.vue')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
];
