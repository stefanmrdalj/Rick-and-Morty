import "../styles/logInPage.scss";
import Galaxy from "../components/galaxyBackground";

const LogInPage = () => {
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
    </div>
  );
};

export default LogInPage;
