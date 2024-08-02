const{MongoClient}=require('mongodb');
const url ='mongodb://localhost:27017/';

const dbName ='ItCompany';
const client= new MongoClient(url);
async function performCRUDOperations() {
    try{
    await client.connect();
    console.log('connected successfully to server');
    const db=client.db(dbName);
    const collection=db.collection('employee')

    const insertResult=await collection.insertOne({name:'def', email:'def@gmail.com'})
    console.log("inserted document ",insertResult.insertedId);

    const readResult=await collection.findOne({name:"ABC"})
    console.log("find document:",readResult);

    const updateResult=await collection.updateOne({name:"ABC"},{$set:{email:"abc.abc@gmail.com"}})
    console.log("updated document:", updateResult);

    const deleteResult=await collection.deleteOne({name:'ABC', email:'abc@gmail.com'})
        console.log('delete document:',deleteResult.deletedCount);
    
    }catch(error){
        console.error("An error occured:",error);
    }finally{
        await client.close();
    }
}  performCRUDOperations().catch(console.error);

