
import loading3 from "../../../assets/loading3.gif"
import "../MangaIcon/MangaIcon.css";

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