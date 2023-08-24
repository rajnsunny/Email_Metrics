const {mongoose} = require('mongoose')

const dbConnections = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected To MongoDB ==> OK");
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports =  dbConnections;