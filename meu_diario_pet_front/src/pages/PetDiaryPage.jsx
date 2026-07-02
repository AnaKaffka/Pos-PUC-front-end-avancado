import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import FeedbackBanner from "../components/FeedbackBanner";
import IconBadge from "../components/IconBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import PrimaryButton from "../components/PrimaryButton";
import RevealBlock from "../components/RevealBlock";
import TooltipHint from "../components/TooltipHint";
import {
  addDiaryEntry,
  deleteDiaryEntry,
  getDiaryEntriesByPetId,
  getPetById,
} from "../services/mockApi";

const initialForm = {
  data: "",
  humor: "",
  alimentacao: "",
  observacoes: "",
};

function PetDiaryPage() {
  const { petId } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const refreshEntries = () => {
    getDiaryEntriesByPetId(petId)
      .then((items) => {
        setEntries(items);
      })
      .catch(() => {
        setFeedback({ type: "error", message: "Erro ao carregar o diario." });
      });
  };

  useEffect(() => {
    let active = true;

    Promise.all([getPetById(petId), getDiaryEntriesByPetId(petId)])
      .then(([petData, diaryData]) => {
        if (!active) {
          return;
        }

        setPet(petData);
        setEntries(diaryData);
      })
      .catch(() => {
        if (active) {
          setFeedback({ type: "error", message: "Pet nao encontrado." });
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [petId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.data || !form.humor || !form.observacoes) {
      setFeedback({
        type: "warning",
        message: "Data, humor e observacoes sao obrigatorios.",
      });
      return;
    }

    setSaving(true);
    addDiaryEntry(petId, form)
      .then(() => {
        setForm(initialForm);
        setFeedback({ type: "success", message: "Entrada registrada com sucesso." });
        refreshEntries();
      })
      .catch(() => {
        setFeedback({ type: "error", message: "Falha ao salvar no diario." });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleDelete = () => {
    if (!pendingDeleteId) {
      return;
    }

    deleteDiaryEntry(Number(petId), pendingDeleteId)
      .then(() => {
        setFeedback({ type: "success", message: "Registro removido do diario." });
        refreshEntries();
      })
      .catch(() => {
        setFeedback({ type: "error", message: "Nao foi possivel excluir o registro." });
      })
      .finally(() => {
        setPendingDeleteId(null);
      });
  };

  if (loading) {
    return <LoadingSpinner label="Montando diario do pet" />;
  }

  if (!pet) {
    return (
      <section className="page">
        <FeedbackBanner type="error" message="Pet nao encontrado." />
        <PrimaryButton onClick={() => navigate("/pets")}>Voltar para pets</PrimaryButton>
      </section>
    );
  }

  return (
    <section className="page page-diary">
      <RevealBlock direction="left">
        <div className="card page-masthead">
          <p className="eyebrow">Diario individual</p>
          <h2>Historico de {pet.nome}</h2>
          <p className="section-copy">
            Registre evolucao diaria com observacoes objetivas sobre comportamento e rotina.
          </p>
          <div className="masthead-meta">
            <span className="meta-pill"><IconBadge icon="diary" label="Registros" />Registros: {entries.length}</span>
            <span className="meta-pill"><IconBadge icon="paw" label="Pet" />Pet ID: {pet.id}</span>
            <span className="meta-pill"><IconBadge icon="tip" label="Tipo" />Tipo: {pet.tipo}</span>
          </div>
        </div>
      </RevealBlock>

      <RevealBlock delay={100} direction="right">
        <div className="card diary-head panel-elevated">
          <img src={pet.foto} alt={`Foto de ${pet.nome}`} className="diary-photo" />
          <div>
            <h3>Perfil ativo</h3>
            <p>
              {pet.nome} • {pet.tipo} • {pet.idade} anos
            </p>
          </div>
          <PrimaryButton variant="ghost" onClick={() => navigate("/pets")}>
            Voltar
          </PrimaryButton>
        </div>
      </RevealBlock>

      <RevealBlock delay={180} direction="up">
        <div className="grid-two">
          <form className="card panel-elevated" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Novo Registro</h3>
              <TooltipHint text="Registre fatos diarios para acompanhar saude e comportamento." />
            </div>
            <p className="section-copy compact">
              Quanto mais detalhes no registro, melhor para identificar mudancas de padrao.
            </p>

            <label>
              Data
              <input
                type="date"
                className="input"
                value={form.data}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, data: event.target.value }))
                }
              />
            </label>

            <label>
              Humor
              <input
                className="input"
                value={form.humor}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, humor: event.target.value }))
                }
                placeholder="Ex: tranquilo, animado"
              />
            </label>

            <label>
              Alimentacao
              <input
                className="input"
                value={form.alimentacao}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, alimentacao: event.target.value }))
                }
                placeholder="Ex: racao, fruta"
              />
            </label>

            <label>
              Observacoes
              <textarea
                className="input"
                rows="4"
                value={form.observacoes}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, observacoes: event.target.value }))
                }
              />
            </label>

            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Adicionar ao Diario"}
            </PrimaryButton>
          </form>

          <div className="card panel-elevated">
            <h3>Historico</h3>
            <FeedbackBanner type={feedback.type} message={feedback.message} />

            {entries.length === 0 ? (
              <div className="empty-state-block">
                <p className="empty-state">Ainda nao existe registro para este pet.</p>
                <p className="empty-state">Use o formulario ao lado para criar a primeira entrada.</p>
              </div>
            ) : (
              <ul className="timeline">
                {entries.map((entry) => (
                  <li key={entry.id} className="timeline-item">
                    <div>
                      <strong>{entry.data}</strong>
                      <p>Humor: {entry.humor}</p>
                      <p>Alimentacao: {entry.alimentacao || "Nao informado"}</p>
                      <p>{entry.observacoes}</p>
                    </div>
                    <PrimaryButton
                      variant="ghost"
                      onClick={() => setPendingDeleteId(entry.id)}
                      title="Remover registro"
                    >
                      Excluir
                    </PrimaryButton>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </RevealBlock>

      <ConfirmModal
        open={Boolean(pendingDeleteId)}
        title="Excluir registro?"
        description="Esta acao remove o item do diario de forma permanente."
        onConfirm={handleDelete}
        onCancel={() => setPendingDeleteId(null)}
        confirmLabel="Excluir agora"
      />
    </section>
  );
}

export default PetDiaryPage;
