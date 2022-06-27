//react
import { useState } from "react";
//component
import { Input, Button, Select } from "@chakra-ui/react";
import NumberFormat from "react-number-format";
import Alert from "../../../components/Alert";
import ImageUploader from "../../../components/ImageUploader";
//utils
import UploadImagesToServer from "../../../utils/UploadImage";
//assets
import uploadImage from "../../../assets/uploadImage.svg";
//api
import useSetKycLevel1 from "../../../apis/settings/kyc/useSetLevel1";

const idType = [
  "International Passport",
  "Drivers License",
  "Voters Card",
  "NIN Number",
];

const LvOne = () => {
  //states
  const [idImage, setIdImage] = useState(uploadImage);
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [meansOfId, setMeansOfId] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [uploadImageErrorMessage, setUploadImageErrorMessage] = useState("");

  //apis

  const {
    mutate: setKycLevel1,
    isSuccess: isSuccessKycLevel1,
    isLoading: isLoadingKycLevel1,
    isError: isErrorKycLevel1,
    error: errorKycLevel1,
  } = useSetKycLevel1();

  const handleSubmit = () => {
    const value = {
      phoneNumber,
      lastName,
      otherName,
      idNumber,
      idImage,
      expiryDate,
      meansOfId,
    };

    setKycLevel1(value);
  };
  return (
    <div className="level-1">
      {isErrorKycLevel1 && (
        <Alert status="error" message={errorKycLevel1.response.data.message} />
      )}
      {uploadImageErrorMessage && (
        <Alert status="error" message={uploadImageErrorMessage} />
      )}

      {isSuccessKycLevel1 && (
        <Alert status="success" message={"KYC Level 1 Complete"} />
      )}
      <form>
        <div className="inputs">
          <label>Last name</label>
          <Input
            variant="outline"
            name="last-name"
            type="text"
            size="lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Other names</label>
          <Input
            variant="outline"
            name="last-name"
            type="text"
            size="lg"
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
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
          <label>Means of ID</label>
          <Select
            placeholder="Select a data plan"
            size="lg"
            value={meansOfId}
            onChange={(e) => {
              setMeansOfId(e.target.value);
            }}
          >
            {idType.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </Select>
        </div>

        <div className="inputs">
          <label>ID number</label>
          <Input
            variant="outline"
            name="last-name"
            type="text"
            size="lg"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>

        <div className="inputs">
          <label>Expiry date</label>
          <Input
            variant="outline"
            name="last-name"
            type="date"
            size="lg"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        <div className="id-image">
          <div className="image-container">
            <img src={idImage} alt="Id" />
          </div>
          <ImageUploader
            width="20px"
            height="20px"
            marginBottom=".5em"
            uploadImage={UploadImagesToServer}
            changeImage={setIdImage}
            uploadErrorMessage={setUploadImageErrorMessage}
          />
        </div>

        <div className="submit-button">
          <Button
            size="md"
            colorScheme="red"
            onClick={handleSubmit}
            isLoading={isLoadingKycLevel1}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LvOne;
