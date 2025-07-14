import SignTest from "../../../../../components/sign-test";
import { useNavigate } from "react-router-dom";

export default function Level1Test() {
  const navigate = useNavigate();
  return (
    <SignTest
      level={1}
      prompt="What is the sign for the letter 'A'?"
      correctAnswer="A"
      onSuccess={() => navigate("../sign-levels/2")} 
    />
  );
}
