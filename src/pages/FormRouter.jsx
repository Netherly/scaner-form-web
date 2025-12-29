import { useParams, useNavigate } from "react-router-dom";
import Form1 from "../components/FormPages/Form1";
import Form2 from "../components/FormPages/Form2";
import Form3 from "../components/FormPages/Form3";
import Form4 from "../components/FormPages/Form4";

function FormRouter() {
  const { formType } = useParams();
  const navigate = useNavigate();

  const forms = {
    1: <Form1 onBack={() => navigate("/forms")} />,
    2: <Form2 onBack={() => navigate("/forms")} />,
    3: <Form3 onBack={() => navigate("/forms")} />,
    4: <Form4 onBack={() => navigate("/forms")} />
  };

  return forms[formType] || <div>Форма не знайдена</div>;
}

export default FormRouter;