import { useEffect, useMemo, useState } from "react";
import FeedbackBanner from "../components/FeedbackBanner";
import IconBadge from "../components/IconBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import RevealBlock from "../components/RevealBlock";
import TooltipHint from "../components/TooltipHint";
import { getCareTips } from "../services/mockApi";

function CareTipsPage() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });

  const categoryCount = useMemo(() => {
    return new Set(tips.map((tip) => tip.categoria)).size;
  }, [tips]);

  useEffect(() => {
    getCareTips()
      .then((items) => {
        setTips(items);
        setFeedback({ type: "success", message: "Guia carregado com sucesso." });
      })
      .catch(() => {
        setFeedback({ type: "error", message: "Erro ao carregar o guia." });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="page">
      <RevealBlock direction="right">
        <div className="card page-masthead">
          <p className="eyebrow">Guia pratico</p>
          <h2>Cuidados essenciais para o dia a dia</h2>
          <p className="section-copy">
            Sugestoes objetivas para apoiar saude, prevencao e bem-estar na rotina do pet.
          </p>
          <div className="masthead-meta">
            <span className="meta-pill"><IconBadge icon="tip" label="Dicas" />Dicas: {loading ? "..." : tips.length}</span>
            <span className="meta-pill"><IconBadge icon="search" label="Categorias" />Categorias: {loading ? "..." : categoryCount}</span>
            <span className="meta-pill"><IconBadge icon="paw" label="Leitura" />Leitura rapida</span>
          </div>
        </div>
      </RevealBlock>

      <RevealBlock delay={120} direction="left">
        <div className="card panel-elevated">
          <div className="form-header">
            <h2>Guia de Cuidados</h2>
            <TooltipHint text="Dicas basicas para uma rotina mais saudavel com seu pet." />
          </div>

          <FeedbackBanner type={feedback.type} message={feedback.message} />

          {loading ? (
            <LoadingSpinner label="Carregando dicas" />
          ) : tips.length === 0 ? (
            <div className="empty-state-block">
              <p className="empty-state">Nenhuma dica disponivel no momento.</p>
              <p className="empty-state">Atualize o arquivo de dados para inserir novas recomendacoes.</p>
            </div>
          ) : (
            <div className="tips-grid">
              {tips.map((tip) => (
                <article key={tip.id} className="tip-card">
                  <p className="tag">{tip.categoria}</p>
                  <h3>{tip.titulo}</h3>
                  <p>{tip.descricao}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </RevealBlock>
    </section>
  );
}

export default CareTipsPage;
