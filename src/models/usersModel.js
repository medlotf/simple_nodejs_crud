'use strict';
var dbConn = require('../../config/dbConfig');
//Employee object create
var User = function(user){
  this.pseudo= user.pseudo;
  this.firstname= user.firstname;
  this.lastname= user.lastname;
  this.email= user.email;
  this.created_at= new Date();
  this.updated_at= new Date();
};

User.create = function (newUser, result) {
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

User.findById = function (id, result) {
    dbConn.query("Select * from users where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

User.findAll = function (rq,result) {
    let order="";
    if(rq.query.order !== null && (rq.query.order==="pseudo" || rq.query.order==="firstname" || rq.query.order==="lastname" || rq.query.order==="email" || rq.query.order==="id") ){
        let ascOrDesc=""
        if(rq.query.reverse !==null && (rq.query.reverse==="0" || rq.query.reverse==="1"))
        {
            ascOrDesc = rq.query.reverse==="1" ? " DESC" : " ASC";
        }
        order="ORDER BY "+rq.query.order+""+ascOrDesc;
    }
    let sql="Select * from users "+order;
    dbConn.query(sql, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('employees : ', res);
            result(null, res);
        }
    });
};

User.update = function(id, user, result){
    dbConn.query("UPDATE users SET pseudo=?,firstname=?,lastname=?,email=? WHERE id = ?", [user.pseudo,user.firstname,user.lastname,user.email, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};

User.delete = function(id, result){
    dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= User;