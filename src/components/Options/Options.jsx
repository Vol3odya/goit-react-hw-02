import css from "./Options.module.css"

export default function Options({ value, onUpdate, reset }) {
  
  return (
    <div>
      <button className={css.button} onClick={() => onUpdate('good')}>Good</button>
      <button className={css.button}  onClick={() => onUpdate('neutral')}>Neutral</button>
      <button className={css.button}  onClick={() => onUpdate('bad')}>Bad</button>
      {reset !==0 && (<button className={css.button}  onClick={() => onUpdate('reset')}>Reset</button>)}
    </div>
  )
}