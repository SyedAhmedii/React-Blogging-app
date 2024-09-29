import React, { useState, useEffect } from 'react';
import { getAllData } from '../config/FirebaseMethod'; 

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]); 

    useEffect(() => {
        const fetchAllData = async () => {
            try {

                const blogsData = await getAllData("blogs");
                const usersData = await getAllData("users");

                console.log("Blogs Data:", blogsData); 
                console.log("Users Data:", usersData); 


                const blogsWithUserData = blogsData.map((blog) => {

                    const blogUser = usersData.find((user) => user.uid === blog.userId); 
                    return {
                        ...blog,
                        username: blogUser ? blogUser.username : "Unknown", 
                        profilePicture: blogUser ? blogUser.imageUrl : "", 
                    };
                });

                console.log("Mapped Blogs Data:", blogsWithUserData); 

                setAllBlogs(blogsWithUserData); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData(); 
    }, []);

    return (
        <>
            <h1 className="text-5xl font-bold ml-5 mt-10">All Blogs</h1>
            <div className="flex flex-col mt-10 gap-5">
                {allBlogs.map((blog) => (
                    <div key={blog.id} className="flex flex-col w-[900px] min-h-[150px] rounded-2xl bg-gray-200 shadow-md shadow-black mx-20 px-10 py-5">
                        <div className="flex items-center">
                            {blog.profilePicture ? (
                                <img src={blog.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-400 mr-3" /> 
                            )}
                            <div>
                                <h2 className="text-2xl font-bold">{blog.title}</h2>
                                <p className="text-sm font-medium text-gray-600">By: {blog.username}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-lg">{blog.paragraph}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
