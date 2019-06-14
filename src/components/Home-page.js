import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ProductList from './products/Product-list'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('/products')
        setProducts(response.data)
        setLoading(false)
      } catch (e) {
        alert('에러')
        console.log(e, e.response)
      }
    }
    getProducts()
  }, [])

  return (<Grid className="home">
      <Grid className="home__banner" style={{ 
      }}>
      </Grid>
      <Grid className="home__items">
        {
          loading ? '로딩중' : (
            <Grid>
              <ProductList products={products}></ProductList>
            </Grid>
          )
        }
      </Grid>
    </Grid>)
}

export default HomePage
