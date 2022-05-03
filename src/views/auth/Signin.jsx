import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { Link} from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLoginUser from "../../apis/auth/useLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/Alert";

const SignIn = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { mutate: loginUser, isError, error, isSuccess, data, isLoading } = useLoginUser();

  useEffect(() => {
    if (isSuccess) {
      let timer = setTimeout(() => {
        navigate("/");
        localStorage.setItem("AT", data.data.data.access_token);
        localStorage.setItem("RT", data.data.data.refresh_token);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess,data, navigate]);

  const formik = useFormik({
    initialValues: {
      signinEmail: "",
      signinPassword: "",
    },
    validationSchema: Yup.object({
      signinEmail: Yup.string()
        .email("The email address is incorrect")
        .required("Required"),
      signinPassword: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { signinEmail, signinPassword } = values;
      const user = { signinEmail, signinPassword };
      loginUser(user);
    },
  });

  return (
    <div className="signin">
      <div className="signin__welcome">
        {isSuccess ? (
          <AlertMessage status="success" message={data.data.message} />
        ) : null}
        {isError ? (
          <AlertMessage status="error" message={error.response.data.message} />
        ) : null}
        <div className="logo">
          <img src={logo} alt="xtrapay logo" />
        </div>
        <h1>Welcome back!</h1>
      </div>

      <form className="signin__form">
        <div className="inputs">
          <label htmlFor="signinEmail">Email</label>
          <InputGroup size="lg">
            <Input
              id="signinEmail"
              name="signinEmail"
              type="email"
              placeholder="example@example.com"
              variant="filled"
              _placeholder={{ fontSize: 15 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.signinEmail}
            />
            <InputRightElement pointerEvents="none">
              <svg
                width="20"
                height="20"
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
          {formik.touched.signinEmail && formik.errors.signinEmail ? (
            <div className="formik-error">{formik.errors.signinEmail}</div>
          ) : null}
        </div>

        <div className="inputs">
          <label htmlFor="signinPassword">Password</label>
          <InputGroup size="lg">
            <Input
              id="signinPassword"
              name="signinPassword"
              type={show ? "text" : "password"}
              placeholder="Password"
              variant="filled"
              _placeholder={{ fontSize: 15 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.signinPassword}
            />
            <InputRightElement>
              <span onClick={handleClick}>
                {show ? (
                  <svg
                    width="20"
                    height="20"
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
                    width="23"
                    height="23"
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
          {formik.touched.signinPassword && formik.errors.signinPassword ? (
            <div className="formik-error">{formik.errors.signinPassword}</div>
          ) : null}
        </div>

        <Link to="/forgot-password">Forgot password?</Link>

        <div className="submit-button">
          <Button
            size="lg"
            colorScheme="red"
            onClick={formik.handleSubmit}
            isLoading={isLoading ? true : false}
            isActive={isLoading ? true : false}
          >
            Sign In
          </Button>
        </div>

        <p className="no-account">
          Already have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
