// // import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyBY-pCy83G18ucOIJ7ZFsCl97vWRv8jzVE",
//   authDomain: "react-blogging-app123.firebaseapp.com",
//   projectId: "react-blogging-app123",
//   storageBucket: "react-blogging-app123.appspot.com",
//   messagingSenderId: "1015451775679",
//   appId: "1:1015451775679:web:bd735bcbd3aaaa3efa0c0a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export { auth, firestore, storage };

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"; // Import Firestore
// import { getStorage } from "firebase/storage";     // Import Storage

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBY-pCy83G18ucOIJ7ZFsCl97vWRv8jzVE",
//   authDomain: "react-blogging-app123.firebaseapp.com",
//   projectId: "react-blogging-app123",
//   storageBucket: "react-blogging-app123.appspot.com",
//   messagingSenderId: "1015451775679",
//   appId: "1:1015451775679:web:bd735bcbd3aaaa3efa0c0a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// export const auth = getAuth(app);
// export const db = getFirestore(app); // Export Firestore as 'db'
// export const storage = getStorage(app); // Export Storage
//     // Export Storage as 'storage'



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage";     // Import Storage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY-pCy83G18ucOIJ7ZFsCl97vWRv8jzVE",
  authDomain: "react-blogging-app123.firebaseapp.com",
  projectId: "react-blogging-app123",
  storageBucket: "react-blogging-app123.appspot.com",
  messagingSenderId: "1015451775679",
  appId: "1:1015451775679:web:bd735bcbd3aaaa3efa0c0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore as 'db'
export const storage = getStorage(app); // Export Storage

// Only one export statement needed at the end
export default app; // Default export for the app
