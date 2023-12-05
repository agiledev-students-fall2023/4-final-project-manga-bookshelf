import imgLink from "./killua.jpg";
import "../MangaIcon/MangaIcon.css";
import Star from "../Star/Star";

const Loading = ({ title }) => {
  return (
    <>
      <div className="MangaIcon-main">
        <div className="MangaIcon-favorite">
            <Star favorite={false}/>
        </div>
        <img src={imgLink} /> {/* maybe replace by some other images */}
        <span>loading...</span>
      </div>
    </>
  );
};

export default Loading;
