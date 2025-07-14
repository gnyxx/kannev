import SignConversation from "../../../../components/sign-convo";
import { useNavigate } from "react-router-dom";
export default function SignConvoLevel1() {
  const navigate = useNavigate();
  return (
    <SignConversation
      level={1}
      question="What is the color of blood?"
      correctAnswer="a"
      onSuccess={() => navigate("../../dashboard")} 
    />  
  );
}
