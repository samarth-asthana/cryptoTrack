import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Coin from "./Coin";
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  });
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">SEARCH A CRYPTO</h1>
        <form>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search"
            className="coin-input"
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return <Coin key={coin.id} priceChange={coin.price_change_percentage_24h} name={coin.name} image={coin.image} symbol={coin.symbol} volume={coin.total_volume} price={coin.current_price} marketcap={coin.market_cap}/>;
      })}
    </div>
  );
}

export default App;
