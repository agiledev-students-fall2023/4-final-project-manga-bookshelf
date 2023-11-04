import Jikan, { Manga } from 'jikan4.js'

const client = new Jikan.Client()

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