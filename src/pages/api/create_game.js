import firebase from 'firebase/app';
import 'firebase/database';
// import firebase config
import firebaseConfig from '../../firebase/config';

// Check if Firebase is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Reference to the root of your Firebase Realtime Database
const database = firebase.database();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            // generate a 6 digit random number
            const random_number = Math.floor(100000 + Math.random() * 9000);
            
            const newData = {
                
            };

            // Generate a new unique key for the document
            const newDocumentKey = database.ref().child('documents').push().key;

            // Define the data to be stored in the document
            const documentData = {
                id: newDocumentKey,
                ...newData,
            };

            // Create the new document
            const updates = {};
            updates['/documents/' + newDocumentKey] = documentData;

            // Commit the updates to the database
            await database.ref().update(updates);

            console.log('New document created successfully!');

            res.status(200).json({ message: 'New document created successfully!' });
        } catch (error) {
            console.error('Error creating new document:', error);

            res.status(500).json({ error: 'Error creating new document' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
