import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from '../components/Home-page'
import Header from '../components/Header'
import ProductPage from '../components/products/Product-page'
import BlogPage from '../components/blog/Blog-page'
import BlogDetail from '../components/blog/Blog-detail'
import AdminPage from '../components/admin/Admin-page'
import Settings from '../components/user/Settings'
import LikeProducts from '../components/user/LikeProducts'
import Search from '../components/Search'
import Contact from '../components/Contact'
import { category } from '../utils'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/문의하기" component={Contact} exact={true} />
        <Route path="/검색" component={Search} exact={true} />
        <Route path="/구독-셋팅" component={Settings} exact={true} />
        <Route path="/좋아요-누른-상품들" component={LikeProducts} exact={true} />
        <Route path="/블로그" component={BlogPage} exact={true} />
        <Route path="/블로그/:title" component={BlogDetail} />
        <Route path="/관리자" component={AdminPage} exact={true} />
        <Route path="/:cate1/:cate2" component={ProductPage} />
        <Route path="/:cate1" component={ProductPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
