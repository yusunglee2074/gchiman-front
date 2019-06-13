import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import { trimUrl } from '../../utils'

const BlogItem = ({ item, history }) => {
  return (<Grid className="blog-item" onClick={() => history.push('/블로그/' + trimUrl(item.title)) }>
    <Grid className="blog-item__img">
      <img alt={item.title} src={item.image}/>
    </Grid>
    <Grid className="blog-item__title">
      {item.title}
    </Grid>
  </Grid>)
}

export default withRouter(BlogItem)
