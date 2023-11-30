//takes in an array and current Manga Id and returns true if exists and false if not
function isFavorite(FavoriteArray, currentId){

    if (FavoriteArray === undefined){
        console.error("Something has gone wrong") 
        return false
    }

    if (FavoriteArray.length === 0){
        return false
    }
    const result = [] 
    FavoriteArray.forEach(ele => result.push(ele["__id"]))
    return result.some(ele => ele === currentId)
}


export {
    isFavorite
}