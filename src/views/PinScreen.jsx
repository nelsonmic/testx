//react
import { useState } from "react";

//router
import { useOutletContext, useNavigate } from "react-router-dom";

//components
import { PinInput, PinInputField, Button } from "@chakra-ui/react";
import AnimatedComponent from "../components/AnimatedComponent";

const PinScreen = ({ back }) => {
  const navigate = useNavigate();
  const processSettings = useOutletContext()[3];

  const states = useOutletContext()[4];

  const [pin, setPin] = useState("");

  const handleChange = (e) => {
    setPin(e);
  };
  const handleComplete = (pin) => {
    processSettings(pin);
  };
  return (
    <AnimatedComponent>
      <div className="pin-screen">
        <div className="wrapper">
          <p
            className="done"
            onClick={() => {
              navigate(back);
            }}
          >
            Done
          </p>
          <main>
            <div className="pin-inputs">
              <p>Enter your 4 digit transaction pin</p>
              <div className="inputs">
                <PinInput
                  mask
                  size="lg"
                  value={pin}
                  onChange={handleChange}
                  // onComplete={handleComplete}
                  className="pin-input-container"
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </div>

              <div className="submit-button">
                <Button
                  size="md"
                  colorScheme="red"
                  onClick={() => {
                    handleComplete(pin);
                  }}
                  isLoading={states.loading}
                >
                  Save Information
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default PinScreen;
