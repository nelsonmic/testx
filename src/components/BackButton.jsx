import {useNavigate} from "react-router-dom";

const BackButton = ({ times = -1 }) => {
    let navigate = useNavigate();
    const goBack=() => navigate(times)
  return (
    <svg
    className="back-button"
      width="24px"
      height="24px"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      color="#000000"
      onClick={goBack}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      ></path>
    </svg>
  );
};

export default BackButton;