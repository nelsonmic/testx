import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useFormik } from "formik";
import * as Yup from "yup";

//api
import useGetUserInfo from "../apis/profile/useGetUserInfo";
import useGetProfileSettings from "../apis/settings/profile/useGetProfileSettings";
import useSetProfileSettings from "../apis/settings/profile/useSetProfileSettings";

//state
import userProfileImageState from "../recoil/userProfileImageRecoil";
import userState from "../recoil/userRecoil";
//components
import ImageFormatter from "../components/ImageFormatter";
import { Input, Button } from "@chakra-ui/react";



const Profile = () => {
  //state
  const [userProfileImage, setUserProfileImage] = useRecoilState(
    userProfileImageState
  );
  const [user, setUser] = useRecoilState(userState);
  const [profileSettings, setProfileSettings] = useState(null);

  //apis
  const { isSuccess:isSuccessUser, data:dataUser } = useGetUserInfo();
  const { isSuccess: isSuccessSettings, data: dataSettings } = useGetProfileSettings();
  const {mutate: setProfileSetting, isSuccess: isSuccessSetSettings, error: errorSetSettings} = useSetProfileSettings();

  useEffect(() => {
    if (isSuccessUser) {
      setUser(dataUser.data.data);
      setUserProfileImage(dataUser.data.data.profile_photo);
      console.log(dataUser.data.data)
    }

    if(isSuccessSettings){
        setProfileSettings(dataSettings.data.data[0]);
        console.log(profileSettings)
    }
  }, [isSuccessUser, dataUser, setUser, setUserProfileImage, isSuccessSettings, dataSettings, setProfileSettings, profileSettings, user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      editProfileAddress: (profileSettings && (profileSettings.home_address !== null))? profileSettings.home_address: "kfjd",
      editProfileNok: (profileSettings && (profileSettings.next_kin !== null)) ? profileSettings.next_kin: "sdkjs",
      editProfileNokAddress: (profileSettings && (profileSettings.next_kin_address !== null)) ? profileSettings.next_kin_address: "dkckxcm",
      editProfileRelationship: (profileSettings && (profileSettings.next_kin_rela !== null)) ? profileSettings.next_kin_rela: "slow down",
      editProfileNokMobile: (profileSettings && (profileSettings.next_kin_phone !== null)) ? profileSettings.next_kin_phone: "dskjd",
      editProfileNokEmail: (profileSettings && (profileSettings.next_kin_email !== null)) ? profileSettings.next_kin_email: "mdnmd",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      setProfileSetting(values);
    },
  });

  return (
    <div className="profile">
      <h1 className="page-name">Profile</h1>

      <div className="wrapper">
        <main>
          <header>
            <div className="profile-image">
              <ImageFormatter
                source={userProfileImage && userProfileImage}
                alt="profile image"
                width="80px"
                height="80px"
              />
            </div>

            <div className="user-details">
              <h2>{profileSettings ? `${profileSettings.first_name} ${profileSettings.last_name}` : ""}</h2>
              <p>{profileSettings ? profileSettings.phone_number : ""}</p>
              <p>{profileSettings ? profileSettings.email : ""}</p>
            </div>
          </header>

          <div className="account-details">
            <div className="account-number">
              <span>Account:</span>
              <p>
                {(user && (user.reserved_accounts !== null))
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
                Value={formik.values.editProfileAddress}
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
              <label htmlFor="editProfileNokAddress">Next of Kin Address</label>
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
                // isLoading={isLoading ? true : false}
                // isActive={isLoading ? true : false}
              >
                Save Information
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;
