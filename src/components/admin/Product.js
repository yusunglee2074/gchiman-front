import React, { useState } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const AdminProduct = ({ history }) => {
  const [product, setProduct] = useState({
    title: '',
    text: '',
    url: '',
    image: '',
    category1: '',
    category2: '',
    price: 0,
  })
  const postImage = async (e) => {
    const data = new FormData()
    data.append('img', e.target.files[0])
    data.append('folderName', 'gchiman')
    try {
      const response = await axios.post('http://sungyu1.asuscomm.com:3003/static/image', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      setProduct({ ...product, image: response.data })
    } catch (e) {
      alert('에러')
    }
  }
  const postProduct = async () => {
    try {
      const response = await axios.post('http://localhost:3000/products', product) 
    } catch(e) {
      alert('에러')
    }

  }

  return (<Grid className="admin-product">
    <Grid>
      <TextField
        label="제목"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value})}
        margin="normal"
      />
      <TextField
        label="내용"
        value={product.text}
        onChange={(e) => setProduct({ ...product, text: e.target.value})}
        margin="normal"
      />
      <TextField
        label="상품 url"
        value={product.url}
        onChange={(e) => setProduct({ ...product, url: e.target.value})}
        margin="normal"
      />
      <TextField
        label="카테고리1"
        value={product.category1}
        onChange={(e) => setProduct({ ...product, category1: e.target.value})}
        margin="normal"
      />
      <TextField
        label="카테고리2"
        value={product.category2}
        onChange={(e) => setProduct({ ...product, category2: e.target.value})}
        margin="normal"
      />
      <TextField
        label="가격"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value})}
        margin="normal"
      />
      <TextField
        type="file"
        onChange={postImage}
        margin="normal"
      />
          <Button onClick={postProduct}>추가</Button>
    </Grid>
    <Grid>
      상품목록
    </Grid>
  </Grid>)
}

export default withRouter(AdminProduct)
