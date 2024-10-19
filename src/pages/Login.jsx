// import React, { useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/Firebase'; 
// import { ToastContainer, toast } from 'react-toastify';

// const Login = () => {
//     const navigate = useNavigate();
//     const emailRef = useRef();
//     const passwordRef = useRef();
//     const [showPassword, setShowPassword] = useState(false);

//     const handleLogin = (e) => {
//         e.preventDefault();
//         const email = emailRef.current.value;
//         const password = passwordRef.current.value;

//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log('Login successful:', user);

//                 navigate('/dashboard');
//             })
//             .catch((error) => {
//                 const errorMessage = error.message;
//                 toast.error(errorMessage); 
//             });
//     };

//     return (
//         <>
//             <div className='flex justify-center items-center mt-10'>
//                 <div className='flex flex-col justify-center items-center w-[450px] min-h-[450px] rounded-2xl bg-gray-300 shadow-md shadow-black mx-20 px-10'>
//                     <h1 className='text-5xl font-bold'>Login</h1>
//                     <form className='flex flex-col justify-center items-center w-full' onSubmit={handleLogin}>
//                         <input
//                             className='w-full mt-10 h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black'
//                             type="email"
//                             placeholder='Email'
//                             ref={emailRef}
//                         /><br />
//                         <div className='relative w-full'>
//                             <input
//                                 className='w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black'
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder='Password'
//                                 ref={passwordRef}
//                             /><br />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
//                             >
//                                 {showPassword ? 'Hide' : 'Show'}
//                             </button>
//                         </div>
//                         <button className="px-5 py-2 mt-5 rounded-lg bg-gray-400 font-medium text-xl border-2 border-black text-black hover:text-gray-400 hover:bg-black hover:border-gray-400">
//                             Login
//                         </button>
//                         <p className='mt-2'>
//                             Not a User? <span className='text-indigo-700 cursor-pointer'>
//                                 <Link to={'/sigup'}>Sign-up</Link>
//                             </span>
//                         </p>
//                     </form>
//                     <ToastContainer />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;




import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported for toast styles

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Login successful:', user);
                navigate('/dashboard'); // Redirect to dashboard after successful login
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                    toast.error('User not found. Please sign up first!');
                } else if (errorCode === 'auth/wrong-password') {
                    toast.error('Wrong password. Please try again.');
                } else if (errorCode === 'auth/invalid-email') {
                    toast.error('Invalid email format.');
                } else {
                    toast.error('Login failed. Please try again later.');
                }
            });
    };

    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <div className="flex flex-col justify-center items-center w-[450px] min-h-[450px] rounded-2xl bg-gray-300 shadow-md shadow-black mx-20 px-10">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <form className="flex flex-col justify-center items-center w-full" onSubmit={handleLogin}>
                        <input
                            className="w-full mt-10 h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black"
                            type="email"
                            placeholder="Email"
                            ref={emailRef}
                        />
                        <br />
                        <div className="relative w-full">
                            <input
                                className="w-full h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                ref={passwordRef}
                            />
                            <br />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <button className="px-5 py-2 mt-5 rounded-lg bg-gray-400 font-medium text-xl border-2 border-black text-black hover:text-gray-400 hover:bg-black hover:border-gray-400">
                            Login
                        </button>
                        <p className="mt-2">
                            Not a User? <span className="text-indigo-700 cursor-pointer">
                                <Link to={'/sigup'}>Sign-up</Link>
                            </span>
                        </p>
                    </form>
                    <ToastContainer /> 
                </div>
            </div>
        </>
    );
};

export default Login;
