import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllData } from '../config/FirebaseMethod';

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const blogsData = await getAllData("blogs");
                const usersData = await getAllData("users");

                const blogsWithUserData = blogsData.map((blog) => {
                    const blogUser = usersData.find((user) => user.uid === blog.userId);
                    return {
                        ...blog,
                        username: blogUser ? blogUser.username : "Unknown",
                        profilePicture: blogUser ? blogUser.imageUrl : "",
                    };
                });

                setAllBlogs(blogsWithUserData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, []);

    return (
        <>
            <header className='bg-gray-200 p-5'>
                <h1 className="text-5xl font-bold">All Blogs</h1>
            </header>
            <div className="flex flex-col mt-10 gap-5 mb-5">
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
                        <Link to={`/user/${blog.userId}`} className="text-blue-600 hover:underline mt-3">
                            All blogs from this user
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;

















