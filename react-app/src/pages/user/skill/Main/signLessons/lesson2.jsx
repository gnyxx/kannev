import SignLearning from "../../../../../components/sign-learning";
import kimg from "/Ka.jpg";
import signimg from "/ksign.png";
import { useNavigate } from "react-router-dom";

export default function Level2() {
  const navigate = useNavigate();

  return (
    <SignLearning
      level={2}
      promptImage={kimg}
      signImage={signimg}
      onNext={() => navigate("./test2")}
    />
  );
}
