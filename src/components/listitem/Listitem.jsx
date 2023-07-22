import "./listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import Loading from "../loading/Loading";

const Listitem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [movie, setMovie] = useState({});
  const { movie, setMovie } = useMovieContext();
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjk1MjIyZGFkMmUzYTIzMDM5MGVjYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MDAwMDYwMCwiZXhwIjoxNjkwNDMyNjAwfQ.qzTxnd_AM7V99KKL3JOEbyWbAjKGG1HDWnokT2s1F-o",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  if (!movie) {
    return <Loading/> // or return <div>Loading...</div>;
  }
  return (
    // <Link to={{ pathname: "/watch", movie: movie }}>
    <Link to={{ pathname: "/watch", state: { movie: movie } }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpOutlinedIcon className="icon" />
                <ThumbDownAltOutlinedIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Listitem;
