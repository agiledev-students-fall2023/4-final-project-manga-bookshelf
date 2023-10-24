import "./Manga.css"

const Manga = props => {
  // this component expects to receive 'name', 'list', and 'handleClick' values passed as arguments to it
  // react automatically bundles these arguments into an object called props
  // when a user clicks on the article, it calls the provided callback and passes the name and list of the clicked-on manga
  return (
    <article
      className="Manga"
      onClick={() => {
        props.handleClick(props.name, props.list) // list indicates what list the manga is current in 
      }}
    >
      <img className="Manga-img" src={props.mangaImg} alt="Manga" />
      <div className="Manga-details">
        <h1>{props.name}</h1>
        <p>{props.list}</p>
      </div>
    </article>
  )
}

export default Manga