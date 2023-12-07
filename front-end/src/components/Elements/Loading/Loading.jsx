import imgLink from "../../../assets/loading.png";
import loading from "../../../assets/spinning-loading.gif"

import loading2 from "../../../assets/loading2.gif"
import loading3 from "../../../assets/loading3.gif"
import "../MangaIcon/MangaIcon.css";
import Star from "../Star/Star";

const Loading = ({ title }) => {
  return (
    <>
      <div className="MangaIcon-main">
        <img src={loading3} /> {/* maybe replace by some other images */}
        <span>loading...</span>
      </div>
    </>
  );
};

export default Loading;