function FeedbackBanner({ type = "info", message }) {
  if (!message) {
    return null;
  }

  return <p className={`feedback feedback-${type}`}>{message}</p>;
}

export default FeedbackBanner;
