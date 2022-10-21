import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Crypto = () => {
  // 1 - setear los hooks
  const [ search, setSearch ] = useState("")  
  const [ cryptos, setCryptos ] = useState( [] )
  //2 - función para traer los datos
  const endpoint = 'https://api.coingecko.com/api/v3/coins' 
  const showData = () => {
    axios.get(endpoint).then( (res) => {
        //console.log(res.data)
        setCryptos(res.data)
    })
  }
  //useEffect
  useEffect( ()=> {
    showData()
  },[])
  //3 - función de búsqueda
  const searcher = (e) => {
      setSearch(e.target.value)
      //console.log(e.target.value)
  }
  //4 - filtrar los datos
  const results = !search ? cryptos : cryptos.filter( (val)=> val.name.toLowerCase().includes(search.toLocaleLowerCase()) )
  //renderizamos la vista
  return (
    <>
    <input value={search} onChange={searcher} type='text' placeholder='Search...' className='form-control' />
    <table className='table table-dark table-hover mt-3'>
        <thead>
            <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Circulating Supply</th>
            </tr>
        </thead>
        <tbody>
            { results.map( (result)=> (
                <tr key={result.id}>
                    <td>{result.market_data.market_cap_rank}</td>
                    <td><small><img src={result.image.small}/> {result.name} </small></td>
                    <td>{result.symbol.toUpperCase()}</td>
                    <td>{result.market_data.current_price.bmd.toFixed(2)}</td>
                    <td>{result.market_data.market_cap.bmd > 0 ? (
                     <span className='badge bg-danger'>{result.market_data.market_cap.bmd}</span>  
                        ):(
                          <span className='badge bg-success'>{result.market_data.market_cap.bmd}</span>    
                        ) }
                    </td>
                    <td>{result.market_data.circulating_supply > 0 ? (
                     <span className='badge bg-danger'>{result.market_data.circulating_supply}</span>  
                        ):(
                          <span className='badge bg-success'>{result.market_data.circulating_supply}</span>    
                        ) }
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}
export default Crypto
