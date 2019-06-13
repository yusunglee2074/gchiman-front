import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import BlogList from './Blog-list'

const BlogPage = ({ history }) => {
  return (
    <Grid className="blog">
      <Grid className="blog__title">
        <h1>Hamlet Syndrome</h1>
        <span>특별하고 포괄적 인 선물 목록을 통해 모든 사람에게 적합한 선물을 찾아보세요.</span>
        <br />
        <span> 엄마, 아빠, 스포티 한 딸, 공주병 있는 여친, 야무지지 못한 남친, 당신의 선택장애 여부에 관계없이 모든 사람을 위한 목록입니다.</span>
      </Grid>
      <Grid>
        <BlogList></BlogList>
      </Grid>
    </Grid>
  )
}

export default withRouter(BlogPage)
