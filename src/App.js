import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [bitkub, setBitkub] = useState()
  const [binance, setBinance] = useState({
    BTC: 0,
    BNB: 0,
    LTC: 0,
    DOGE: 0,
  })

  useEffect(() => {
    const fetchBitkub = async () => {
      const bitkub = await axios.get('https://api.bitkub.com/api/market/ticker', {
        headers: { 'Cache-Control': 'no-cache' },
      })
      setBitkub(bitkub.data)
    }

    const fetchBinance = async () => {
      const binanceBTC = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
      const binanceBNB = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT')
      const binanceLTC = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=LTCUSDT')
      const binanceDOGE = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT')
      setBinance({
        BTC: binanceBTC.data.price,
        BNB: binanceBNB.data.price,
        LTC: binanceLTC.data.price,
        DOGE: binanceDOGE.data.price,
      })
    }

    let increment = setInterval(() => {
      fetchBinance()
      fetchBitkub()
    }, 2000)
    return () => clearInterval(increment)
  }, [bitkub])

  return (
    <div className='App'>
      <div className='flex-container'>
        {!bitkub || !binance ? (
          <div> loading ..</div>
        ) : (
          <>
            <div>
              <p> BITKUB PRICE </p>
              {/*<p> USDT : ฿{bitkub.THB_USDT.last.toFixed(2)} </p> */}
              <p> BTC : ฿{bitkub.THB_BTC.last} </p>
              <p> BNB : ฿{bitkub.THB_BNB.last} </p>
              <p> LTC : ฿{bitkub.THB_LTC.last} </p>
              <p> DOGE : ฿{bitkub.THB_DOGE.last} </p>
              {/*<p> ADA : ฿{bitkub.THB_ADA.last.toFixed(2)} </p>*/}
            </div>
            <div>
              <p> BINANCE PRICE </p>
              {/* <p> USDT : ฿{bitkub.THB_USDT.last.toFixed(2)} </p> */}
              <p> BTC : ${binance.BTC} </p>
              <p> BNB : ${binance.BNB} </p>
              <p> LTC : ${binance.LTC} </p>
              <p> DOGE : ${binance.DOGE} </p>
              {/* <p> LTC : ฿{bitkub.THB_LTC.last.toFixed(2)} </p> */}
              {/* <p> BNB : ฿{bitkub.THB_BNB.last.toFixed(2)} </p> */}
              {/* <p> DOGE : ฿{bitkub.THB_DOGE.last.toFixed(2)} </p> */}
              {/* <p> ADA : ฿{bitkub.THB_ADA.last.toFixed(2)} </p> */}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
