const admin = require('firebase-admin');
const serviceAccount = require(__dirname +'/cred/credentials.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const collectionRef = db.collection('Post');

collectionRef.get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((error) => {
    console.error('Error retrieving data:', error);
  });