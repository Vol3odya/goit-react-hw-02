import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import css from './App.module.css'

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const save = {
      good: Number(window.localStorage.getItem("saveGood")),
      neutral: Number(window.localStorage.getItem("saveNeutral")),
      bad: Number(window.localStorage.getItem("saveBad")),
    };
    return save.good !== undefined ? save : {
      good: 0,
      neutral: 0,
      bad:0,
    };
  });
  useEffect(() => {
    window.localStorage.setItem('saveGood', JSON.stringify(clicks.good));
    window.localStorage.setItem('saveNeutral', JSON.stringify(clicks.neutral));
    window.localStorage.setItem('saveBad', JSON.stringify(clicks.bad));
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
    if (feedbackType == 'reset') {
      setClicks({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    }
  }
  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  return (
    <div className={css.container}>
      <Description />
      <Options value={clicks} onUpdate={updateFeedback} reset={totalFeedback} />
      { totalFeedback!==0 ? <Feedback value={clicks}/> : <Notification/>}
    </div>
  )
}

