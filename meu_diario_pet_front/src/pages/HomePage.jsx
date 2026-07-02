import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBadge from "../components/IconBadge";
import PrimaryButton from "../components/PrimaryButton";
import LoadingSpinner from "../components/LoadingSpinner";
import RevealBlock from "../components/RevealBlock";
import { getPets } from "../services/mockApi";

const valuePills = [
  "Sem login obrigatorio",
  "Simulacao de API com JSON",
  "Fluxo rapido para cadastro e diario",
];

const howItWorks = [
  {
    title: "Cadastre com rapidez",
    description: "Informe nome, tipo e idade em poucos campos para iniciar o acompanhamento.",
  },
  {
    title: "Registre cada dia",
    description: "Adicione humor, alimentacao e observacoes para montar historico real de rotina.",
  },
  {
    title: "Tome decisoes melhores",
    description: "Com os registros organizados, fica mais facil identificar padroes e melhorias.",
  },
];

const highlights = [
  {
    title: "Navegacao orientada",
    description: "Fluxo com rotas claras para descobrir pets, abrir diarios e voltar sem se perder.",
  },
  {
    title: "Feedback imediato",
    description: "Mensagens de sucesso, erro e vazio ajudam o usuario a entender cada acao.",
  },
  {
    title: "Interface responsiva",
    description: "Experiencia legivel e funcional em desktop, tablet e celular.",
  },
];

function HomePage() {
  const [petCount, setPetCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    getPets()
      .then((pets) => {
        if (active) {
          setPetCount(pets.length);
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
  }, []);

  return (
    <section className="page page-home">
      <RevealBlock direction="left">
        <div className="hero-card hero-split">
          <div>
            <p className="eyebrow">Meu Diario Pet</p>
            <h2>Acompanhe saude, rotina e humor do seu pet em um unico lugar.</h2>
            <p className="hero-copy">
              Uma home mais moderna, com foco em clareza, velocidade e decisao.
              Cadastre rapidamente e mantenha cada dia organizado em registros uteis.
            </p>

            <div className="hero-actions">
              <PrimaryButton onClick={() => navigate("/pets")}>Cadastrar ou abrir pet</PrimaryButton>
              <PrimaryButton variant="ghost" onClick={() => navigate("/pets/1/diario")}>
                Ver diario de exemplo
              </PrimaryButton>
            </div>

            <div className="pill-list" aria-label="Diferenciais do sistema">
              {valuePills.map((pill) => (
                <span key={pill} className="pill-item">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=60"
              alt="Tutor com cachorro em area externa"
              className="hero-photo"
            />

            <div className="floating-stat">
              {loading ? (
                <LoadingSpinner label="Atualizando painel" />
              ) : (
                <>
                  <p className="stat-number">{petCount}</p>
                  <p className="stat-label">pets ativos no diario</p>
                </>
              )}
            </div>
          </div>
        </div>
      </RevealBlock>

      <RevealBlock delay={120} direction="right">
        <div className="card">
          <h3>Como funciona</h3>
          <div className="how-grid">
            {howItWorks.map((item, index) => (
              <article key={item.title} className="how-item">
                <IconBadge icon="search" label="Etapa" />
                <p className="step-index">0{index + 1}</p>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealBlock>

      <RevealBlock delay={200} direction="left">
        <div className="card">
          <h3>Destaques da experiencia</h3>
          <div className="highlight-grid">
            {highlights.map((item) => (
              <article key={item.title} className="highlight-item">
                <IconBadge icon="paw" label="Destaque" />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealBlock>

      <RevealBlock delay={280} direction="up">
        <div className="card cta-band">
          <div>
            <h3>Pronto para organizar o cuidado do seu pet?</h3>
            <p>
              Comece pelo cadastro, teste os diarios e use o guia para inspirar uma rotina
              de saude mais consistente.
            </p>
          </div>
          <PrimaryButton onClick={() => navigate("/pets")}>Comecar agora</PrimaryButton>
        </div>
      </RevealBlock>
    </section>
  );
}

export default HomePage;
