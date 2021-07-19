// 서버를 띄우기 위한 기본 셋팅(express 라이브러리)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');
app.use('/public',express.static('./public'));
app.use(methodOverride('_method'));
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
    응답.render('index.ejs');
});

app.get('/write',function(요청,응답){
    응답.render('write.ejs');
});

app.post('/add',function(요청,res){ //res는 한번만 사용가능하다.
        //updateOne({어떤데이터를 수정할지},{ $set / $inc / $min / $rename / etc : { 수정값 } },function({}))
        // operator  { $set : { totalPost : 바꿀값 } }
        // operator  { $inc : { totalPost : 기존값에 더해줄 값 } }
    // res.send('전송완료')
    db.collection('counter').findOne({name : '게시물갯수'},function(err,data){
        console.log(data.totalPost);
        let totalCount = data.totalPost;
        db.collection('post').insertOne( { _id:totalCount+1, 제목:요청.body.title,날짜:요청.body.date} ,function(에러,결과){ 
            console.log('저장완료');
            db.collection('counter').updateOne({ name : '게시물갯수' },{ $inc : { totalPost : 1 } } ,function(err,data){
                if(err) return console.log(err);
            });
            res.redirect("/list")
         }); 
       });
    });

app.get('/list',function(req,res){
    //디비에 저장된 post라는 collection안에 저장된 데이터를 꺼내주세요.
    db.collection('post').find().toArray(function(err,data){
        res.render('list.ejs',{ posts : data });
    });
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
    
app.get('/edit/:no',function(req,res){
    db.collection('post').findOne( {_id : parseInt(req.params.no) }, function(err,result){
        res.render('edit.ejs', {get:result});
    });
});


app.put('/edit',function(req,res){
    // 폼에담긴 제목데이터,날짜 데이터를 가지고 db.collection 에다가 업데이트를 하자.
    db.collection('post').updateOne({ _id: parseInt(req.body.no)  },{ $set : { 제목: req.body.title, 날짜: req.body.date } },function(err,result){
        console.log('수정완료');
        res.redirect('/list');
    });
});

// 회원 관련 소스
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//미들웨어 사용
// app.use(미들웨어)
// 웹서버는 요청- 응답해주는 머신
// 미들웨어 :  요청-응답 중간에 뭔가 실행되는 코드

app.use(session({secret : '비밀코드' , resave : true , saveUninitialized : false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login',function(req,res){
    res.render('login.ejs');
});

// passport : 로그인 기능 쉽게 구현 도와줌. 로그인 하면 아이디 및 비밀번호 검사.
app.post('/login', passport.authenticate('local',{  //local 방식으로 인증해주세요.
    failureRedirect : '/fail' // 회원 인증 실패하면 /fail 로 이동.
}),function(req,res){
   res.redirect('/');
});

passport.use(new LocalStrategy({  // 인증하는 방법을 Strategy 라고함.
    usernameField : 'id',   // <input type="text" class="form-control" name="id"> name=속성
    passwordField : 'pw',   // <input type="password" class="form-control" name="pw"> name=속성
    session : true,         // 로그인 후 세션을 저장할 것인지 여부
    passReqToCallback : false,  // 아이디 / 비번 말고 다른거 검증시 true 
}, function(inputId, inputPw, done){ // 위가 true의 경우 inputId앞에 파라미터 추가
    console.log(inputId, inputPw);
    db.collection('login').findOne( { id : inputId }, function(err,result){
        if(err) return done(err);
        // done(서버에러,성공시 사용자 DB 데이터/실패시 false, 에러메세지) 
        if(!result) return done(null,false, {message : '존재하지 않는 아이디입니다'})
        if(inputPw == result.pw){
            return done(null, result); //result가 아래 user로 들어감.
        }else{
            return done(null,false, { message : '비밀번호가 틀렸습니다.'} )
        }
    })
}));
// 위에 코드는 보안이 처참함. 원래는 보안화 해야함.
// 로그인 성공 -> 세션정보를 만듦 -> 마이페이지 방문시 세션검사

passport.serializeUser(function(user,done){ //세션을 저장하는 코드(로그인 성공시 발동)
    done(null,user.id); //user.id 라는 이름으로 세션을 만듬.
});

// 이 세션 데이터를 가진 사람을 DB에서 찾아주세요(마이페이지 접속시 발동)
passport.deserializeUser(function(id,done){
    db.collection('login').findOne( {id : id},function(err,result){
        // console.log(result);
        done(null,result);
    })
    
});

app.get('/mypage', loginChk, function (req, res) {
  console.log(req.user);
  res.render('mypage.ejs', { 사용자:req.user});
}) 

//미들웨어
function loginChk(req,res,next){
    if(req.user){
        next(); //통과
    }else{
        res.send('로그인 하세요');
    }
}