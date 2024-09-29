import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  return (

    <div className="navbar bg-base-100 bg-blue-600">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Blogging App</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl">
          <Link to="/login"><li><a>Login</a></li></Link>
          <li>
                <details>
                    <summary className="flex items-center cursor-pointer">
                        <FontAwesomeIcon icon={faEllipsisH} className="text-black" />
                    </summary>
                    <ul className="bg-base-100 rounded-t-none p-2 ml-3">
                        <Link to="/">
                            <li><a>Home</a></li>
                        </Link>
                        <Link to={'/dashboard'}>
                            <li><a>Dashboard</a></li>
                        </Link>
                        <Link to="/Profile">
                            <li><a>Profile</a></li>
                        </Link>
                    </ul>
                </details>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar