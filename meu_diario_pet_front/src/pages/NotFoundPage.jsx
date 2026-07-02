import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="page">
      <div className="card not-found">
        <p className="error-code">404</p>
        <h2>Pagina nao encontrada</h2>
        <p>A rota informada nao existe neste MVP.</p>
        <PrimaryButton onClick={() => navigate("/")}>Ir para Inicio</PrimaryButton>
      </div>
    </section>
  );
}

export default NotFoundPage;
