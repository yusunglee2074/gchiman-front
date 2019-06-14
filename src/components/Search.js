import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ProductList from './products/Product-list'

const Search = () => {
  const [searchWord, setSearchWord] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {

  }, [searchWord])

  return (<Grid className="search">
    <TextField
      placeholder="검색어"
      fullWidth={true}
      value={searchWord}
      onChange={(e) => setSearchWord(e.target.value)}
      margin="none"
    ></TextField>
    <Grid className="search__products">
      <ProductList products={products}></ProductList>
    </Grid>
  </Grid>)
}

export default Search
