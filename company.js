const { MongoClient} =require('mongodb')

const url = 'mongodb://localhost:27017';

const dbName= 'company'

const client= new MongoClient(url);

async function performCRUDoperations(){
    try {
        await client.connect();
        console.log('connected successfully to server');

        const db=client.db(dbName);
        const collection =db.collection("Employee")

        
        const documentsToInsert = [
            { name: 'Alice Johnson', age: 30, email: 'alice.johnson@example.com' },
            { name: 'Bob Smith', age: 25, email: 'bob.smith@example.com' },
            { name: 'Charlie Brown', age: 35, email: 'charlie.brown@example.com' }
          ];
          const insertResult = await collection.insertMany(documentsToInsert);
          console.log('Inserted document IDs:', insertResult.insertedIds);

        const updateResult=await collection.updateOne({name:'Charlie Brown'},{$set:{age:50}})
        console.log("updated:",updateResult)
         
        const documents = await collection.find({}).toArray();
        console.log('Documents:', documents);
    

        const Delete= await collection.deleteOne({ name: 'Bob Smith' });
        console.log('Deleted count:', Delete.deletedCount);

    } catch (error) {
        console.error("An error occured:",error);
    } finally {
        await client.close();
    }
}
performCRUDoperations().catch(console.error);