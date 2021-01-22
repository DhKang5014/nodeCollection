var mysql = require('mysql'); // mysql 변수에 mysql 모듈을 할당 
var connection = mysql. createConnection({ 
    //커넥션변수에 mysql변수에 있는 크리에이드커넥션 메소드를 호출(객체를 받음) 할당 
    host : 'localhost', //host객체 - 마리아DB가 존재하는 서버의 주소 
    user : 'root', //user객체 - 마리아DB의 계정 
    port : '3310',
    password : '1234', //password객체 - 마리아DB 계정의 비밀번호 
    database : 'maindb' //database객체 - 접속 후 사용할 DB명 
}); 
connection.connect(); // (위에 선언한 객체들을 가진)커넥션변수의 connect() 메소드를 호출하면 DB에 접속이 됨 
connection.query('SELECT * FROM admins', function(error, results, fields){ 
    // 커넥션.query 메소드를 호출해서(첫번째인자는 SQL문을주고, 두번째 인자로 콜백함수를 줌). 
    // 첫번째 인자 쿼리가 실행되고 나서 두번째 콜백함수가 실행됨(에러가발생했으면error에 할당, 접속결과는 results에 할당) 
    if (error) { console.log(error); 
    } 
    
    //에러에 값이 있다면 에러값을 콘솔에 출력 
    console.log(results); 
}); 
connection.end();

