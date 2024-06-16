import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const readDataFromMongo = async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL as string);
        console.log("DB Connected");
        const database = client.db();
        const collection = database.collection("todos");

        let dataFromMongo = await collection.find().toArray();
        console.log(dataFromMongo);
    } catch (error) {
        console.error("Connection error:", error);
    }
}



export const postDataToMongo = async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL as string); 
        const database = client.db();
        const collection = database.collection("todos");

//SENDING
        let sendDataToMongo = await collection.insertOne({
            'name': "vedant",
            'email': "vedant@gmail.com"
        });

        // let sendDataToMongo = await collection.insertMany([
        //     {
        //         'name':"Vedant",
        //         'email':"vedant@gmail.com"
        //     },
        //     {
        //         'name':"Ishwari",
        //         'email':"ishwari@gmail.com"
        //     },
        //     {
        //         'name':"janhavi",
        //         'email':"janhavi@gmail.com"
        //     }
        // ]);

        // console.log(sendDataToMongo);
        
//READING,DELETING,UPDATING
        // const filter={
        //     'name':'janhavi'
        // };

        // const newData={
        //     'email':" email"
        // };

        // let readDataFromMongo = await collection.findOne(filter);
        // console.log(readDataFromMongo);

        // let deleteDataFromMongo = await collection.deleteOne(filter);
        // console.log(deleteDataFromMongo);

            // let updateDataFromMongo=await collection.updateOne(filter,newData);
            // console.log(updateDataFromMongo);
            //ERROR RESOLVE IT

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; 
    }
};


