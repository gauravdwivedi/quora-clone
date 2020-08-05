const jwt = require('jsonwebtoken');


const verifyToken = async function(req,res,next){
    try{
    
        console.log(req);

    let tokenValue = await jwt.verify(req,'ftf');

    if(tokenValue){

        req.tokenValue =  tokenValue.user._id;
        next;
    }
    }catch(err){
        
    }
}

module.exports= verifyToken;