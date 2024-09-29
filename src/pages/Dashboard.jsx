import React, { useState, useEffect } from 'react';
import { db, auth } from '../Config/Firebase'; // Adjust the import path as necessary
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const user = auth.currentUser; // Get the currently logged-in user
      if (user) {
        const blogsCollection = collection(db, 'blogs'); // Reference to the 'blogs' collection
        const q = query(blogsCollection, where("userId", "==", user.uid)); // Query to fetch user's blogs
        const querySnapshot = await getDocs(q);

        const userBlogs = [];
        querySnapshot.forEach((doc) => {
          userBlogs.push({ id: doc.id, ...doc.data() }); // Add the blog to the userBlogs array
        });
        setBlogs(userBlogs); // Update state with fetched blogs
      }
    };

    fetchBlogs(); // Call the fetch function
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const user = auth.currentUser; // Get the currently logged-in user

    // Only add the blog if both title and paragraph are filled
    if (title && paragraph && user) {
      try {
        // Add the blog to Firestore
        await addDoc(collection(db, 'blogs'), {
          title,
          paragraph,
          userId: user.uid, // Store the user's ID with the blog
        });
        // Add the new blog to the state
        setBlogs([...blogs, { title, paragraph }]);
        setTitle(''); // Clear the title input
        setParagraph(''); // Clear the paragraph input
      } catch (error) {
        console.error("Error adding blog: ", error);
      }
    }
  };

  return (
    <>
      <header className='bg-gray-200 '>
        <h1 className='text-5xl font-bold m-0 p-5'>Dashboard</h1>
      </header>
      <div className='flex mt-10'>
        <div className='flex flex-col w-[900px] min-h-[400px] rounded-2xl bg-white shadow-md shadow-black mx-20 px-10'>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            {/* Input for title */}
            <input
              className='mt-20 w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black'
              placeholder='Title'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /><br />

            {/* Textarea for paragraph */}
            <textarea
              className='w-full h-40 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black resize-none'
              placeholder='Write your paragraph here'
              rows="4"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-5 py-2 mt-5 rounded-lg bg-gray-400 font-medium text-xl border-2 border-black text-black hover:text-gray-400 hover:bg-black hover:border-gray-400"
            >
              Add Blog
            </button>
          </form>
        </div>
      </div>
      <h1 className='text-5xl font-bold mt-5 ml-5'>My Blogs</h1>
      <div className='flex flex-col mt-10'>
        {blogs.map((blog) => (
          <div key={blog.id} className='flex flex-col w-[900px] min-h-[150px] rounded-2xl bg-gray-200 shadow-md shadow-black mx-20 px-10 py-5 mb-5'>
            <h2 className='text-2xl font-bold'>{blog.title}</h2> {/* Display the blog title */}
            <p className='mt-3 text-lg'>{blog.paragraph}</p> {/* Display the blog paragraph */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;

