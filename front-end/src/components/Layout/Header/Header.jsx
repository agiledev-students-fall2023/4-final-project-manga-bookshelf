import React, { useState } from 'react'
import "./Header.css"
import { Outlet } from "react-router-dom";

import Hamburger from "hamburger-react"

//TODO: add number after the profile route and manga route 

export default function Header() {
    
    const [isOpen, setOpen] = useState(false); 

    return (
        <>
            <div className="Header-sidebar">
                <h1>Manga Bookshelf for the Nerds</h1>
                <div>
                    <div className="Header-navigation-sm">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            className="Header-search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="Header-sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">Submit</button>
                    </form>

                </div>
                <div className="Header-nav">
                    <nav>
                        <ul>
                            <li>
                                <a href={`/dashboard`}>Dashboard</a>
                            </li>
                            <li>
                                <a href={`/manga`}>Mangas</a>
                            </li>
                            <li>
                                <a href={`/profile/1`}>My Profile</a>
                            </li>
                            <li>
                                <a href={`/setting`}>Setting</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="Header-navigation-sm">
                    {isOpen ? (
                        <nav>
                            <ul>
                                <li>
                                    <a href={`/dashboard`}>Dashboard</a>
                                </li>
                                <li>
                                    <a href={`/manga`}>Mangas</a>
                                </li>
                                <li>
                                    <a href={`/profile/1`}>My Profile</a>
                                </li>
                                <li>
                                    <a href={`/setting`}>Setting</a>
                                </li>
                            </ul>
                        </nav>
                    ) : <div></div>}
                </div>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}