import React from "react"
import "./css/navbar.css"


export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">ShellDouble2</a>
        <ul>
            <li>
                <a href="/admin">Admin Log-in</a>
            </li>
        </ul>
    </nav>
}