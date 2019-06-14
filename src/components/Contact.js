import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ProductList from './products/Product-list'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')

  const save = () => {
    // TODO: 이메일 보내기
  }

  return (<Grid className="contact">
    <TextField
      placeholder="이름"
      fullWidth={true}
      value={name}
      onChange={(e) => setName(e.target.value)}
    ></TextField>
    <TextField
      placeholder="이메일"
      fullWidth={true}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    ></TextField>
    <TextField
      placeholder="문의내용"
      fullWidth={true}
      value={text}
      multiline
      rows={10}
      onChange={(e) => setText(e.target.value)}
    ></TextField>
    <Button onClick={save} variant="contained" color="primary" style={{ width: '100%' }}>문의하기</Button>
  </Grid>)
}

export default Contact
