import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export function BackButton({ back }) {
  return (
    <Link className="button__link" to={back}>
      <button className="button__container">
        <BiArrowBack className="button__icon" />
      </button>
    </Link>
  );
}
