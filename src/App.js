/* eslint-disable */
import React, { useState } from 'react';
import './App.css';

function App() {
	//component
	const Modal = () => {
		return (
			<div className='modal'>
				<h2>제목</h2>
				<p>날짜</p>
				<p>상세내용</p>
			</div>
		);
	};

	let [ title, setTitle ] = useState([ '남자 코트 추천', '강남 우동 맛집', 'JPA 독학' ]);
	let [ like, setLike ] = useState(0);

	const likeAdd = () => {
		setLike(like + 1);
	};

	const titleChange = () => {
		let newTitleArray = [ ...title ];
		newTitleArray[0] = '여자 코트 추천';
		// newTitleArray.sort();  //정렬하기.
		setTitle(newTitleArray);
	};

	let posts = '강남 고기 맛집';

	return (
		<div className='App'>
			<div className='black-nav'>
				<div style={{ color: 'white', fontSize: '20px' }}>개발 blog</div>
			</div>
			<button onClick={titleChange}>변경</button>
			<div className='list'>
				<h3>
					{title[0]}
					<span onClick={likeAdd}>👍</span> {like}
				</h3>
				<p>2월 17일 발행</p>
				<hr />
			</div>
			<div className='list'>
				<h3>{title[1]} </h3>
				<p>2월 18일 발행</p>
				<hr />
			</div>
			<div className='list'>
				<h3>{title[2]}</h3>
				<p>2월 19일 발행</p>
				<hr />
			</div>
			<Modal />
		</div>
	);
}

export default App;
