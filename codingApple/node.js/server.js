// 서버를 띄우기 위한 기본 셋팅(express 라이브러리)

const express = require('express');
const app = express();

// (서버를 띄울 포트번호, 띄운후 실행할 코드)
app.listen(8070,function(){ 
    console.log('listen on 8070');
});

//app.get('경로',fuction(요청,응답){});
app.get('/pet',function(요청,응답){
    응답.send('펫용품 쇼핑 할 수 있는 페이지 입니다.');
});

app.get('/beauty',function(요청,응답){
    응답.send('뷰티용품 사세요');
})