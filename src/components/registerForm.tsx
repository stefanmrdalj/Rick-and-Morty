import { Form, Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  PERSON_NAME_PATTERN,
  EMAIL_PATTERN,
  USERNAME_PATTERN,
  PASSWORD_PATTERN,
} from "../regexPatterns/registerFormValidationPatterns";
import { useForm } from "antd/es/form/Form";
import { authStore } from "../modules/auth/authStore";
import type { AuthFormData } from "../modules/auth/auth.types";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

type RegisterFormProps = {
  onHandleBackToLogIn: () => void;
};

const RegisterForm = ({ onHandleBackToLogIn }: RegisterFormProps) => {
  const [selectedProfilePhotoFile, setSelectedProfilePhotoFile] = useState<
    File | undefined
  >(undefined);
  const [selectedUploadFileList, setSelectedUploadFileList] = useState<
    UploadFile[]
  >([]);
  const [form] = useForm();
  const MAX_IMAGE_SIZE_MB = 5;
  const normalizeUploadEvent = (event: any) => {
    if (Array.isArray(event)) return event;
    return event?.fileList ?? [];
  };
  const createOptionalProfilePhotoValidator =
    (maxSizeMb: number) =>
    async (_: unknown, fileList: any[] = []) => {
      if (!fileList.length) return;

      const file = fileList[0]?.originFileObj as File | undefined;
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file.");
      }

      if (file.size > maxSizeMb * 1024 * 1024) {
        throw new Error(`Image must be ${maxSizeMb}MB or smaller.`);
      }
    };
  const handleFinish = async (values: AuthFormData) => {
    const userToCreate: AuthFormData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
      photo: "",
    };

    const success = await authStore.register(
      userToCreate,
      selectedProfilePhotoFile
    );

    if (success) {
      form.resetFields();
      setSelectedProfilePhotoFile(undefined);
      setSelectedUploadFileList([]);
      onHandleBackToLogIn();
      return;
    }

    if (authStore.registerErrorMessage) {
      const error = authStore.registerErrorMessage;

      if (error.includes("Username")) {
        form.setFields([{ name: "username", errors: [error] }]);
        return;
      }

      if (error.includes("Email")) {
        form.setFields([{ name: "email", errors: [error] }]);
        return;
      }

      form.setFields([
        { name: "username", errors: [error] },
        { name: "email", errors: [error] },
      ]);
    }
  };

  const handleValuesChange = () => {
    form.setFields([
      { name: "username", errors: [] },
      { name: "email", errors: [] },
    ]);
  };

  return (
    <div className="logInForm">
      <div>
        <h1>Register</h1>
      </div>
      <Form
        form={form}
        validateTrigger="onSubmit"
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          rules={[
            { required: true, message: "Please enter your first name." },
            {
              pattern: PERSON_NAME_PATTERN,
              message:
                "First name must start with a capital letter and may contain only letters, spaces, or hyphens.",
            },
          ]}
        >
          <div className="form-input-wrapper">
            <Input placeholder="First name" autoComplete="off" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
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
          name="lastName"
          rules={[
            { required: true, message: "Please enter your last name." },
            {
              pattern: PERSON_NAME_PATTERN,
              message:
                "Last name must start with a capital letter and may contain only letters, spaces, or hyphens.",
            },
          ]}
        >
          <div className="form-input-wrapper">
            <Input placeholder="Last name" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
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
          name="email"
          rules={[
            { required: true, message: "Please enter your email address." },
            {
              pattern: EMAIL_PATTERN,
              message: "Please enter a valid email address.",
            },
          ]}
        >
          <div className="form-input-wrapper">
            <Input placeholder="Email" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please enter a username." },
            {
              pattern: USERNAME_PATTERN,
              message:
                "Username must be 3–20 characters and can contain letters, numbers, dots, hyphens, or underscores.",
            },
          ]}
        >
          <div className="form-input-wrapper">
            <Input placeholder="Username" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password." },
            {
              pattern: PASSWORD_PATTERN,
              message:
                "Password must be at least 8 characters and include a letter and a number.",
            },
          ]}
        >
          <div className="form-input-wrapper">
            <Input type="password" placeholder="Password" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
        </Form.Item>
        <Form.Item
          name="profileImage"
          valuePropName="fileList"
          getValueFromEvent={normalizeUploadEvent}
          rules={[
            {
              validator: createOptionalProfilePhotoValidator(MAX_IMAGE_SIZE_MB),
            },
          ]}
        >
          <div className="uploadRow">
            <Upload
              maxCount={1}
              accept="image/*"
              fileList={selectedUploadFileList}
              beforeUpload={(file) => {
                setSelectedProfilePhotoFile(file as File);
                setSelectedUploadFileList([file as unknown as UploadFile]);
                return false;
              }}
              onRemove={() => {
                setSelectedProfilePhotoFile(undefined);
                setSelectedUploadFileList([]);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="form-button">
            <button type="submit">Register</button>
          </div>
        </Form.Item>
      </Form>
      <div className="form-account-register">
        <p onClick={onHandleBackToLogIn}>Already have an account?</p>
      </div>
    </div>
  );
};

export default RegisterForm;
