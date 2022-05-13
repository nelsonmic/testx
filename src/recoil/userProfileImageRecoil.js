import { atom } from "recoil";
import defaultImage from "../assets/defaultImage.jpg"

const userProfileImageState = atom({
    key: "userProfileImageState",
    default: defaultImage,
})

export default userProfileImageState;