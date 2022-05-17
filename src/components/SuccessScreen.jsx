import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SuccessScreen = ({ name, amount }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="success-screen">
      <Player
        autoplay
        loop
        src="https://assets4.lottiefiles.com/packages/lf20_ya4ycrti.json"
        style={{ height: "250px", width: "250px" }}
      ></Player>

      <div className="desc">
        <h2>Transaction Successful</h2>
        <p>
          You have successfully transfered <span>N{amount}</span> to{" "}
          <span>{name}</span>
        </p>
      </div>

      <div className="btn">
        <Button colorScheme="red" size="lg" onClick={handleClick}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
