import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ProductItem from './Product-item'

const ProductList = (props) => {
  const [query, setQuery] = useState('new')
  const [products, setProducts] = useState(props.products)
  const [showProducts, setShowProducts] = useState(props.products)
  const [likeProducts, setLikeProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = window.localStorage.getItem('email')
        if (email) {
          const res = await axios.get('/email/' + email)
          setLikeProducts(res.data.likeProducts)
          setLoading(false)
        }
      } catch (e) {
        alert('에러')
      }
    }
    getEmail()
  }, [])

  const priceCap = () => {
    let tempProducts = products.slice()
    setShowProducts(tempProducts.filter((product) => {
      if (product.price <= max && product.price >= min) return true
      return false
    }))
  }

  useEffect(() => {
    let tempProducts = products.slice()
    switch (query) {
      case 'new':
        let minP = 0, maxP = 0;
        tempProducts.sort((a, b) => {
          if (a.price > min) minP = a.price
          if (a.price > max) maxP = a.price
          return moment(b.createdAt) - moment(a.createdAt)
        })
        setMin(minP)
        setMax(maxP)
        setShowProducts(tempProducts)
        break;
      case 'top':
        tempProducts.sort((a, b) => {
          return b.likeCount - a.likeCount
        })
        setShowProducts(tempProducts)
        break;
      case 'price':
        priceCap()
        break;
      case 'under':
        setShowProducts(tempProducts.filter((product) => {
          if (product.price <= 20000) return true
          return false
        }))
        break;
      case 'random':
        tempProducts.sort(() => {
          return .5 - Math.random();
        })
        setShowProducts(tempProducts)
        break;
    }
  }, [query])

  return (
    <Grid className="products">
      {
        props.query !== false && (
          <Grid container spacing={1} className="products__query">
            <Grid item>
              <Button
                variant={ query === 'new' ? "contained" : 'text' }
                color="primary"
                onClick={() => setQuery('new')}>
                신상품순
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={ query === 'top' ? "contained" : 'text' }
                color="primary"
                onClick={() => setQuery('top')}>
                인기순
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={ query === 'price' ? "contained" : 'text' }
                color="primary"
                onClick={() => setQuery('price')}>
                가격 범위
              </Button>
              {
                query === 'price' && (
                  <Grid container>
                    <Grid item className="products__query__price-input">
                      <TextField
                        placeholder="최소가격"
                        fullWidth={true}
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        margin="none"
                      ></TextField>
                    </Grid>
                    <span style={{ lineHeight: 1.6, fontSize: 20, paddingLeft: 10, paddingRight: 10 }}>~</span>
                    <Grid item className="products__query__price-input">
                      <TextField
                        placeholder="최대가격"
                        fullWidth={true}
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        margin="none"
                      ></TextField>
                    </Grid>
                    <Grid item className="products__query__price-input">
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ width: 30, height: 30, fontSize: 12 }}
                        onClick={() => priceCap()}
                      >적용</Button>
                    </Grid>
                  </Grid>
                )
              }
            </Grid>
            <Grid item>
              <Button
                variant={ query === 'under' ? "contained" : 'text' }
                color="primary"
                onClick={() => setQuery('under')}>
                2만원 이하
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={ query === 'random' ? "contained" : 'text' }
                color="primary"
                onClick={() => setQuery('random')}>
                랜덤순서
              </Button>
            </Grid>
          </Grid>
        )
      }
      {
        loading ? '가져오는중' : (<Grid container className="products__list">
          {
            showProducts.map((product, idx) => {
              if (likeProducts.includes(product._id.toString())) {
                return <Grid item xs={4} className="products__list__item" key={idx}><ProductItem product={product} like={true}></ProductItem></Grid>
              }
              else return <Grid item xs={4} className="products__list__item" key={idx}><ProductItem product={product} like={false}></ProductItem></Grid>
            })
          }</Grid>)
      }
      </Grid>
  )
}

export default ProductList
