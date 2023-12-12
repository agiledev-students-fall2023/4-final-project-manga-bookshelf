import React, { useState } from 'react'
import "./Header.css"
import styles from "./Turnstone.module.css"; //custom styles for turnstone
import { Outlet } from "react-router-dom";

import Hamburger from "hamburger-react"
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ForumIcon from '@mui/icons-material/Forum';
import SearchIcon from '@mui/icons-material/Search';
import Turnstone from 'turnstone';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
//TODO: add number after the profile route and manga route 

export default function Header() {
    const [isOpen, setOpen] = useState(false); 
    const [results, setResults] = useState("") 
    const [selectedItem, setSelectedItem] = useState({})

    //Define constant styles to use Turnstone 
    const maxItems = 6

    const listbox = [
        {
            id: 'mangas',
            name: 'Manga Titles',
            ratio: 6,
            displayField: 'title',
            data: (query) =>
                fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/search2/${encodeURIComponent(query)}`)
                    .then(res => res.json()),
            searchType: 'contains'
        },
        {
            id: 'users',
            name: 'Users',
            ratio: 2,
            data: (query) =>
                fetch(`${process.env.REACT_APP_BACKEND_URL}/user/search/${encodeURIComponent(query)}`)
                    .then(res => res.json()),
            searchType: 'startswith'
        }
    ]

    const navigate = useNavigate()
    const turnstoneRef = useRef();

    // I really haven't found a good idea to handle different search for users and mangas
    // right now, i just check the search result and see if it has username or title to figure out which search I should use
    // it works but this is definitely not the proper way to do this
    // -- Steven
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // console.log(selectedItem)
        if ('username' in selectedItem) {
            navigate(`/profile/${selectedItem.username}`)
        }
        else if ('title' in selectedItem) {
            const payload1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/mangasearch/${encodeURIComponent(results)}`)
            const data1 = await payload1.json() 
            // console.log(data1) 
            turnstoneRef.current?.clear();
            // setResults("")
            navigate(`/manga/${data1.__id}`)
        }
    }


    const handleSelect = (item) => {
        // console.log(item)
        if (item === undefined) return
        else {
            setSelectedItem(item)
        }
    }

    return (
        <>
            <div className="Header-sidebar">
                <div>
                <div>
                    <div className="Header-navigation-sm">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                    <form id="search-form" role="search">
                        <Turnstone
                            autoFocus={true}
                            listbox={listbox}
                            id="autocomplete"
                            placeholder="Search"                        
                            debounceWait={500}
                            maxItems={maxItems}
                            noItemsMessage="No Manga Matched Your Search"
                            styles={styles}
                            typeahead= {false}
                            onChange={(e) => setResults(e)}    
                            onSelect={handleSelect}
                            text = {results}
                            ref={turnstoneRef}
                        />
                    </form>
                    <form method="post" onSubmit={handleSubmit}>
                        <button id="Header-search-button" type="submit"><SearchIcon/></button>
                    </form>
                </div>

                <div className="Header-nav">
                    <nav>
                        <ul>
                            <li>
                                <a href={`/dashboard`}><DashboardIcon />Dashboard</a>
                            </li>
                            <li>
                                <a href={`/manga`}><MenuBookIcon />Mangas</a>
                            </li>
                            <li>
                                <a href={`/forum`}><ForumIcon />Forum</a>
                            </li>
                            <li>
                                <a href={`/profile/${JSON.parse(localStorage.getItem('user')).username}`}> <PersonIcon />My Profile</a>
                            </li>
                            <li>
                                <a href={`/setting`}><SettingsIcon />Setting</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                </div>
                <div className="Header-navigation-sm">
                    {isOpen ? (
                        <nav>
                            <ul>
                                <li>
                                    <a href={`/dashboard`}><DashboardIcon />Dashboard</a>
                                </li>
                                <li>
                                    <a href={`/manga`}><MenuBookIcon />Mangas</a>
                                </li>
                                <li>
                                <a href={`/forum`}><ForumIcon />Forum</a>
                                </li>
                                <li>
                                    <a href={`/profile/${JSON.parse(localStorage.getItem('user')).username}`}> <PersonIcon />My Profile</a>
                                </li>
                                <li>
                                    <a href={`/setting`}><SettingsIcon />Setting</a>
                                </li>
                            </ul>
                        </nav>
                    ) : <div></div>}
                </div>
                <h1><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zdAaFVsGNacayufT9toiM64TxnGQyDpi2A&usqp=CAU"} />Manga Bookshelf</h1>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}