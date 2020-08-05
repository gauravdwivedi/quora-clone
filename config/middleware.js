const jwt = require('jsonwebtoken');


const verifyToken =  function(req,res,next){
    
    
        console.log(req);

    let tokenValue =  jwt.verify(req,'ftf');

    if(tokenValue){

        req.tokenValue =  tokenValue.user._id;
        next;
    }else{
            
    }

}

module.exports= verifyToken;