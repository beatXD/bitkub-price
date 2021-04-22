import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [bitkub, setBitkub] = useState()
  const [binance, setBinance] = useState()

  useEffect(() => {
    const fetchBitkub = async () => {
      const bitkub = await axios.get('https://api.bitkub.com/api/market/ticker', {
        headers: { 'Cache-Control': 'no-cache' },
      })
      setBitkub(bitkub.data)
    }

    const fetchBinance = async () => {
      const binance = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
      console.log('binance', binance.data)
      setBinance(binance.data)
    }

    let increment = setInterval(() => {
      fetchBinance()
      fetchBitkub()
    }, 2000)
    return () => clearInterval(increment)
  }, [bitkub])

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          {!bitkub || !binance ? (
            <div> loading ..</div>
          ) : (
            <div>
              <div>
                <p> BITKUB PRICE </p>
                <p> ------------ </p>
                <p> USDT : ฿{bitkub.THB_USDT.last.toFixed(2)} </p>
                <p> BTC : ฿{bitkub.THB_BTC.last.toFixed(2)} </p>
                <p> LTC : ฿{bitkub.THB_LTC.last.toFixed(2)} </p>
                <p> BNB : ฿{bitkub.THB_BNB.last.toFixed(2)} </p>
                <p> DOGE : ฿{bitkub.THB_DOGE.last.toFixed(2)} </p>
                <p> ADA : ฿{bitkub.THB_ADA.last.toFixed(2)} </p>
                <p> ------------ </p>
              </div>

              <div>
                <p> BINANCE PRICE </p>
                <p> ------------ </p>
                {/* <p> USDT : ฿{bitkub.THB_USDT.last.toFixed(2)} </p> */}
                <p> BTC : ฿{binance.price} </p>
                {/* <p> LTC : ฿{bitkub.THB_LTC.last.toFixed(2)} </p> */}
                {/* <p> BNB : ฿{bitkub.THB_BNB.last.toFixed(2)} </p> */}
                {/* <p> DOGE : ฿{bitkub.THB_DOGE.last.toFixed(2)} </p> */}
                {/* <p> ADA : ฿{bitkub.THB_ADA.last.toFixed(2)} </p> */}
                <p> ------------ </p>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default App
