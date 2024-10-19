import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../config/Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { uploadImage } from '../config/FirebaseMethod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const newUser = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const username = usernameRef.current.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const imageUrl = await uploadImage(profileImage, user.uid);

            await setDoc(doc(db, 'users', user.uid), {
                username,
                email,
                uid: user.uid,
                imageUrl,
            });

            toast.success('Signup successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('This email is already exist. Please Try with different email');
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <div className='flex justify-center items-center mt-10'>
                <div className='flex flex-col justify-center items-center w-[450px] min-h-[500px] rounded-2xl bg-gray-300 shadow-md shadow-black mx-20 px-10'>
                    <h1 className='text-5xl font-bold'>Signup</h1>
                    <form className='flex flex-col justify-center items-center w-full' onSubmit={newUser}>
                        <input
                            className='w-full mt-10 h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black'
                            type="text"
                            placeholder='Username'
                            ref={usernameRef}
                        /><br />
                        <input
                            className='w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black'
                            type="email"
                            placeholder='Email'
                            ref={emailRef}
                        /><br />
                        <div className='relative w-full'>
                            <input
                                className='w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                ref={passwordRef}
                            /><br />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <input
                            className='w-full mt-5 h-[3.34rem] bg-transparent border-2 border-black rounded-xl p-3'
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                        <button className="px-5 py-2 mt-5 rounded-lg bg-gray-400 font-medium text-xl border-2 border-black text-black hover:text-gray-400 hover:bg-black hover:border-gray-400">
                            Signup
                        </button>
                        <p className='mt-2'>
                            Already a User? <span className='text-indigo-700 cursor-pointer'>
                                <Link to={'/login'}>Login</Link>
                            </span>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default Signup;
