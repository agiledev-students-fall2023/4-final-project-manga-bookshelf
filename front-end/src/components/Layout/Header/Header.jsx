import React from 'react'
import "./Header.css"
import { Outlet } from "react-router-dom";

//TODO: add number after the profile route and manga route 

export default function Header() {
    return (
        <>
            <div className="Header-sidebar">
                <h1>Manga Bookshelf for the Nerds</h1>
                <div>
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
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href={`/dashboard`}>Dashboard</a>
                        </li>
                        <li>
                            <a href={`/manga/1`}>Mangas</a>
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
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}