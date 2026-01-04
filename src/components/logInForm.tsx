import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import type { AuthFormData } from "../modules/auth/auth.types";
import { authStore } from "../modules/auth/authStore";
import { useState } from "react";

type LogInFormProps = {
  onHandleToRegister: () => void;
};

const LogInForm = ({ onHandleToRegister }: LogInFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm<AuthFormData>();

  const usernameErrors = form.getFieldError("username");
  const passwordErrors = form.getFieldError("password");

  const handleFinish = async (values: AuthFormData) => {
    const username = values.username ?? "";
    const password = values.password ?? "";

    await authStore.logIn(username, password);

    if (authStore.loggedInUser) {
      navigate("/home");
      return;
    }

    if (authStore.loginErrorMessage) {
      form.setFields([
        { name: "username", errors: [authStore.loginErrorMessage] },
        { name: "password", errors: [authStore.loginErrorMessage] },
      ]);
    }
  };

  const handleValuesChange = () => {
    form.setFields([
      { name: "username", errors: [] },
      { name: "password", errors: [] },
    ]);
  };

  return (
    <div className="logInForm">
      <div>
        <h1>Log in</h1>
      </div>
      <Form
        form={form}
        validateTrigger="onSubmit"
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <div className="form-input-wrapper">
            <Input placeholder="Username" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <div className="form-input-wrapper">
            <Input
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
            />

            <span
              style={{ cursor: "pointer" }}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              )}
            </span>
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: "15px" }}>
          <div className="form-button">
            <button type="submit" disabled={authStore.isLoggingIn}>
              Log in
            </button>
          </div>
        </Form.Item>
      </Form>
      <div className="form-account-register">
        <span>Do you have an account?</span>
        <span onClick={onHandleToRegister}> Register</span>
      </div>
    </div>
  );
};

export default LogInForm;
