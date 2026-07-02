import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import TooltipHint from "./TooltipHint";

function PetCard({ pet }) {
  const navigate = useNavigate();

  return (
    <article className="pet-card">
      <img src={pet.foto} alt={`Foto do pet ${pet.nome}`} className="pet-photo" />
      <div className="pet-content">
        <h3>{pet.nome}</h3>
        <p>
          {pet.tipo} • {pet.idade} anos
        </p>
        <div className="pet-actions">
          <PrimaryButton onClick={() => navigate(`/pets/${pet.id}/diario`)}>
            Abrir Diario
          </PrimaryButton>
          <TooltipHint text="Visualize e registre observacoes diarias deste pet." />
        </div>
      </div>
    </article>
  );
}

export default PetCard;
