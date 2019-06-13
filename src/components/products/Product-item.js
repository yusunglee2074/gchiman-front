import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { koreanWon } from '../../utils'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FillFavoriteIcon from '@material-ui/icons/Favorite';

const ProductItem = ({ product, like }) => {
  const [heart, setHeart] = useState(like)

  const likeProduct = async (id) => {
    const email = window.localStorage.getItem('email')
    if (email) {
      try {
        const res = await axios.patch(`/email/${email}/${id}`)
        if (res.status === 200) {
          product.likeCount = product.likeCount - 1
        }
        else {
          product.likeCount = product.likeCount + 1
        }
        setHeart(!Boolean(heart))
      } catch (e) {
        alert('에러')
      }
    } else alert('이메일 구독 신청 후 상품을 저장할 수 있습니다.')
  }

  return (
    <Grid className="product">
      <Grid className="product__title">
        {product.title}
      </Grid>
      <Grid className="product__img">
        <a href={product.url} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
          <img src={product.image} alt="상품이미지" />
        </a>
      </Grid>
      <Grid className="product__text">
        {product.text}
      </Grid>
      <Grid container className="product__bottom">
        <Grid item>
          <Grid className="product__bottom__price">
            {koreanWon(product.price)}
          </Grid>
          <Grid className="product__bottom__like" onClick={() => likeProduct(product._id)}>
            {
             heart
              ? <FillFavoriteIcon color="secondary"></FillFavoriteIcon>
              : <FavoriteIcon />
            }
            {' ' + product.likeCount} likes
          </Grid>
        </Grid>
        <Grid item className="product__bottom__button">
          <a href={product.url} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            <Button
              variant="contained"
              color="primary">
              보러가기
            </Button>
          </a>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductItem 
