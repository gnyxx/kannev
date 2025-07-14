import BrailleLearning from "../../../../../components/braille-learning";
import kimg from "/Ka.jpg";
import brailleimg from '/kbraille.png';
import { useNavigate } from "react-router-dom";

export default function Level2() {
  const navigate = useNavigate();

  return (
    <BrailleLearning
      level={2}
      promptImage={kimg}
      signImage={brailleimg}
      onNext={() => navigate("./test2")}
    />
  );
}
