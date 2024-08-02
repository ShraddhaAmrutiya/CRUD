// Import the MongoClient class from the mongodb package
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'PERson';

// Create a new MongoClient
const client = new MongoClient(url);

async function performCRUDOperations() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected successfully to server');

    // Select the database through the client
    const db = client.db(dbName);

    // Get the collection
    const collection = db.collection('mycollection');

    // --- CREATE: Insert a new document ---
    const insertResult = await collection.insertOne({
      name: 'Alice Johnson',
      age: 30,
      email: 'alice.johnson@example.com'
    });
    console.log('Inserted document ID:', insertResult.insertedId);

    // --- READ: Find and print all documents ---
    const documents = await collection.find({}).toArray();
    console.log('Documents:', documents);

    // --- UPDATE: Update a document ---
    const updateResult = await collection.updateOne(
      { name: 'Alice Johnson' },
      { $set: { age: 31 } }
    );
    console.log('Matched count for update:', updateResult.matchedCount);
    console.log('Modified count for update:', updateResult.modifiedCount);

    // // --- DELETE: Delete a document ---
    const deleteResult = await collection.deleteOne({ name: 'Alice Johnson' });
    console.log('Deleted count:', deleteResult.deletedCount);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

performCRUDOperations().catch(console.error);
