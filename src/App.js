import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [state, setstate] = useState()

  useEffect(() => {
    const fetchPrice = async () => {
      const { data } = await axios.get('https://api.bitkub.com/api/market/ticker', {
        headers: { 'Cache-Control': 'no-cache' },
      })
      setstate(data)
    }

    let increment = setInterval(() => fetchPrice(), 2000)
    return () => clearInterval(increment)
  }, [state])

  console.log('state', state)
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Edit and save to reload.</p>
        <div>
          {!state ? (
            <div> loading ..</div>
          ) : (
            <div>
              <p> BTC PRICE : {state.THB_BTC.last.toFixed(5)} </p>
              <p> BNB PRICE : {state.THB_BNB.last.toFixed(5)} </p>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default App
