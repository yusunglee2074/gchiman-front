import React, { useState } from 'react'
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import { category } from '../../utils'
import AdminProduct from './Product'
import AdminBlog from './Blog'
import AdminEmail from './Email'

const AdminPage = ({ history }) => {
  const [tab, setTab] = useState(1)

  return (<Grid className="admin">
    <Grid>
      <p onClick={() => setTab(1)}>1. 상품</p>
      <p onClick={() => setTab(2)}>2. 블로그</p>
      <p onClick={() => setTab(3)}>3. 이메일</p>
    </Grid>
    <Grid>
      {
        (() => {
          if (tab === 1) {
            return <AdminProduct></AdminProduct>
          } else if (tab === 2) {
            return <AdminBlog></AdminBlog>
          } else {
            return <AdminEmail></AdminEmail>
          }
        })()
      }
    </Grid>
  </Grid>)
}

export default withRouter(AdminPage)
