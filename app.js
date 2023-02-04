

const express = require('express'); // make flexible Node.js web application framework
var app = express(); // make variable
const mysql = require('mysql'); // make Node.js work with database (MYSQL)
const bodyparser = require('body-parser'); // Node.js body parsing middleware.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.sendStatus(205);
    }
    else {
        next();
    }


});

//connecting to database 
const mc = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'passport',
    multipleStatements: true
});


// open broswer on this -> "localhost:4000/" // 81.16.28.103:4000
var port = process.env.PORT || 4000
console.log("Running on port:" + port)
app.listen(port);



/// GET

app.get('/log', (request, response) => {
    mc.query(`SELECT * FROM users ` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});

//managerr
app.get('/logmanagerr', (request, response) => {
    mc.query(`SELECT * FROM managerr ` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});

app.get('/loga', (request, response) => {
    mc.query(`SELECT * FROM users where u_name = "test"` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});

app.get('/lol', (request, response) => {
    mc.query(`SELECT * FROM newpassport JOIN users ON newpassport.user_id = users.id;` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});

app.get('/renewview', (request, response) => {
    mc.query(`SELECT * FROM renewpassport JOIN users ON renewpassport.user_id = users.id;` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});


app.get('/lostview', (request, response) => {
    mc.query(`SELECT * FROM replacementoflosepassport JOIN users ON replacementoflosepassport.user_id = users.id;` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});


app.get('/vertionview', (request, response) => {
    mc.query(`SELECT * FROM replacementofvertionpassport JOIN users ON replacementofvertionpassport.user_id = users.id;` , function (error, results, fields) {
        if (error) throw error;
        return response.send(results);
    });

});

/// POST     replacementofvertionpassport

app.post('/add', function (req, res) {

    
    var data = {
   //"id":req.body.NAME,
   "u_name":req.body.u_name,
   "u_phone":req.body.u_phone,
   "u_password":req.body.u_password,
             
  
}



mc.query('INSERT INTO users SET ?', data, function (error, results, fields) {
   if (error) {

       res.send({
           "code": 404,
           "MSG": "تمام"
       });

       try {
           
       } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
          } else {
              //handleHttpErrors(err.message);
           }
       }

   } else {
       console.log('The solution is: ', results);
       if (error) throw error;
       res.send({
           "code": 200,
           "success": "عاشت ايدك"
       });
   }
});
});



//maneger
app.post('/managerr', function (req, res) {

    
    var data = {
   //"id":req.body.NAME,
   "name":req.body.name,
   "phone":req.body.phone,
  
             
  
}



mc.query('INSERT INTO managerr SET ?', data, function (error, results, fields) {
   if (error) {

       res.send({
           "code": 404,
           "MSG": "تمام"
       });

       try {
           
       } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
          } else {
              //handleHttpErrors(err.message);
           }
       }

   } else {
       console.log('The solution is: ', results);
       if (error) throw error;
       res.send({
           "code": 200,
           "success": "عاشت ايدك"
       });
   }
});
});










/// POST newpassport

app.post('/ss', function (req, res) {
mc.query("select id from users where users.u_name='"+req.body.n_firstname+"'", function (error, result, fields) {
    if (error) {
          console.log("error");
        res.send({
            "code": 404,
            "MSG": "no user whith that name"
        });
 
        
 
    } else {
        try {
            let uid=result[0].id;
            console.log(result[0].id);
            var data = {
                // "id":req.id,//user_id
             "n_email":req.body.n_email,
             "n_placeOforder":req.body.n_placeOforder,
             "n_typeOfmarrige":req.body.n_typeOfmarrige,
             "n_sex":req.body.n_sex,
            "n_placeOfbirth":req.body.n_placeOfbirth,
            "n_firstname":req.body.n_firstname,
            "n_fathersName":req.body.n_fathersName,
             "n_grandfatherName":req.body.n_grandfatherName,
             "n_surname":req.body.n_surname,
             "n_motherName":req.body.n_motherName,
             "n_motherFather":req.body.n_motherFather,
             "n_provinceCountry":req.body.n_provinceCountry,
             "n_maritalStatus":req.body.n_maritalStatus,
             "n_profession":req.body.n_profession,
             "n_dateOfbirth":req.body.n_dateOfbirth,
             "n_nationaliIDNumber":req.body.n_nationaliIDNumber,
             "n_address":req.body.n_address,
            "n_image":req.body.n_image,
            "n_image2":req.body.n_image2,
            "user_id":uid
              //"users": { "id": "1"}
             // },
          }
          
            mc.query('INSERT INTO newpassport SET?', data, function (error, results, fields) {
                if (error) {
                      console.log(error);
                    res.send({
                        "code": 404,
                        "MSG": "error"
                    });
             
                    
             
                } else {
                    try {
                        // console.log('The solution is: ', results);
                    if (error) throw error;
                    res.send({
                        "code": 200,
                        "success": "عاشت ايدك"
                    });
                } catch (err) {
                   if (err.code === 'ER_DUP_ENTRY') {
                       //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                   } else {
                       //handleHttpErrors(err.message);
                    }
                }
                    
                }
             });
            console.log('The solution is: ', results);
        if (error) throw error;
        res.send({
            "code": 200,
            "success": "عاشت ايدك"
        });
    } catch (err) {
       if (err.code === 'ER_DUP_ENTRY') {
           //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
       } else {
           //handleHttpErrors(err.message);
        }
    }
        
    }
 });


/*

mc.query("select id from users where users.uid='"+req.body.uid+"'", function (error, result, fields) {
    if (error) {
          console.log("error");
        res.send({
            "code": 404,
            "MSG": "no user whith that id"
        });
 
        
 
    } else {
        try {
            let uid=result[0].id;
            console.log(result[0].id);
            var data = {
                // "id":req.id,//user_id
             "n_email":req.body.n_email,
             "n_placeOforder":req.body.n_placeOforder,
             "n_typeOfmarrige":req.body.n_typeOfmarrige,
             "n_sex":req.body.n_sex,
            "n_placeOfbirth":req.body.n_placeOfbirth,
            "n_firstname":req.body.n_firstname,
            "n_fathersName":req.body.n_fathersName,
             "n_grandfatherName":req.body.n_grandfatherName,
             "n_surname":req.body.n_surname,
             "n_motherName":req.body.n_motherName,
             "n_motherFather":req.body.n_motherFather,
             "n_provinceCountry":req.body.n_provinceCountry,
             "n_maritalStatus":req.body.n_maritalStatus,
             "n_profession":req.body.n_profession,
             "n_dateOfbirth":req.body.n_dateOfbirth,
             "n_nationaliIDNumber":req.body.n_nationaliIDNumber,
             "n_address":req.body.n_address,
            "n_image":req.body.n_image,
            "n_image2":req.body.n_image2,
            "user_id":uid
              //"users": { "id": "1"}
             // },
          }
          
            mc.query('INSERT INTO newpassport SET?', data, function (error, results, fields) {
                if (error) {
                      console.log(error);
                    res.send({
                        "code": 404,
                        "MSG": "error"
                    });
             
                    
             
                } else {
                    try {
                        // console.log('The solution is: ', results);
                    if (error) throw error;
                    res.send({
                        "code": 200,
                        "success": "عاشت ايدك"
                    });
                } catch (err) {
                   if (err.code === 'ER_DUP_ENTRY') {
                       //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                   } else {
                       //handleHttpErrors(err.message);
                    }
                }
                    
                }
             });
            console.log('The solution is: ', results);
        if (error) throw error;
        res.send({
            "code": 200,
            "success": "عاشت ايدك"
        });
    } catch (err) {
       if (err.code === 'ER_DUP_ENTRY') {
           //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
       } else {
           //handleHttpErrors(err.message);
        }
    }
        
    }
 });

*/

 });
 

 /////renewpassport renewviow
 app.post('/renew', function (req, res) {
    mc.query("select id from users where users.u_phone='"+req.body.rn_phone+"'", function (error, result, fields) {
        if (error) {
              console.log("error");
            res.send({
                "code": 404,
                "MSG": "no user whith that phone"
            });
     
            
     
        } else {
            try {
                let uid=result[0].id;
                console.log(result[0].id);
                var data = {
                    // "id":req.id,
                 "rn_email":req.body.rn_email,
                 "rn_placeOforder":req.body.rn_placeOforder,
                 "rn_typeOfmarrige":req.body.rn_typeOfmarrige,
                 "rn_sex":req.body.rn_sex,
                 "rn_placeOfbirth":req.body.rn_placeOfbirth,
                 "rn_firstname":req.body.rn_firstname,
                 "rn_fathersName":req.body.rn_fathersName,
                 "rn_grandfatherName":req.body.rn_grandfatherName,
                 "rn_surname":req.body.rn_surname,
                 "rn_motherName":req.body.rn_motherName,
                 "rn_motherFather":req.body.rn_motherFather,
                 "rn_provinceCountry":req.body.rn_provinceCountry,
                 "rn_maritalStatus":req.body.rn_maritalStatus,
                 "rn_profession":req.body.rn_profession,
                 "rn_dateOfbirth":req.body.rn_dateOfbirth,
                 "rn_nationaliIDNumber":req.body.rn_nationaliIDNumber,
                 "rn_phone":req.body.rn_address,
                 "rn_address":req.body.rn_address,
                 "rn_image":req.body.rn_image,
                 "user_id":uid
                  //"users": { "id": "1"}
                 // },
              }
              
                mc.query('INSERT INTO renewpassport SET?', data, function (error, results, fields) {
                    if (error) {
                          console.log(error);
                        res.send({
                            "code": 404,
                            "MSG": "error"
                        });
                 
                        
                 
                    } else {
                        try {
                            // console.log('The solution is: ', results);
                        if (error) throw error;
                        res.send({
                            "code": 200,
                            "success": "عاشت ايدك"
                        });
                    } catch (err) {
                       if (err.code === 'ER_DUP_ENTRY') {
                           //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                       } else {
                           //handleHttpErrors(err.message);
                        }
                    }
                        
                    }
                 });
                console.log('The solution is: ', results);
            if (error) throw error;
            res.send({
                "code": 200,
                "success": "عاشت ايدك"
            });
        } catch (err) {
           if (err.code === 'ER_DUP_ENTRY') {
               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
           } else {
               //handleHttpErrors(err.message);
            }
        }
            
        }
     });
    
    
    
    
     });

 /////////////
 app.post('/lost', function (req, res) {
    mc.query("select id from users where users.u_phone='"+req.body.L_phone+"'", function (error, result, fields) {
        if (error) {
              console.log("error");
            res.send({
                "code": 404,
                "MSG": "no user whith that phone"
            });
     
            
     
        } else {
            try {
                let uid=result[0].id;
                console.log(result[0].id);
                var data = {
                    // "id":req.id,
                 "L_email":req.body.L_email,
                 "L_placeOforder":req.body.L_placeOforder,
                 "L_typeOfmarrige":req.body.L_typeOfmarrige,
                 "L_sex":req.body.L_sex,
                 "L_placeOfbirth":req.body.L_placeOfbirth,
                 "L_firstname":req.body.L_firstname,
                 "L_fathersName":req.body.L_fathersName,
                 "L_grandfatherName":req.body.L_grandfatherName,
                 "L_surname":req.body.L_surname,
                 "L_motherName":req.body.L_motherName,
                 "L_motherFather":req.body.L_motherFather,
                 "L_provinceCountry":req.body.L_provinceCountry,
                 "L_maritalStatus":req.body.L_maritalStatus,
                 "L_profession":req.body.L_profession,
                 "L_dateOfbirth":req.body.L_dateOfbirth,
                 "L_nationaliIDNumber":req.body.L_nationaliIDNumber,
                 "L_phone":req.body.L_phone,
                 "L_address":req.body.L_address,
                 "L_image":req.body.L_image,  
                 "user_id":uid
                  //"users": { "id": "1"}
                 // },
              }
              
                mc.query('INSERT INTO replacementoflosepassport SET?', data, function (error, results, fields) {
                    if (error) {
                          console.log(error);
                        res.send({
                            "code": 404,
                            "MSG": "error"
                        });
                 
                        
                 
                    } else {
                        try {
                            // console.log('The solution is: ', results);
                        if (error) throw error;
                        res.send({
                            "code": 200,
                            "success": "عاشت ايدك"
                        });
                    } catch (err) {
                       if (err.code === 'ER_DUP_ENTRY') {
                           //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                       } else {
                           //handleHttpErrors(err.message);
                        }
                    }
                        
                    }
                 });
                console.log('The solution is: ', results);
            if (error) throw error;
            res.send({
                "code": 200,
                "success": "عاشت ايدك"
            });
        } catch (err) {
           if (err.code === 'ER_DUP_ENTRY') {
               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
           } else {
               //handleHttpErrors(err.message);
            }
        }
            
        }
     });
    
    
    
    
     });
 

     app.post('/vertion', function (req, res) {
        mc.query("select id from users where users.u_phone='"+req.body.v_phone+"'", function (error, result, fields) {
            if (error) {
                  console.log("error");
                res.send({
                    "code": 404,
                    "MSG": "no user whith that phone"
                });
         
                
         
            } else {
                try {
                    let uid=result[0].id;
                    console.log(result[0].id);
                    var data = {
                        // "id":req.id,
                     "v_email":req.body.v_email,
                     "v_placeOforder":req.body.v_placeOforder,
                     "v_typeOfmarrige":req.body.v_typeOfmarrige,
                     "v_sex":req.body.v_sex,
                     "v_placeOfbirth":req.body.v_placeOfbirth,
                     "v_firstname":req.body.v_firstname,
                     "v_fathersName":req.body.v_fathersName,
                     "v_grandfatherName":req.body.v_grandfatherName,
                     "v_surname":req.body.v_surname,
                     "v_motherName":req.body.v_motherName,
                     "v_motherFather":req.body.v_motherFather,
                     "v_provinceCountry":req.body.v_provinceCountry,
                     "v_maritalStatus":req.body.v_maritalStatus,
                     "v_profession":req.body.v_profession,
                     "v_dateOfbirth":req.body.v_dateOfbirth,
                     "v_nationaliIDNumber":req.body.v_nationaliIDNumber,
                     "v_phone":req.body.v_phone,
                     "v_address":req.body.v_address,
                     "v_image":req.body.v_image,  
                     "user_id":uid
                      //"users": { "id": "1"}
                     // },
                  }
                  
                    mc.query('INSERT INTO replacementofvertionpassport SET?', data, function (error, results, fields) {
                        if (error) {
                              console.log(error);
                            res.send({
                                "code": 404,
                                "MSG": "error"
                            });
                     
                            
                     
                        } else {
                            try {
                                // console.log('The solution is: ', results);
                            if (error) throw error;
                            res.send({
                                "code": 200,
                                "success": "عاشت ايدك"
                            });
                        } catch (err) {
                           if (err.code === 'ER_DUP_ENTRY') {
                               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                           } else {
                                                     }
                        }
                            
                        }
                     });
                    console.log('The solution is: ', results);
                if (error) throw error;
                res.send({
                    "code": 200,
                    "success": "عاشت ايدك"
                });
            } catch (err) {
               if (err.code === 'ER_DUP_ENTRY') {
                   //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
               } else {
                    
                   //handleHttpErrors(err.message);
                }
            }
                
            }
         });
        
        
        
        
         });
     


/*
app.post('/home', (req, res) => {

let data={
    //"id":req.id,
   "n_email":req.body.n_email,
   "n_placeOforder":req.body.n_placeOforder,
   "n_typeOfmarrige":req.body.n_typeOfmarrige,
   "n_sex":req.body.n_sex,
  "n_placeOfbirth":req.body.n_placeOfbirth,
  "n_firstname":req.body.n_firstname,
  "n_fathersName":req.body.n_fathersName,
   "n_grandfatherName":req.body.n_grandfatherName,
   "n_surname":req.body.n_surname,
   "n_motherName":req.body.n_motherName,
   "n_motherFather":req.body.n_motherFather,
   "n_provinceCountry":req.body.n_provinceCountry,
   "n_maritalStatus":req.body.n_maritalStatus,
   "n_profession":req.body.n_profession,
   "n_dateOfbirth":req.body.n_dateOfbirth,
   "n_nationaliIDNumber":req.body.n_nationaliIDNumber,
   "n_address":req.body.n_address,
  "n_image":req.body.n_image,
  "n_image2":req.body.n_image2,

}

let sql1 = ` 
SELECT DNA.*,DNA_EC.password,sum(DNA.points) as pointss
from DNA,DNA_EC 
where DNA_EC.email = DNA.email AND DNA_EC.code = '${data.email}' and password = '${data.password}'
GROUP by DNA.email
`;

mc.query(sql1, function (error, results, fields) {
    console.log("/")
   if (error) {
        console.log(error);
        return res.send(error);
    }

    else {
        console.log(data)
        return res.send(results);
    }
});

});
*/




/*
 
 app.put('/update', (req, res) => {

    let data={
        "id":req.body.id,    //prk
        "fullname":req.body.fullname, //coulums want change
        "u_phone":req.body.u_phone,
       
       
       
    }


    let sql1 =  `UPDATE signin SET fullname = "${data.fullname}" ,u_phone = "${data.u_phone}" where id =  ${data.id} ` ;
    mc.query(sql1, function (error, results, fields) {
        console.log("update called")
        if (error) {
            console.log(error);
            return res.send(error);
        }

        else {
            console.log(data)
            return res.send(results);
        }
    });
    

});


app.post('/renew2', function (req, res) {

   
    var data = {
      // "id":req.id,
   "rn_email":req.body.rn_email,
   "rn_placeOforder":req.body.rn_placeOforder,
   "rn_typeOfmarrige":req.body.rn_typeOfmarrige,
   "rn_sex":req.body.rn_sex,
  "rn_placeOfbirth":req.body.rn_placeOfbirth,
  "rn_firstname":req.body.rn_firstname,
  "rn_fathersName":req.body.rn_fathersName,
   "rn_grandfatherName":req.body.rn_grandfatherName,
   "rn_surname":req.body.rn_surname,
   "rn_motherName":req.body.rn_motherName,
   "rn_motherFather":req.body.rn_motherFather,
   "rn_provinceCountry":req.body.rn_provinceCountry,
   "rn_maritalStatus":req.body.rn_maritalStatus,
   "rn_profession":req.body.rn_profession,
   "rn_dateOfbirth":req.body.rn_dateOfbirth,
   "rn_nationaliIDNumber":req.body.rn_nationaliIDNumber,
   "rn_phone":req.body.rn_address,
   "rn_address":req.body.rn_address,
  "rn_image":req.body.rn_image,
  
      
}



mc.query('INSERT INTO renewpassport SET ?', data, function (error, results, fields) {
    if (error) {
 
        res.send({
            "code": 404,
            "MSG": "تمام"
        });
 
        try {
            
        } catch (err) {
           if (err.code === 'ER_DUP_ENTRY') {
               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
           } else {
               //handleHttpErrors(err.message);
            }
        }
 
    } else {
        console.log('The solution is: ', results);
        if (error) throw error;
        res.send({
            "code": 200,
            "success": "عاشت ايدك"
        });
    }
 });
 });
 


 /// POST replacement of lose passport

app.post('/lost2', function (req, res) {

   
    var data = {
       // "id":req.id,
   "L_email":req.body.L_email,
   "L_placeOforder":req.body.L_placeOforder,
   "L_typeOfmarrige":req.body.L_typeOfmarrige,
   "L_sex":req.body.L_sex,
  "L_placeOfbirth":req.body.L_placeOfbirth,
  "L_firstname":req.body.L_firstname,
  "L_fathersName":req.body.L_fathersName,
   "L_grandfatherName":req.body.L_grandfatherName,
   "L_surname":req.body.L_surname,
   "L_motherName":req.body.L_motherName,
   "L_motherFather":req.body.L_motherFather,
   "L_provinceCountry":req.body.L_provinceCountry,
   "L_maritalStatus":req.body.L_maritalStatus,
   "L_profession":req.body.L_profession,
   "L_dateOfbirth":req.body.L_dateOfbirth,
   "L_nationaliIDNumber":req.body.L_nationaliIDNumber,
   "L_phone":req.body.L_phone,
   "L_address":req.body.L_address,
  "L_image":req.body.L_image,   
}



mc.query('INSERT INTO replacementoflosepassport SET ?', data, function (error, results, fields) {
    if (error) {
 
        res.send({
            "code": 404,
            "MSG": "تمام"
        });
 
        try {
            
        } catch (err) {
           if (err.code === 'ER_DUP_ENTRY') {
               //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
           } else {
               //handleHttpErrors(err.message);
            }
        }
 
    } else {
        console.log('The solution is: ', results);
        if (error) throw error;
        res.send({
            "code": 200,
            "success": "عاشت ايدك"
        });
    }
 });
 });
 ///////////
*/




















