
// Import the MongoClient class from the mongodb package
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

// Create a new MongoClient
const client = new MongoClient(url);

async function main() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected successfully to server');

    // Select the database through the client
    const db = client.db(dbName);

    // Get the collection
    const collection = db.collection('mycollection');

    // Find and print the document
    const documentToDelete = await collection.findOne({ name: 'Rutvij patel' });
    if (documentToDelete) {
      console.log('Document found:', documentToDelete);

      // Delete the document
      const deleteResult = await collection.deleteOne({ name: 'Rutvij patel' });
      if (deleteResult.deletedCount === 1) {
        console.log('Successfully deleted the document');
      } else {
        console.log('No documents matched the query. Deleted 0 documents.');
      }
    } else {
      console.log('No document matched the query for deletion.');
    }

  } catch (error) {
    console.error('An error occurred while connecting to MongoDB:', error);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.error);


