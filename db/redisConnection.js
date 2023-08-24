const redis = require('redis');


const Connection =  async() => {

    try{
        const redisClient = redis.createClient({
            url: Process.env.REDIS_URL
           
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
