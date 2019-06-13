import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const Settings = ({ history }) => {
  const [email, setEmail] = useState(window.localStorage.getItem('email'))
  const [newEmail, setNewEmail] = useState(window.localStorage.getItem('email'))

  const changeEmail = async () => {
    try {
      await axios.patch(`/email/${email}`, { email: newEmail })
      alert('수정완료')
        window.localStorage.setItem('email', newEmail)
        history.push('/')
        window.location.reload()
    } catch (e) {
      alert ('에러')
      console.log(e.response)
    }
    
  }
  const cancelSub = async () => {
    if(window.confirm('복구 불가능합니다. 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/email/${email}`)
        alert('지금까지 이용해 주셔서 감사합니다.')
        window.localStorage.removeItem('email')
        history.push('/')
        window.location.reload()
      } catch (e) {
        if (e.response.status === 404) return alert('해당 이메일이 존재하지 않습니다.')
        alert ('에러')
        console.log(e.response)
      }
    }
  }

  return (<Grid className="settings">
    <h2>계정 셋팅</h2>
    <Grid className="settings__input">
      <TextField
        label="새로운 이메일주소"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        margin="normal"
      ></TextField>
    </Grid>
    <Grid>
      <Grid className="settings__button">
        <Button variant="outlined" color="primary" onClick={() => changeEmail()}>
          저장
        </Button>
      </Grid>
      <Grid className="settings__cancel">
        <Button variant="outlined" color="secondary" onClick={() => cancelSub()}>
          구독취소
        </Button>
        <p>해당 이메일에 관련된 서비스내 모든 정보를 삭제합니다.</p>
      </Grid>
    </Grid>
  </Grid>)
}

export default Settings
