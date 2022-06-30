//react
import { useState } from "react";
//components
import { Input, Button } from "@chakra-ui/react";
import NumberFormat from "react-number-format";
import Alert from "../../../components/Alert";
//api
import useSetKycLevel2 from "../../../apis/settings/kyc/useSetLevel2";

const LvTwo = () => {
  const [bvn, setBvn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");

  //apis

  const {
    mutate: setKycLevel2,
    isSuccess: isSuccessKycLevel2,
    isLoading: isLoadingKycLevel2,
    isError: isErrorKycLevel2,
    error: errorKycLevel2,
  } = useSetKycLevel2();

  const handleSubmit = () => {
    const value = {
      bvn,
      phoneNumber,
      dob,
    };
    setKycLevel2(value);
  };
  return (
    <div className="level-2">
      {isErrorKycLevel2 && (
        <Alert status="error" message={errorKycLevel2.response.data.message} />
      )}

      {isSuccessKycLevel2 && (
        <Alert status="success" message={"KYC Level 2 Complete"} />
      )}
      <form>
        <div className="inputs">
          <label>Bvn</label>
          <NumberFormat
            className="chakra-input css-1lw1oo1"
            id="bvn"
            thousandSeparator={false}
            value={bvn}
            isNumericString={true}
            onValueChange={(value) => {
              setBvn(value.floatValue);
            }}
          />
        </div>
        <div className="inputs">
          <label>Phone number</label>
          <NumberFormat
            className="chakra-input css-1lw1oo1"
            id="phonenumber"
            thousandSeparator={false}
            value={phoneNumber}
            isNumericString={true}
            onValueChange={(value) => {
              setPhoneNumber(value.floatValue);
            }}
          />
        </div>
        <div className="inputs">
          <label>Date of birth</label>
          <Input
            variant="outline"
            name="last-name"
            type="date"
            size="lg"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="submit-button">
          <Button
            size="md"
            colorScheme="red"
            onClick={handleSubmit}
            isLoading={isLoadingKycLevel2}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LvTwo;
