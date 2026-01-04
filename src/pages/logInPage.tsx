import "../styles/logInPage.scss";
import Galaxy from "../components/galaxyBackground";
import LogInForm from "../components/logInForm";
import RegisterForm from "../components/registerForm";
import { useState } from "react";

const LogInPage = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  return (
    <div className="logInPage">
      <Galaxy
        mouseInteraction={false}
        mouseRepulsion={false}
        density={1}
        glowIntensity={0.4}
        saturation={1}
        speed={1.5}
      />
      {isRegisterForm ? (
        <RegisterForm onHandleBackToLogIn={() => setIsRegisterForm(false)} />
      ) : (
        <LogInForm onHandleToRegister={() => setIsRegisterForm(true)} />
      )}
    </div>
  );
};

export default LogInPage;
