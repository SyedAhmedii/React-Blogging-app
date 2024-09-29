import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./Firebase";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signUpUser = async (obj, profileImage) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, obj.email, obj.password);
    obj.id = res.user.uid; 
    delete obj.password; 


    const imageUrl = await uploadImage(profileImage, obj.id);
    obj.imageUrl = imageUrl; 

    await addDoc(collection(db, "users"), obj); 
    console.log("User added to database successfully");
  } catch (error) {
    console.error("Error signing up user:", error);
    throw new Error(error.message);
  }
};


const loginUser = async (obj) => {
  try {
    await signInWithEmailAndPassword(auth, obj.email, obj.password);
    const q = query(collection(db, "users"), where("id", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    let userData = null;

    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });

    return userData; 
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error(error.message);
  }
};


const signOutUser = async () => {
  try {
    await signOut(auth);
    return "User signed out successfully";
  } catch (error) {
    console.error("Error signing out user:", error);
    throw new Error(error.message);
  }
};

const uploadImage = async (file, userId) => {
  const storageRef = ref(storage, `profilePictures/${userId}/${file.name}`); 
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url; 
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error occurred while uploading image");
  }
};


const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  const userDocRef = doc(db, "users", user.uid); 
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return { ...userDoc.data(), id: user.uid }; 
  } else {
    throw new Error("No user data found.");
  }
};


const sendData = async (obj, colName) => {
  try {
    await addDoc(collection(db, colName), obj);
    return "Data sent to database successfully";
  } catch (error) {
    console.error("Error sending data to Firestore:", error);
    throw new Error(error.message);
  }
};


const getData = async (colName, uid) => {
  try {
    const dataArr = [];
    const q = query(collection(db, colName), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });

    return dataArr;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    throw new Error("Error occurred while fetching data");
  }
};


const getAllData = async (colName) => {
  try {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, colName));

    querySnapshot.forEach((doc) => {
      const obj = { ...doc.data(), documentId: doc.id };
      dataArr.push(obj);
    });

    return dataArr; 
  } catch (error) {
    console.error("Error fetching all data from Firestore:", error);
    throw new Error("Error occurred while fetching all data");
  }
};


const deleteDocument = async (id, name) => {
  try {
    await deleteDoc(doc(db, name, id));
    return "Document deleted successfully";
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Error occurred while deleting document");
  }
};


const updateDocument = async (obj, id, name) => {
  try {
    const updateRef = doc(db, name, id);
    await updateDoc(updateRef, obj);
    return "Document updated successfully";
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Error occurred while updating document");
  }
};


export {
  auth,
  db,
  signUpUser,
  loginUser,
  signOutUser,
  sendData,
  getData,
  getAllData,
  deleteDocument,
  updateDocument,
  uploadImage,
  getUserData, 
};
