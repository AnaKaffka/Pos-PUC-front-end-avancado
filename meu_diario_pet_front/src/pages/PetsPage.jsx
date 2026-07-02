import { useEffect, useMemo, useState } from "react";
import FeedbackBanner from "../components/FeedbackBanner";
import IconBadge from "../components/IconBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import PetCard from "../components/PetCard";
import PrimaryButton from "../components/PrimaryButton";
import RevealBlock from "../components/RevealBlock";
import SearchBar from "../components/SearchBar";
import TooltipHint from "../components/TooltipHint";
import { createPet, getPets } from "../services/mockApi";

const initialForm = {
  nome: "",
  idade: "",
  tipo: "",
  foto: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=60",
};

function PetsPage() {
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });

  const hasFilters = useMemo(() => search.trim().length > 0, [search]);

  const loadPets = (query = "") => {
    setLoading(true);
    getPets(query)
      .then((items) => {
        setPets(items);
        if (items.length === 0) {
          setFeedback({ type: "warning", message: "Nenhum pet encontrado." });
        } else {
          setFeedback({ type: "success", message: "Dados carregados com sucesso." });
        }
      })
      .catch(() => {
        setFeedback({ type: "error", message: "Erro ao carregar dados dos pets." });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPets();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      loadPets(search);
    }, 250);

    return () => clearTimeout(debounce);
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.nome || !form.idade || !form.tipo) {
      setFeedback({
        type: "warning",
        message: "Preencha nome, idade e tipo antes de cadastrar.",
      });
      return;
    }

    setSaving(true);
    createPet(form)
      .then(() => {
        setForm(initialForm);
        setFeedback({ type: "success", message: "Pet cadastrado com sucesso!" });
        loadPets(search);
      })
      .catch(() => {
        setFeedback({ type: "error", message: "Falha ao cadastrar o pet." });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <section className="page page-pets">
      <RevealBlock direction="left">
        <div className="card page-masthead">
          <p className="eyebrow">Gestao de pets</p>
          <h2>Painel de cadastro e descoberta</h2>
          <p className="section-copy">
            Use busca em tempo real, crie novos perfis e abra o diario de cada pet em poucos cliques.
          </p>
          <div className="masthead-meta">
            <span className="meta-pill"><IconBadge icon="paw" label="Pets" />Exibidos: {loading ? "..." : pets.length}</span>
            <span className="meta-pill"><IconBadge icon="search" label="Busca" />Filtro: {hasFilters ? search : "nenhum"}</span>
            <span className="meta-pill"><IconBadge icon="diary" label="Dados" />Persistencia local ativa</span>
          </div>
        </div>
      </RevealBlock>

      <RevealBlock delay={100} direction="right">
        <div className="grid-two">
          <form className="card panel-elevated" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Novo Pet</h2>
              <TooltipHint text="Os dados sao salvos localmente e simulam uma API." />
            </div>
            <p className="section-copy compact">
              Cadastre rapidamente para iniciar o acompanhamento no diario individual.
            </p>

            <label>
              Nome
              <input
                className="input"
                value={form.nome}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, nome: event.target.value }))
                }
              />
            </label>

            <label>
              Idade
              <input
                className="input"
                type="number"
                min="0"
                value={form.idade}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, idade: event.target.value }))
                }
              />
            </label>

            <label>
              Tipo
              <select
                className="input"
                value={form.tipo}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, tipo: event.target.value }))
                }
              >
                <option value="">Selecione</option>
                <option value="Gato">Gato</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Coelho">Coelho</option>
                <option value="Hamster">Hamster</option>
                <option value="Ave">Ave</option>
              </select>
            </label>

            <label>
              URL da foto
              <input
                className="input"
                value={form.foto}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, foto: event.target.value }))
                }
              />
            </label>

            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Cadastrar Pet"}
            </PrimaryButton>
          </form>

          <div className="card panel-elevated">
            <h2>Meus Pets</h2>
            <SearchBar
              value={search}
              onChange={setSearch}
              onClear={() => setSearch("")}
            />

            {hasFilters ? (
              <p className="inline-note">Filtro ativo: "{search}"</p>
            ) : null}

            <FeedbackBanner type={feedback.type} message={feedback.message} />

            {loading ? (
              <LoadingSpinner label="Carregando pets" />
            ) : pets.length === 0 ? (
              <div className="empty-state-block">
                <p className="empty-state">Nenhum pet encontrado para esse criterio.</p>
                <p className="empty-state">Tente outro termo ou cadastre um novo perfil.</p>
              </div>
            ) : (
              <div className="pet-grid">
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            )}
          </div>
        </div>
      </RevealBlock>
    </section>
  );
}

export default PetsPage;
