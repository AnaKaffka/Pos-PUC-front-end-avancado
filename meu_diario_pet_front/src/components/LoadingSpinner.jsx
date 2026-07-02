function LoadingSpinner({ label = "Carregando..." }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
