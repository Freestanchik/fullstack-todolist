import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

import './Navbar.scss'

const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext)

    return (
        <nav>
            <div className="nav-wrapper navbar blue">
            <a href="/" className="brand-logo">Fullstack Todo App</a>
            {
                isLogin
                ?   <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/" onClick={logout}>Вийти</a></li>
                    </ul>
                :   <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/">Увійти</a></li>
                    </ul>
            }
            </div>
        </nav>
    )
}

export default Navbar
