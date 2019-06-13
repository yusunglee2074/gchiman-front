import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ProductList from '../products/Product-list'

const LikeProducts = ({ history }) => {
  const [email, setEmail] = useState(window.localStorage.getItem('email'))
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getLikeProducts = async () => {
      try {
        const res = await axios.get('/email/' + email + '/p')
        setProducts(res.data.likeProducts)
        setLoading(false)
      } catch (e) {
        alert('에러')
      }
    }
    getLikeProducts()
  }, [])

  return (<Grid className="like-products">
    <h2>{email} <span onClick={() => history.push('/구독-셋팅')}>프로필 수정</span></h2>
    <Grid className="like-products__list">
      <h2>좋아요 누른 목록</h2>
      { loading ? '정보 가져오는 중' : (
        <Grid>
          {
            products.length === 0 && '아이템이 없어요!'
          }
          <ProductList products={products} query={false}></ProductList>
        </Grid>
      )}
    </Grid>
  </Grid>)
}

export default LikeProducts 
