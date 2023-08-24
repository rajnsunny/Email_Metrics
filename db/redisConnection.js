const redis = require('redis');


const Connection =  async() => {

    try{
        const redisClient = redis.createClient({
            password: process.env.REDIS_PASS,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        })
        redisClient.on('error', (error) => {
            console.error(`Redis Error: ${error}`);
        });

        
        console.log("connected to Redis");

        
        return redisClient;
    }catch(error){
        console.log(`Error: ${error}`)
    }
    

    
      
      

}



module.exports = {Connection}