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
    응답.send('전송완료')
    db.collection('counter').findOne({name : '게시물갯수'},function(err,data){
        console.log(data.totalPost);
        let totalCount = data.totalPost;

        db.collection('post').insertOne( { _id:totalCount+1, 제목:요청.body.title,날짜:요청.body.date} ,function(에러,결과){ 
            console.log('저장완료');
            db.collection('counter').updateOne({ name : '게시물갯수' },{ $inc : { totalPost : 1 } } ,function(err,data){
                if(err) return console.log(err);
            });
            //updateOne({어떤데이터를 수정할지},{ $set / $inc / $min / $rename / etc : { 수정값 } },function({}))
            // operator  { $set : { totalPost : 바꿀값 } }
            // operator  { $inc : { totalPost : 기존값에 더해줄 값 } }
    }); 
  });
});

app.get('/list',function(req,res){
    //디비에 저장된 post라는 collection안에 저장된 데이터를 꺼내주세요.
    db.collection('post').find().toArray(function(err,data){
        res.render('list.ejs',{ posts : data });
    });

app.delete('/delete',function(req,res){
    console.log(req.body);
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body,function(err,result){
        console.log('삭제완료,cmd');
        res.status(200).send({ message : '성공했습니다.' });
        // res.status(400).send({ message : '실패했습니다.' });
    });
});

app.get('/detail/:no',function(req,res){
    db.collection('post').findOne( { _id : parseInt(req.params.no) },function(err,result){
        console.log(result);
        res.render('detail.ejs', {data:result});
        if( result == null ){
            res.send({message : "요청하신 페이지가 없습니다."});
        }
    });
   
});
    
})
