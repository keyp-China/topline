import Vue from 'vue'

import {
  NavBar, // 导航栏
  Field, // 输入框
  Cell, // 单元格
  CellGroup,
  Button, // 按钮
  Toast, // 轻提示
  Tabbar, // 标签栏
  TabbarItem,
  Tab, // 标签页
  Tabs,
  PullRefresh, // 下拉刷新
  List, // 列表
  Grid, // 宫格
  GridItem,
  Image, // 图片
  Lazyload, // 图片懒加载
  Popup, // 弹出层
  Icon, // 图标
  search // 搜索
} from 'vant'

Vue
  .use(NavBar)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Button)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(List)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Lazyload)
  .use(Popup)
  .use(Icon)
  .use(search)
