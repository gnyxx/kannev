import SignTest from "../../../../../components/sign-test";
import { useNavigate } from "react-router-dom";

export default function Level2Test() {
  const navigate = useNavigate();
  return (
    <SignTest
      level={2}
      prompt="What is the sign for the letter 'M'?"
      correctAnswer="M"
      onSuccess={() => navigate("../sign-levels/1")}
    />
  );
}
