import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { category } from '../utils'
import Modal from 'react-modal';

const Header = ({ history }) => {
  const [toggleMenu, setToggleMenu] = useState(null)
  const [toggleEmailMenu, setToggleEmailMenu] = useState(null)
  const [email, setEmail] = useState(window.localStorage.getItem('email') ? window.localStorage.getItem('email') : '')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const menuOpen = (e) => {
    setToggleMenu(e.currentTarget)
  }
  const emailMenuOpen = (e) => {
    setToggleEmailMenu(e.currentTarget)
  }
  const menuClose = (e) => {
    setToggleMenu(null)
  }
  const emailMenuClose = (e) => {
    setToggleEmailMenu(null)
  }
  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };
  const subEmail = async () => {
    setIsModalOpen(false)
    const storage = window.localStorage;
    storage.setItem('email', email)
    try {
      const response = await axios.post('/emails', { email })
      console.log(response)
    } catch (e) {
      alert('에러')
    }
  }

  const logout = () => {
    setToggleEmailMenu(null)
    const storage = window.localStorage;
    storage.removeItem('email')
    setEmail('')
  }

  const clickLikeProducts = () => {
    setToggleEmailMenu(null)
    history.push('/좋아요-누른-상품들')
  }
  const clickSettings = () => {
    setToggleEmailMenu(null)
    history.push('/구독-셋팅')
  }

  return (
    <Grid className="header">
      <Grid container className="header__logo">
        <Grid item xs={1}>검색</Grid>
        <Grid item xs={10} className="header__logo__title" onClick={() => history.push('/')}>
          <h1>그치만 갖고싶은걸</h1>
        </Grid>
        {
          email
            ? (
              <Grid item xs={1} className="header__logo__email" aria-controls="simple-menu" onClick={emailMenuOpen} aria-haspopup="true">{email.slice(0, email.indexOf('@'))}</Grid>
            ) : (
              <Grid item xs={1} className="header__logo__email" onClick={() => setIsModalOpen(true)}>이메일구독</Grid>
            )
        }
        <Menu
          id="email-menu"
          anchorEl={toggleEmailMenu}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(toggleEmailMenu)}
          onClose={emailMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <MenuItem onClick={clickSettings}>구독 셋팅</MenuItem>
          <MenuItem onClick={clickLikeProducts}>좋아요 누른 상품들</MenuItem>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Menu>
        <Modal
          appElement={document.getElementById("root")}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <Grid>
              <h3 style={{ textAlign: 'center', fontWeight: 300 }}>그치만 갖고싶은걸...</h3>
              <p>여러 재미있는 상품과 블로그 글을 보내드립니다.</p>
              <p>구독은 언제든지 간편하게 취소할 수 있습니다.</p>
              <p>이미 구독한 이메일로 로그인 할 수 있습니다.</p>
              <form onSubmit={subEmail}>
                <TextField
                  autoFocus
                  label="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                ></TextField>
                <Grid>
                  <Button variant="outlined" color="primary" onClick={subEmail}>
                    구독
                  </Button>
                </Grid>
              </form>
            </Grid>
        </Modal>
      </Grid>
      <Grid container className="header__menu">
        <Grid item xs={2} className="header__menu__item"
          onClick={() => history.push('/신상품')}>
          신상품
        </Grid>
        <Grid item xs={2} className="header__menu__item"
          onClick={() => history.push('/남자선물')}>
          남자선물
        </Grid>
        <Grid item xs={2} className="header__menu__item"
          onClick={() => history.push('/여자선물')}>
          여자선물
        </Grid>
        <Grid item xs={2} className="header__menu__item"
          onClick={() => history.push('/블로그')}>
          선택장애
        </Grid>
        <Grid item xs={2} className="header__menu__item"
          onClick={() => history.push('/괴짜물품')}>
          괴짜물품
        </Grid>
        <Grid item aria-controls="simple-menu" aria-haspopup="true" onClick={menuOpen} xs={2} className="header__menu__item">
          카테고리
        </Grid>
        <Menu
          id="simple-menu"
          anchorEl={toggleMenu}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(toggleMenu)}
          onClose={menuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <MenuItem onClick={menuClose}>랜덤물품</MenuItem>
          <MenuItem onClick={menuClose}>운영자문의</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}

export default withRouter(Header)
