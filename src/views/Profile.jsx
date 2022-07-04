import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useFormik } from "formik";
import * as Yup from "yup";

//api
import useGetUserInfo from "../apis/profile/useGetUserInfo";
import useGetProfileSettings from "../apis/settings/profile/useGetProfileSettings";
import useSetProfileSettings from "../apis/settings/profile/useSetProfileSettings";

//state
import userState from "../recoil/userRecoil";
//utilities
import UploadImagesToServer from "../utils/UploadImage";
//components
import ImageFormatter from "../components/ImageFormatter";
import ImageUploader from "../components/ImageUploader";
import AlertMessage from "../components/Alert";
import BackButton from "../components/BackButton";
import { Input, Button } from "@chakra-ui/react";
import AnimatedPage from "../components/AnimatedPage";
import defaultimage from "../assets/defaultImage.jpg";

const Profile = () => {
  //state
  const [userProfileImage, setUserProfileImage] = useState(defaultimage);

  const [user, setUser] = useRecoilState(userState);
  const [profileSettings, setProfileSettings] = useState(null);
  const [uploadImageErrorMessage, setUploadImageErrorMessage] = useState(null);

  //apis
  const { isSuccess: isSuccessUser, data: dataUser } = useGetUserInfo();
  const { isSuccess: isSuccessSettings, data: dataSettings } =
    useGetProfileSettings();
  const {
    mutate: setProfileSetting,
    isSuccess: isSuccessSetSettings,
    error: errorSetSettings,
    isLoading: isLoadingSetSettings,
  } = useSetProfileSettings();

  if (errorSetSettings) console.log(errorSetSettings.response);

  useEffect(() => {
    if (isSuccessUser) {
      setUser(dataUser.data.data);
      setUserProfileImage(dataUser.data.data.profile_photo);
    }

    if (isSuccessSettings) {
      setProfileSettings(dataSettings.data.data[0]);
    }
  }, [
    isSuccessUser,
    dataUser,
    setUser,
    isSuccessSettings,
    dataSettings,
    setProfileSettings,
    profileSettings,
    user,
    setUserProfileImage,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      editProfileFirstName: user ? user.name.split(" ")[0] : "",
      editProfileLastName: user ? user.name.split(" ")[1] : "",
      editProfilePhoto: userProfileImage,
      editProfileAddress:
        profileSettings && profileSettings.home_address !== null
          ? profileSettings.home_address
          : "",
      editProfileNok:
        profileSettings && profileSettings.next_kin !== null
          ? profileSettings.next_kin
          : "",
      editProfileNokAddress:
        profileSettings && profileSettings.next_kin_address !== null
          ? profileSettings.next_kin_address
          : "",
      editProfileRelationship:
        profileSettings && profileSettings.next_kin_rela !== null
          ? profileSettings.next_kin_rela
          : "",
      editProfileNokMobile:
        profileSettings && profileSettings.next_kin_phone !== null
          ? profileSettings.next_kin_phone
          : "",
      editProfileNokEmail:
        profileSettings && profileSettings.next_kin_email !== null
          ? profileSettings.next_kin_email
          : "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      setProfileSetting(values);
    },
  });

  return (
    <div className="profile">
      <BackButton />
      <h1 className="page-name">Profile</h1>

      {isSuccessSetSettings ? (
        <AlertMessage status="success" message="Profile updated successfully" />
      ) : null}
      {uploadImageErrorMessage ? (
        <AlertMessage status="error" message={uploadImageErrorMessage} />
      ) : null}
      {/* {errorSetSettings?<AlertMessage status="error" message={"kdjfkjdfdj"} />:null} */}
      <AnimatedPage>
        <div className="wrapper">
          <main>
            <header>
              <div className="profile-image">
                <ImageFormatter
                  source={userProfileImage}
                  height="80px"
                  width="80px"
                  alt="profile"
                />
                <ImageUploader
                  width="20px"
                  height="20px"
                  marginBottom=".5em"
                  uploadImage={UploadImagesToServer}
                  changeImage={setUserProfileImage}
                  uploadErrorMessage={setUploadImageErrorMessage}
                />
              </div>

              <div className="user-details">
                <h2>
                  {profileSettings
                    ? `${profileSettings.first_name} ${profileSettings.last_name}`
                    : ""}
                </h2>
                <p>{profileSettings ? profileSettings.phone_number : ""}</p>
                <p>{profileSettings ? profileSettings.email : ""}</p>
              </div>
            </header>

            <div className="account-details">
              <div className="account-number">
                <span>Account:</span>
                <p>
                  {user && user.reserved_accounts !== null
                    ? `${user.reserved_accounts.account_num_1} | ${user.reserved_accounts.bank_name_1}`
                    : ""}
                </p>
              </div>
              <div className="wallet">
                <span>Wallet:</span>
                <p>{user ? user.wallet_address : ""}</p>
              </div>
            </div>

            <form className="update-profile">
              <div className="inputs">
                <label htmlFor="editProfileAddress">Home Address</label>
                <Input
                  variant="filled"
                  id="editProfileAddress"
                  name="editProfileAddress"
                  type="text"
                  size="md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.editProfileAddress}
                />
              </div>

              <div className="inputs">
                <label htmlFor="editProfileNok">Next of Kin</label>
                <Input
                  variant="filled"
                  id="editProfileNok"
                  name="editProfileNok"
                  type="text"
                  size="md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.editProfileNok}
                />
              </div>

              <div className="inputs">
                <label htmlFor="editProfileNokAddress">
                  Next of Kin Address
                </label>
                <Input
                  variant="filled"
                  id="editProfileNokAddress"
                  name="editProfileNokAddress"
                  type="text"
                  size="md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.editProfileNokAddress}
                />
              </div>

              <div className="inputs">
                <label htmlFor="editProfileRelationship">Relationship</label>
                <Input
                  variant="filled"
                  id="editProfileRelationship"
                  name="editProfileRelationship"
                  type="text"
                  size="md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.editProfileRelationship}
                />
              </div>

              <div className="inputs">
                <label htmlFor="editProfileNokMobile">Next of Kin Mobile</label>
                <Input
                  variant="filled"
                  id="editProfileNokMobile"
                  name="editProfileNokMobile"
                  type="tel"
                  size="md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.editProfileNokMobile}
                />
              </div>

              <div className="inputs">
                <label htmlFor="editProfileNokEmail">Next of Kin Email</label>
                <Input
                  variant="filled"
                  id="editProfileNokEmail"
                  name="editProfileNokEmail"
                  type="email"
                  size="md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.editProfileNokEmail}
                />
              </div>

              <div className="submit-button">
                <Button
                  size="md"
                  colorScheme="red"
                  onClick={formik.handleSubmit}
                  isLoading={isLoadingSetSettings ? true : false}
                  isActive={isLoadingSetSettings ? true : false}
                >
                  Save Information
                </Button>
              </div>
            </form>
          </main>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default Profile;
