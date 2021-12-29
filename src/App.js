/* eslint-disable */
import React, { useState } from 'react';
import './App.css';

function App() {
	let [ title, setTitle ] = useState([ '남자 코트 추천', '강남 우동 맛집', 'JPA 독학' ]);
	let [ like, setLike ] = useState(0);
	// let [ like, setLike ] = useState(0);
	let [ modal, setModal ] = useState(false);
	let [ clickTitle, setClickTitle ] = useState(0);
	let [ inputData, setInputDate] = useState('');

	const likeAdd = (index) => {
		// console.log(index)
		// let test = index.target.attributes.num.value;
		// like.splice(test,1,(parseInt(test)+1));
		// console.log(like);
		setLike(like + 1);
	};

	const titleChange = () => {
		let newTitleArray = [ ...title ];
		newTitleArray[0] = '여자 코트 추천';
		// newTitleArray.sort();  //정렬하기.
		setTitle(newTitleArray);
	};

	const addTitle = () => {
		let newTitle = [...title];
		newTitle.unshift(inputData);   // array 맨앞에 차료를 추가하는 문법
		setTitle(newTitle)
	}

	let posts = '강남 고기 맛집';

	return (
		<div className='App'>
			<div className='black-nav'>
				<div style={{ color: 'white', fontSize: '20px' }}>개발 blog</div>
			</div>
			<button onClick={titleChange}>변경</button>

			{title.map((n, index) => {
				return (
					<div className='list' key={index}>
						<h3 onClick={() => {setClickTitle(index)}}>
							{n}
							<span onClick={likeAdd} num={index}>
								👍
							</span>{' '}
							{like}
						</h3>
						<p>2월 17일 발행</p>
						<hr />
					</div>
				);
			})}
			<div className='publish'>
			<input onChange={(e) => { setInputDate(e.target.value)}} />
			<button onClick={ addTitle }>저장</button>	
			</div>
			<button onClick={() => {
					modal === false ? setModal(true) : setModal(false);}}>열고닫기
			</button>
			
			{modal === true ? <Modal title={title} clickTitle={clickTitle} /> : null}
		</div>
	);
}

//component
const Modal = (props) => {
	const { title, clickTitle } = props;
	return (
		<div className='modal'>
			<h2>{title[clickTitle]}</h2>
			<p>날짜</p>
			<p>상세내용</p>
		</div>
	);
};
export default App;
