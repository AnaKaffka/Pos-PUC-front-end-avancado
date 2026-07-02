function TooltipHint({ text }) {
  return (
    <span className="tooltip" tabIndex={0} aria-label={text}>
      ?
      <span className="tooltip-bubble" role="tooltip">
        {text}
      </span>
    </span>
  );
}

export default TooltipHint;
