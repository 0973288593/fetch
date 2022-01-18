import EzReactTable from "ez-react-table";
import react, { useState, useEffect } from "react"
import AOS from "aos";
import 'aos/dist/aos.css';


function App() {

  const [coins, setCoins] = useState([]);

  const fetchCions = async () =>{
    try{
      const  res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sarkline=false');
      const data= await res.json();
      setCoins(data);
    } catch(e) {
      alert('API Fucking Error');
    }
  };

  useEffect(() => {
    fetchCions();
    AOS.init()
  }, []);

  const colums = [
    {
      title: "Name",
      key: "name",
      width : 200,
      render: (value, object ) =>{
        return (
          <div style={{ display: "flex", alignItems:"center"}}>
            <img height="20px" width="20px" src={object?.image} alt="coin" />
            <span style={{ marginLeft:"10px"}}>{object?.name}</span>
          </div>
        )
      }
    },
    {
      title: "Price",
      key: "current_price",
      width: 100,
      render : (value, object) => <div>{`$${value}`}</div>
    },
    {
      title: "Change",
      key: "price_change_percentage_24h",
      width:100,
      render: (value, object) => {
        return (
          <div style={{ color: /-/.test(value)? "#ff0374" : "#06a847"}}>
            {value}%
          </div>
        )
      }
    }
  ]

  return (
    <div data-aos="zoom-up"
    data-aos-duration="1000"  className="App-header" style={{ display: "flex", alignItems:"center",width:1555 }}>
        <EzReactTable 
    cols={colums}
    data={coins}
    darkMode
    title="Cryto Tracker"
    defaultSort="current_price"
    accentColor= "#06a847"
    tableHeight={500}
    data-aos={"fade-left"}
    />
    
      </div>
  );
}

export default App;
