import {
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import useRegisterUser from "../../apis/auth/useRegister";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AlertMessage from "../../components/Alert";

const SignUp = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    mutate: RegisterUser,
    isError,
    error,
    isSuccess,
    data,
    isLoading,
  } = useRegisterUser();

  useEffect(() => {
    if (isSuccess) {
      let timer = setTimeout(() => {
        navigate("/confirm-email");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      signupFullname: "",
      signupEmail: "",
      signupPhone: "",
      signupAs: "",
      signupPassword: "",
    },
    validationSchema: Yup.object({
      signupFullname: Yup.string().required("Please enter your fullname"),
      signupEmail: Yup.string()
        .email("The email address is incorrect")
        .required("Required"),
      signupPhone: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .required("Please enter a Phone number"),
      signupAs: Yup.string().required("Required"),
      signupPassword: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const {
        signupFullname,
        signupEmail,
        signupPhone,
        signupAs,
        signupPassword,
      } = values;
      const user = {
        signupFullname,
        signupEmail,
        signupPhone,
        signupAs,
        signupPassword,
      };
      RegisterUser(user);
    },
  });

  return (
    <div className="signup">
      <div className="signup__desc">
        {isSuccess ? (
          <AlertMessage status="success" message={data.data.message} />
        ) : null}
        {isError ? (
          <AlertMessage
            status="error"
            message={
              error.response.data.data[Object.keys(error.response.data.data)[0]]
            }
          />
        ) : null}

        <h1>Create Account</h1>
        <p>
          Create a free account and start enjoying financial benefits with
          XtraPay.
        </p>
      </div>

      <form className="signup__form">
        <div className="inputs">
          <label htmlFor="signupFullname">Full Name</label>
          <InputGroup size="md">
            <Input
              id="signupFullname"
              name="signupFullname"
              placeholder="Full Name"
              type="text"
              variant="filled"
              _placeholder={{ fontSize: 15 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.signupFullname}
            />
            <InputRightElement pointerEvents="none">
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                color="#000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </InputRightElement>
          </InputGroup>
          {formik.touched.signupFullname && formik.errors.signupFullname ? (
            <div className="formik-error">{formik.errors.signupFullname}</div>
          ) : null}
        </div>

        <div className="inputs">
          <label htmlFor="signupEmail">Email</label>
          <InputGroup size="md">
            <Input
              id="signupEmail"
              name="signupEmail"
              type="email"
              placeholder="example@example.com"
              variant="filled"
              _placeholder={{ fontSize: 15 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.signupEmail}
            />
            <InputRightElement pointerEvents="none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21.25H7C3.35 21.25 1.25 19.15 1.25 15.5V8.5C1.25 4.85 3.35 2.75 7 2.75H17C20.65 2.75 22.75 4.85 22.75 8.5V15.5C22.75 19.15 20.65 21.25 17 21.25ZM7 4.25C4.14 4.25 2.75 5.64 2.75 8.5V15.5C2.75 18.36 4.14 19.75 7 19.75H17C19.86 19.75 21.25 18.36 21.25 15.5V8.5C21.25 5.64 19.86 4.25 17 4.25H7Z"
                  fill="#292D32"
                />
                <path
                  d="M11.9998 12.87C11.1598 12.87 10.3098 12.61 9.65978 12.08L6.52978 9.57997C6.20978 9.31997 6.14978 8.84997 6.40978 8.52997C6.66978 8.20997 7.13978 8.14997 7.45978 8.40997L10.5898 10.91C11.3498 11.52 12.6398 11.52 13.3998 10.91L16.5298 8.40997C16.8498 8.14997 17.3298 8.19997 17.5798 8.52997C17.8398 8.84997 17.7898 9.32997 17.4598 9.57997L14.3298 12.08C13.6898 12.61 12.8398 12.87 11.9998 12.87Z"
                  fill="#292D32"
                />
              </svg>
            </InputRightElement>
          </InputGroup>
          {formik.touched.signupEmail && formik.errors.signupEmail ? (
            <div className="formik-error">{formik.errors.signupEmail}</div>
          ) : null}
        </div>

        <div className="inputs">
          <label htmlFor="signupPhone">Phone Number</label>
          <InputGroup size="md">
            <Input
              id="signupPhone"
              name="signupPhone"
              type="tel"
              placeholder="+234"
              variant="filled"
              _placeholder={{ fontSize: 15 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.signupPhone}
            />
            <InputRightElement pointerEvents="none">
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                color="#000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </InputRightElement>
          </InputGroup>

          {formik.touched.signupPhone && formik.errors.signupPhone ? (
            <div className="formik-error">{formik.errors.signupPhone}</div>
          ) : null}
        </div>

        <div className="inputs">
          <label>Sign up as</label>
          <RadioGroup id="signupAs" name="signupAs">
            <Stack direction="row">
              <Radio
                value="user"
                colorScheme="red"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="radio1"
              >
                User
              </Radio>
              <Radio
                value="member"
                colorScheme="red"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="radio2"
              >
                Member
              </Radio>
              <Radio
                value="agent"
                colorScheme="red"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="radio3"
              >
                Agent
              </Radio>
            </Stack>
          </RadioGroup>
          {formik.touched.signupAs && formik.errors.signupAs ? (
            <div className="formik-error">{formik.errors.signupAs}</div>
          ) : null}
        </div>

        <div className="inputs">
          <label htmlFor="signupPassword">Password</label>
          <InputGroup size="md">
            <Input
              id="signupPassword"
              name="signupPassword"
              type={show ? "text" : "password"}
              placeholder="Password"
              variant="filled"
              _placeholder={{ fontSize: 15 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.signupPassword}
            />
            <InputRightElement>
              <span onClick={handleClick}>
                {show ? (
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    color="#000"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    color="#000"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                )}
              </span>
            </InputRightElement>
          </InputGroup>
          {formik.touched.signupPassword && formik.errors.signupPassword ? (
            <div className="formik-error">{formik.errors.signupPassword}</div>
          ) : null}
        </div>

        <div className="inputs">
          <Checkbox colorScheme="red" size="md">
            By creating an account with us, you agree to our Terms and
            Conditions.
          </Checkbox>
        </div>

        <div className="submit-button">
          <Button
            size="md"
            colorScheme="red"
            onClick={formik.handleSubmit}
            isLoading={isLoading ? true : false}
            isActive={isLoading ? true : false}
          >
            Sign Up
          </Button>
        </div>

        <p className="no-account">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
