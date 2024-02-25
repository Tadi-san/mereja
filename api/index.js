const admin = require('firebase-admin');
const cors = require('cors')
const express = require('express');
const serviceAccount = require(__dirname +'/cred/credentials.json'); 
// const db = admin.firestore();
const app = express();

const devOrigin = ['https://mereja-virid.vercel.app', "https://mereja-git-main-tadi-sans-projects.vercel.app"];
app.use(
  cors({
    origin:devOrigin,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'one-for-all-v2.appspot.com' // Replace with your Firebase Storage bucket URL
});

const bucket = admin.storage().bucket();

async function getImageUrl(path) {
  try {
    const file = bucket.file(path);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2025' // Set an expiration date or duration as needed
    });

    return url;
  } catch (error) {
    console.error('Error retrieving image:', error);
    throw error;
  }
}

// Usage example
// const imagePaths = ['post/photo_2024-02-18_07-02-39.jpg', 'post/photo_2024-02-19_09-15-22.jpg']; // Replace with an array of paths to your images in Firebase Storage




// Define a route to retrieve data from Firebase and send it back as a response
app.use(express.json());
app.post('/data', async (req, res) => {
  try {
    const field = req.body.field;
    const snapshot = await admin.firestore().collection('Posts').where('category', '==', field).get();

    const data = await Promise.all(snapshot.docs.map(async (doc) => {
      const imageLink = [];
      const photos = doc.data().photos;

      if (photos && Array.isArray(photos) && photos.length > 0) {
        const urls = await Promise.all(photos.map(getImageUrl));
        urls.forEach((url) => {
          imageLink.push(url);
        });
      }

      const docData = doc.data();
      docData.imgLink = imageLink;
      return docData;
    }));

    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});
  // .catch((error) => {
  //   console.error('Error retrieving data:', error);
  // })
// }
  // );

// Start the Express server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
