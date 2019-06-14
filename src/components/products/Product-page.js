import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { category, trimUrl, unTrimUrl } from './../../utils'
import ProductList from './Product-list'

const ProductPage = ({ match, history }) => {
  const [openCate, setOpenCate] = useState(match.params.cate1)
  const [subCate, setSubCate] = useState(match.params.cate2)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        setOpenCate(unTrimUrl(match.params.cate1))
        if (match.params.cate2) setSubCate(unTrimUrl(match.params.cate2))
        else setSubCate('')
        const url = match.params.cate2
          ? `/products/${unTrimUrl(match.params.cate1)}/${unTrimUrl(match.params.cate2)}`
          : `/products/${unTrimUrl(match.params.cate1)}`
        const response = await axios.get(url)
        setProducts(response.data)
        setLoading(false)
      } catch (e) {
        alert('에러')
        console.log(e, e.response)
      }
    }
    getProducts()
  }, [match.params])

  return (
    <Grid container className="product-page">
      <Grid item xs={12} className="product-page__title">
        {
          match.params.cate2
          ? match.params.cate2
          : match.params.cate1
        }
      </Grid>
      <Grid item xs={12} className="product-page__text">
        {
          subCate 
            ? category[openCate].sub[subCate].text
            : category[openCate].text
        }
      </Grid>
      <Grid container>
        <Grid item xs={0} md={3} className="product-page__left-category">
        {
          Object.keys(category).map((cate1, idx) => {
            if (cate1 === '신상품') return void 0
            return (<div key={idx} className="product-page__left-category__main" style={ cate1 === openCate ? { color: "rgb(64, 84, 178)"} : void 0 }>
              <div onClick={() => history.push(`/${trimUrl(cate1)}`)}>{ cate1 }</div>
              <div>
                {
                  openCate === cate1
                    && (
                      Object.keys(category[cate1].sub).map((cate2, idx) => {
                        return (<div key={idx}
                          style={ cate2 === subCate ? { color: "rgb(64, 84, 178)"} : { color: "black"} }
                          onClick={() => history.push(`/${trimUrl(cate1)}/${trimUrl(cate2)}`)} className="product-page__left-category__sub">
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
        <Grid item xs={12} md={9}>
          { loading ? '정보 가져오는 중' : (
            <ProductList products={products}></ProductList>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withRouter(ProductPage)
