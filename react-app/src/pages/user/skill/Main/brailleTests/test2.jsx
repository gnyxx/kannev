import BrailleTest from "../../../../../components/braille-test";
import { useNavigate } from "react-router-dom";

export default function Level2Test() {
  const navigate = useNavigate();
  <BrailleTest
    level={2}
    prompt="What numbers correspond to the letter B?"
    correctAnswers={['4 5', 'four five']}
    onSuccess={() => {
        localStorage.setItem('brailleTest2Complete', 'true');
        navigate("../braille-levels/3");
  }}
/>

}
