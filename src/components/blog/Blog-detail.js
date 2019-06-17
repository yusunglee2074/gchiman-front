import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import {Helmet} from "react-helmet"
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { unTrimUrl } from '../../utils'

const BlogDetail = ({ history, match }) => {
  const [title, setTitle] = useState(unTrimUrl(match.params.title))
  const [blog, setBlog] = useState({})
  useEffect(() => {
    const getText = async () => {
      try {
        const res = await axios.get('/blog/' + title)
        setBlog(res.data)
      } catch (e) {
        alert('에러')
      }
    }
    getText()
  }, [])

  return (<Grid className="blog-detail" style={{ paddingTop: '5rem' }}>
    <Helmet>
      <title>{title} | 그치만 갖고싶은걸</title>
      <meta name="description" content={blog.title} />
    </Helmet>
    <div dangerouslySetInnerHTML={{ __html: blog.text }} />
  </Grid>)
}

export default withRouter(BlogDetail)
