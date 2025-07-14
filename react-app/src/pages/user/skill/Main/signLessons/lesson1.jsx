import SignLearning from "../../../../../components/sign-learning";
import kimg from "/Ka.jpg";
import signimg from "/ksign.png";
import { useNavigate } from "react-router-dom";

export default function Level1() {
  const navigate = useNavigate();

  return (
    <SignLearning
      level={1}
      promptImage={kimg}
      signImage={signimg}
      onNext={() => navigate("./test1")}
    />
  );
}
