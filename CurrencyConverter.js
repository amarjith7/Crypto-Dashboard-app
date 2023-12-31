import { useState } from "react"
import ExcahngeRate from "./ExchangeRate"
import axios from "axios"
const CurrencyConverter = () => {
    const currencies = ['BTC','RTH','USD','XRP','LTC','ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
    const [amount,setAmount] = useState(1)
    const [setExchangeRate] =useState(0)
    console.log(chosenSecondaryCurrency)
    const convert = () => {
        

        

        const options = {
          method: 'GET',
          url: 'https://alpha-vantage.p.rapidapi.com/query',
          params: {
            from_currency: chosenPrimaryCurrency,
            function: 'CURRENCY_EXCHANGE_RATE',
            to_currency: chosenSecondaryCurrency
          },
          headers: {
            'X-RapidAPI-Key': 'ad62ee2d91msh9fa9b8d9927c6f2p1443dbjsn0c7510c757f7',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
          }
        };
        
     axios.request(options).then((response) => {
        console.log(response.data['Realtime Currency Exchange Rate']['5.Exchnge Rate'])
        setExchangeRate(response.data['Realtime Currency Exchange Rate']['5.Exchnge Rate'])
     }).catch((error) => {
           console.error(error);
     } )
    }
    return (
      <div className="currency-converter">
        <h2>Currency Converter</h2>
        <div className="input-box">
        <table>
            <tbody>
                <tr>
                    <td>Primary Currency</td>
                    <td>
                        <input
                            type="number"
                            name = "currency-amount-1"
                            value = {amount}
                            onChange={(e) => setAmount(e.target.value)}
                         />
                    </td>
                    <td>
                        <select 
                           value={chosenPrimaryCurrency}
                           name="currency-option-1"
                           className="currency-options"
                           onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                        >
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Secondary Currency</td>
                    <td>
                        <input
                            type="number"
                            name = "currency-amount-2"
                            value = {""}
                         />
                    </td>
                    <td>
                        <select 
                           value={chosenSecondaryCurrency}
                           name="currency-option-2"
                           className="currency-options"
                           onChange= {(e) => setChosenSecondaryCurrency(e.target.value)}
                           >
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>
            
            </tbody>
        </table>
        <button id="convert-button" onClick={convert}>Convert</button>
        </div>

        <ExcahngeRate />

      
      </div>
    )
  }
  
  export default CurrencyConverter