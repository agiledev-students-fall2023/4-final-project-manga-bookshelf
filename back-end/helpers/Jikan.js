//Github link: https://github.com/rizzzigit/jikan4.js
//Documentation link: https://rizzzigit.github.io/jikan4.js/classes/v4.PersonMeta.html
// TODO: Write unit tests for these functions

import Jikan from 'jikan4.js'

const client = new Jikan.Client()

// When you search, we want a dropdown menu of all options the user can click on
// This function will process all the possible things the user might mean when they search
// if empty then there is no search which is matching 
// Input: String being user's search query
// Output: Array of possible mangas
async function getMangaSearch(searchquery){
    const result = (await client.manga.search(searchquery)).map((manga) => {
        return {
            title: manga.title.default,
            authorName: manga.authors[0].name,
            authorImage: manga.authors[0].url,
            popularity: manga.popularity,
            image: manga.image.jpg,
            __id: manga.id, 
        }
    })
    console.log(result)
    return result 
}


// Get the manga information by the name. 
// This is used to populate the Manga Information when you click on it 
// Input: String being Manga's name
// Output: Array of Manga objects
async function getMangaInfoById(MangaId){
    const mangaObject = await client.manga.get(MangaId)
    if (mangaObject.authors.length !== 0 || mangaObject.authors !== null) { //make sure this field is defined
        const result = {
            __id: mangaObject.id,
            url: mangaObject.url,
            image: mangaObject.image,
            title: mangaObject.title.default,
            score: mangaObject.score,
            popularity: mangaObject.popularity,
            synopsis: mangaObject.synopsis,
            background: mangaObject.background,
            type: mangaObject.type,
            chapters: mangaObject.chapters,
            volumes: mangaObject.volumes,
            author: mangaObject.authors[0].name,
            authorImage: mangaObject.authors[0].url,
            authorId: mangaObject.authors[0].id,
        }
        console.log(result)
        return result
    }
}

// Get the manga information by the category 
// This is used to populate the columns when the user clicks on it 
// Input: String being category name
// Output: Array of Manga objects
async function getMangaInfoByGenres(GenreName) {
    // const result = await client.manga.getRecommendations
    
}

// Get manga recommendations
// num represent the number of entries you want to get back 
// Input: number of recommendations you want to get back
// Output: array of RecommendationManga objects 
// A RecommendationManga Object look like this: 

// RecommendationManga {
//     content: 'Both stories have supernatural themes and some similar dynamics between the main characters. Alto is devoted to the one he loves in a similar way that Ten is, and even looks a bit similar!',
//         date: 2023 - 11-05T10: 20:00.000Z,
//             user: RecommendationUser { url: [URL], username: 'steamedpumpkin' },
//     entries: [[MangaMeta], [MangaMeta]]
// }
async function getMangaRecommendations(...num){
    let entries = 10
    if (num !== undefined){
        entries = num
    }
    const payload = await client.recommendations.getMangaRecommendations(0, entries);

    let transformed = [];
    // Loop through each result in the payload
    payload.forEach(result => {
        // Loop through each entry within the current result
        result.entries.forEach(entry => {
            // Construct the new object format and push it into the transformed array
            transformed.push({
                __id: entry.id,
                title: entry.title,
                image: entry.image.jpg.default
            });
        });
    });
    return {"result": transformed}
}

// async function printSearch(search) {
//     const result = await client.recommendations.getMangaRecommendations(0, 10); 

//     console.log(result)
// }

// printSearch(1)

export {
    getMangaSearch,
    getMangaInfoById,
    getMangaInfoByGenres, 
    getMangaRecommendations, 
}