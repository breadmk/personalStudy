// 서버를 띄우기 위한 기본 셋팅(express 라이브러리)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({ extended: true }));
// express.urlencoded();
app.use(express.json());

// (서버를 띄울 포트번호, 띄운후 실행할 코드)
app.listen(8070,function(){ 
    console.log('listen on 8070');
});

//app.get('경로',fuction(요청,응답){});
app.get('/pet',function(요청,응답){
    응답.send('펫용품 쇼핑 할 수 있는 페이지 입니다.');
});

app.get('/beauty',(요청,응답) => { //es6
    응답.send('뷰티용품을 쇼핑할 수 있는 페이지입니다.');
});

app.get('/',function(요청,응답){
    응답.sendFile(__dirname + '/index.html');
});

app.get('/write',function(요청,응답){
    응답.sendFile(__dirname + '/write.html');
});

app.post('/add',function(요청,응답){
    console.log(요청.body);
    응답.send('전송완료')
    // 응답.send(요청.body);
    
})