import { useState } from 'react'
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine  = ({value, text}) => <tr><td>{text}</td><td>{value}</td></tr>
function Statistics({good, neutral, bad}) {
  let sum = good + neutral + bad
  return (
  <>
    {
    sum === 0 ? 
    <h3>No feedback given</h3> : 
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <StatisticLine  value={good} text="good" />
        <StatisticLine  value={neutral} text="neutral" />
        <StatisticLine  value={bad} text="bad" />
        <StatisticLine  value={sum} text="all" />
        <StatisticLine  value={(good - bad) / (sum ? sum : 1)} text="average" />
        <StatisticLine  value={good / (sum ? sum : 1)} text="positive" />
        </tbody>
      </table>
    </div>
    }
  </>
  )
}
function Anecdote({anecdote, votes, header}) {
  return (
    <div> 
      <h1>{header}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}
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
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
      
    </>
  )
}

export default App
