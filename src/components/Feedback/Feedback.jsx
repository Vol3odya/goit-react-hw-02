import css from "./Feedback.module.css"

export default function Feedback({ value }) {
  const totalFeedback = value.good + value.neutral + value.bad;
  return (
    <div>
      <p>Good: {value.good}</p>
      <p>Neutral: { value.neutral}</p>
      <p>Bad: {value.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Total: {Math.round((value.good / totalFeedback)*100)} %</p>
    </div>
  );
}
