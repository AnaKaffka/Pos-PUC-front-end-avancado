import PrimaryButton from "./PrimaryButton";

function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "Confirmar",
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="modal-actions">
          <PrimaryButton variant="ghost" onClick={onCancel}>
            Cancelar
          </PrimaryButton>
          <PrimaryButton onClick={onConfirm}>{confirmLabel}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
