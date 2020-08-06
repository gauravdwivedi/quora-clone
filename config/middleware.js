const jwt = require('jsonwebtoken');


const verifyToken = async function(req,res,next){
    try{
    
        console.log(req);

    let tokenValue =  jwt.verify(req,'ftf');
        console.log(tokenValue);
    if(tokenValue){

        req.tokenValue =  tokenValue.user._id;
       return next;
    }else{
        return console.log('Not verified');
    }
    }catch(err){
            console.log('error',err);
    }
}

module.exports= verifyToken;