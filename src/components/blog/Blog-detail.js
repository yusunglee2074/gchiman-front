import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { unTrimUrl } from '../../utils'

const BlogDetail = ({ history, match }) => {
  const [blog, setBlog] = useState({})

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get('/blog/' + unTrimUrl(match.params.title))
        setBlog(response.data)
      } catch (e) {
        alert('에러')
        console.log(e.response)
      }
    }
    getBlog()
  }, [])
  return (<Grid container className="blog-detail">
    <Grid item xs={9} className="blog-detail__content">
      <h2>{ blog.title }</h2>
      <div dangerouslySetInnerHTML={{__html: blog.text}}></div>
    </Grid>
    <Grid item xs={3} className="blog-detail__side">
      다른 포스팅
    </Grid>
    
  </Grid>)
}

export default withRouter(BlogDetail)
