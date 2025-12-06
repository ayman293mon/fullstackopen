import { useState } from 'react'
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Display = ({value, text}) => <p>{text} {value}</p>
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const IncreaseGood = () => setGood(good + 1)
  const IncreaseNeutral = () => setNeutral(neutral + 1)
  const IncreaseBad = () => setBad(bad + 1)
  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={IncreaseGood} text="good" />
        <Button onClick={IncreaseNeutral} text="neutral" />
        <Button onClick={IncreaseBad} text="bad" />
        <Display value={good} text="good" />
        <Display value={neutral} text="neutral" />
        <Display value={bad} text="bad" />
      </div>
    </>
  )
}

export default App
