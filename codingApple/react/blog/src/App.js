/* eslint-disable */

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
   //     [a,b] a = 진짜 데이터 b = 데이터 정정하는 함수
  let [title , titleChange] = useState(['남자 코트 추천','강남 우동 맛집','여자 코트 추천']);
  let [like,likeChange] = useState(0);
  let posts = '강남 고기 맛집';
  let css = { color : 'red', fontSize : '30px' }
  let [modal,modal변경] = useState(false);

  function num(){
    return 100
  }

  function changeTitle(){
    var newArray = [...title]; //deep copy
    newArray[0] = '여자 코트 추천'
    titleChange(newArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div style={ css }>개발 Blog</div>
      </div>
      <button onClick={ changeTitle }>변경</button>
      {/* <img src= { logo } /> */}
      {/* <h4> { num() } </h4> */}
       <div className="list">
        <h3>{ title[0] } <span onClick={ ()=>{ likeChange(like+1) } }>👍</span> {like} </h3>
        <p>2월 17일 발행</p>
        <hr/>
       </div>
        <div className="list">
        <h3>{ title[1] }</h3>
        <p>2월 18일 발행</p>
        <hr/>
       </div> 
        <div className="list">
        <h3 onClick={ ()=>{ modal변경(true) }}>{ title[2] }</h3>
        <p>2월 19일 발행</p>
        <hr/>
      </div>

    <button onClick={ ()=>{ modal변경((!modal)) } }>버튼</button>
    {
      modal===true
      ?<Modal />
      :null
    }

    </div>
  );
}

function Modal(){
  return(
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
