//Github link: https://github.com/rizzzigit/jikan4.js
//Documentation link: https://rizzzigit.github.io/jikan4.js/classes/v4.PersonMeta.html

import Jikan, { Manga } from 'jikan4.js'

const client = new Jikan.Client()

// When you search, we want a dropdown menu of all options the user can click on
// This route will process all the possible things the user might mean when they search
// if empty then there is no search which is matching 
// Input: String being user's search query
// Output: Array of possible mangas
export function getMangaSearch(searchquery){

}


// Get the manga information by the name. 
//This is used to populate the Manga Information when you click on it 
// Input: String being Manga's name
// Output: Array of Manga objects
export function getMangaInfoByName(MangaName){

}

// Get the manga information by the category 
// This is used to populate the columns when the user clicks on it 
// Input: String being category name
// Output: Array of Manga objects
export function getMangaInfoByCategory(CategoryName) {

}


//Here's an example: 

async function printSearch(searchString) {
    const result = (await client.manga.search(searchString)).map((manga) => {
        return {
            title: manga.title.default,
            authors: manga.authors,
            popularity: manga.popularity,
        }
    })

    console.log(result)
}

printSearch('oshi no ko')

