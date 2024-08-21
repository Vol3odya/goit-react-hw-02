import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import css from './App.module.css'

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const save = window.localStorage.getItem("save")
    return save !== null ? JSON.parse(save) : {
      good: 0,
      neutral: 0,
      bad:0,
    };
  });
  useEffect(() => {
    window.localStorage.setItem('save', JSON.stringify(clicks));
  }, [clicks]);

  function updateFeedback (feedbackType) {
    let good = clicks.good;
    let neutral = clicks.neutral;
    let bad = clicks.bad;

    setClicks({
      good: (feedbackType == 'good' ? good+1 : good),
      neutral: (feedbackType == 'neutral' ? neutral+1 : neutral),
      bad: (feedbackType == 'bad' ? bad+1 : bad),
    });
  }

  function clicksReset() {
    setClicks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const goodtotal = Math.round((clicks.good / totalFeedback) * 100);
  return (
    <div className={css.container}>
      <Description />
      <Options value={clicks} onUpdate={updateFeedback} onReset={clicksReset} total={totalFeedback} />
      {totalFeedback !== 0 ? <Feedback value={clicks} total={totalFeedback} goodtotal={goodtotal} /> : <Notification/>}
    </div>
  )
}

