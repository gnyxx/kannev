import BrailleLearning from "../../../../../components/braille-learning";
import kimg from "/Ka.jpg";
import brailleimg from '/kbraille.png';
import { useNavigate } from "react-router-dom";

export default function Level1() {
  const navigate = useNavigate();

  return (
    <BrailleLearning
      level={1}
      promptImage={kimg}
      signImage={brailleimg}
      onNext={() => navigate("./test1")}
    />
  );
}
