import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import Loading from "../../components/loading/Loading";

const Watch = () => {
  const { movie } = useMovieContext();
  if (!movie) {
    return <Loading/>
  }
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay={true}
        progress="true"
        controls
        src={movie ? movie.video : ""}
        // src = "https://www.youtube.com/embed/5gcqvS0taUE"
        // src={movie.video}
      />
    </div>
  );
};

export default Watch;
