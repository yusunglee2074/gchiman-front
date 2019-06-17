import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import BlogItem from './Blog-item'
import { blogCategory } from '../../utils'
import Divider from '@material-ui/core/Divider';

const BlogList = () => {
  const [blogs, setBlogs] = useState({})

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get('/blogs') 
        let tempObj = {}
        response.data.map((blog, idx) => {
          if (tempObj[blog.category]) {
            return tempObj = { ...tempObj, [blog.category]: tempObj[blog.category].concat(blog) }
          } else {
            return tempObj = { ...tempObj, [blog.category]: [blog] }
          }
        })
        setBlogs(tempObj)
      } catch (e) {
        alert('에러')
        console.log(e)
      }
    }
    getBlogs()
  }, [])
  return (<Grid className="blog-list">
    {
      Object.keys(blogs).map((cate, idx) => {
        return (<Grid key={idx} className="blog-list__cate">
          <Divider></Divider>
          <h2>{cate}</h2>
          <Grid container spacing={4} className="blog-list__items">
            {
              blogs[cate].map((blog, idx) => {
                return (<Grid key={idx} item xs={4} className="blog-list__cate">
                  <Grid className="blog-list__item">
                    <BlogItem item={blog}></BlogItem>
                  </Grid>
                </Grid>)
              })
            }
          </Grid>
        </Grid>)
      })
    }
  </Grid>)
}

export default withRouter(BlogList)
