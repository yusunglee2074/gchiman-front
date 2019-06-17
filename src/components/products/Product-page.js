import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import {Helmet} from "react-helmet"
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { category, trimUrl, unTrimUrl } from './../../utils'
import ProductList from './Product-list'

const ProductPage = ({ match, history }) => {
  const [openCate, setOpenCate] = useState(unTrimUrl(match.params.cate1))
  const [subCate, setSubCate] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getProducts()
    setOpenCate(match.params.cate1)
  }, [openCate, subCate, match.params.cate1, match.params.cate2])

  const getProducts = async () => {
    setLoading(true)
    try {
      if (match.params.cate2) setSubCate(unTrimUrl(match.params.cate2))
      else setSubCate('')
      let url
      if (match.params.cate1 === '신상품') {
        url = `/products`
      } else {
        url = match.params.cate2
          ? `/products/${unTrimUrl(match.params.cate1)}/${unTrimUrl(match.params.cate2)}`
          : `/products/${unTrimUrl(match.params.cate1)}`
      }
      const response = await axios.get(url)
      setProducts(response.data)
      setLoading(false)
    } catch (e) {
      alert('에러')
      console.log(e, e.response)
    }
  }
  const push = (cate1, cate2) => {
    setOpenCate(cate1)
    if (cate2) {
      setSubCate(unTrimUrl(cate2))
      history.push(`/${trimUrl(cate1)}/${trimUrl(cate2)}`)
    } else {
      history.push(`/${trimUrl(cate1)}`)
    }
  }
  return (
    <Grid container justify="center" className="product-page">
      <Helmet>
        <title>{match.params.cate1} | 그치만 갖고싶은걸</title>
        <meta name="description" content={category[match.params.cate1].text} />
      </Helmet>
      <Grid item xs={12} className="product-page__title">
        {
          match.params.cate2
          ? match.params.cate2
          : match.params.cate1
        }
      </Grid>
      <Grid item xs={10} md={6} className="product-page__text">
        {
          match.params.cate2
            ? category[match.params.cate1].sub[unTrimUrl(match.params.cate2)].text
            : category[match.params.cate1].text
        }
      </Grid>
      <Grid container>
        <Grid item xs={false} md={2} className="product-page__left-category">
        {
          Object.keys(category).map((cate1, idx) => {
            if (cate1 === '신상품') return void 0
            return (<div key={idx} className="product-page__left-category__main" style={ cate1 === openCate ? { color: "rgb(64, 84, 178)"} : void 0 }>
              <div onClick={() => push(cate1)}>{ cate1 }</div>
              <div>
                {
                  openCate === cate1 && category[cate1].sub
                    && (
                      Object.keys(category[cate1].sub).map((cate2, idx) => {
                        return (<div key={idx}
                          style={ cate2 === subCate ? { color: "rgb(64, 84, 178)"} : { color: "black"} }
                          onClick={() => push(cate1, cate2)} className="product-page__left-category__sub">
                          {cate2}
                        </div>)
                      })
                    )
                }
              </div>
            </div>)
          })
        }
        </Grid>
        <Grid item xs={12} md={10}>
          { loading ? '정보 가져오는 중' : (
            <ProductList products={products}></ProductList>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withRouter(ProductPage)
