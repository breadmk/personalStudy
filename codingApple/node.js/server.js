// 서버를 띄우기 위한 기본 셋팅(express 라이브러리)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');

const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://kidsnat:rmfkseldk1@cluster0.jb82a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',function(에러,client){

if(에러) return console.log(에러);

db = client.db('todoapp');

// db.collection('post').insertOne( {_id:99, 이름: 'John', 나이:20 },function(에러,결과){
//     console.log('저장완료');
// });

// db.collection('post').insertOne( test1 ,function(에러,결과){ 
//     console.log(test1);
//     console.log('저장완료');
// }); 



app.listen(8070,function(){ 
    console.log('listen on 8070');
});

})

// (서버를 띄울 포트번호, 띄운후 실행할 코드)
// app.listen(8070,function(){ 
//     console.log('listen on 8070');
// });

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
    let test = 요청.body;
    console.log(test);
    응답.send('전송완료')
    db.collection('post').insertOne( test ,function(에러,결과){ 
        console.log('저장완료');
    }); 
})

app.get('/list',function(req,res){
    //디비에 저장된 post라는 collection안에 저장된 데이터를 꺼내주세요.
    db.collection('post').find().toArray(function(err,data){
        console.log(data);
        res.render('list.ejs',{ posts : data });
    });

   
    
})
