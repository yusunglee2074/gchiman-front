import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import {EditorState, ContentState, convertFromHTML, convertToRaw} from 'draft-js';
import axios from 'axios'
import {stateFromHTML} from 'draft-js-import-html';

const AdminBlog = ({ history }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [blog, setBlog] = useState({
    _id: '',
    title: '',
    image: '',
    text: '',
    category: '',
  })
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blogs') 
        setBlogs(response.data)
      } catch (e) {
        alert('에러')
      }
    }
    getBlogs()
  }, [])

    /*
  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    setBlog({ ...blog, text: draftToHtml(rawContentState) })
  }, [editorState])
  */

  const postImage = async (e) => {
    const data = new FormData()
    data.append('img', e.target.files[0])
    data.append('folderName', 'gchiman')
    try {
      const response = await axios.post('http://sungyu1.asuscomm.com:3003/static/image', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      setBlog({ ...blog, image: response.data })
    } catch (e) {
      alert('에러')
    }
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  const uploadImageCallBack = (file) => {
    return new Promise(async (resolve, reject) => {
      const data = new FormData()
      data.append('img', file)
      data.append('folderName', 'gchiman')
      try {
        const response = await axios.post('http://sungyu1.asuscomm.com:3003/static/image', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        resolve({ data: { link: response.data }})
      } catch (e) {
        reject(e)
      }
    })
  }
  const toolbar = {
    inline: {
      inDropdown: false,
    },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
    emoji  :  {inDropdown: false},
    image: { uploadCallback: uploadImageCallBack, alt: { present: false, mandatory: false } },
  }

  const saveBlog = async () => {
    try {
      let response
      if (blog._id) {
        response = await axios.patch('http://localhost:3000/blog/' + blog._id, blog) 
      } else {
        delete blog._id
        response = await axios.post('http://localhost:3000/blogs', blog) 
      }
      if (response.status === 201) alert('성공')
      else console.log(response)
    } catch(e) {
      alert('에러')
      console.log(e.response)
    }
  }
   const setBlogContent = (blog) => {
     setBlog({
       _id: blog._id,
       title: blog.title,
       image: blog.image,
     })
    const contentState = stateFromHTML(blog.text)
    setEditorState(EditorState.createWithContent(contentState))
   }


  return (<Grid className="">
    <Grid>
      <TextField
        label="제목"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value})}
        margin="normal"
      ></TextField>
      <TextField
        label="카테고리"
        value={blog.category}
        onChange={(e) => setBlog({ ...blog, category: e.target.value})}
        margin="normal"
      ></TextField>
      <TextField
        label="메인 이미지"
        onChange={postImage}
        type="file"
        margin="normal"
      ></TextField>
      <TextField
        label="본문"
        value={blog.text}
        onChange={(e) => setBlog({ ...blog, text: e.target.value})}
        margin="normal"
      ></TextField>
      <img style={{ width: 80 }} alt='메인 이미지' src={blog.image}/>
      {/*
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbar}
      ></Editor>
      */}
      <Button onClick={saveBlog}>{ blog._id ? '수정하기' : '글쓰기' }</Button>
      <Grid>
        <h2>블로그 목록</h2>
        {
          blogs.map((blog, idx) => {
            return (<div key={idx} onClick={() => setBlogContent(blog)}>
              { blog.title }
            </div>)
          })
        }
      </Grid>
    </Grid>
  </Grid>)
}

export default withRouter(AdminBlog)
