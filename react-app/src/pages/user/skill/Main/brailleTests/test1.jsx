import BrailleTest from "../../../../../components/braille-test";
import { useNavigate } from "react-router-dom";

export default function Level1Test() {
  const navigate = useNavigate();
  return(
  <BrailleTest
    level={1}
    prompt="What numbers correspond to the letter A?"
    correctAnswers={['1 2', '22']}
    onSuccess={() => {
        localStorage.setItem('brailleTest1Complete', 'true');
        navigate("../braille-levels/2");
  }}
/>
  )
}
