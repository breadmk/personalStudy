/* eslint-disable */
import React, { useState } from 'react';
import './App.css';

function App() {
	let [ title, setTitle ] = useState([ '남자 코트 추천', '강남 우동 맛집', 'JPA 독학' ]);
	let [ like, setLike ] = useState(0);

	const likeAdd = () => {
		setLike(like + 1);
	};

	const titleChange = () => {
		setTitle([ ...title, '여자 코트 추천' ]);
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
					{title[3]}
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
		</div>
	);
}

export default App;
