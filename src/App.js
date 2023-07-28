import React, { useState } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import './App.css';

function App() {
 
  const settings = {
    apiKey: 'prcqKUBa7fr0gT6N5vs2wCaM8Ir_c8SJ', // Alchemy API Key.
    network: Network.ETH_TESTNET, //  network.
  };

  const alchemy = new Alchemy(settings);
  const [contractAddress, setContractAddress] = useState('');
  const [metaData, setMetaData] = useState([]);

  const getNfts = async () => {
    try {
      const data = await alchemy.nft.getNftsForContract(contractAddress);
      console.log('mydata', data);

      // Extract the tokenId values from the fetched data and store them in an array
      const tk = data.nfts.map((nft) => nft.tokenId);
      setMetaData(tk);

      console.log('nfts collection', data.nfts);
      console.log('data of 1', data.nfts[1].tokenId);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  const handleInputChange = (event) => {
    setContractAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getNfts();
  };

  return (
    <div className="container-fluid">
  <div style={{
  fontSize: 25,
  backgroundColor: 'blue',
}}>
 Must Give Valid Contract Address
</div>

<h1>NFT COLLECTIONS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Contract Address:
          <input type="text" value={contractAddress} onChange={handleInputChange} style={{
  backgroundColor: "#9900ff",
  color: "#fff",
  border: "1px solid #fff",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 0 10px #ff8c00",
  width: "20%",
}} />

        </label>
        <button type="submit" style={{
  backgroundColor: "#9900ff",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "50px",
  boxShadow: "0 0 10px #ff8c00",
  textShadow: "0 0 2px #000",
  cursor: "pointer",
  transition: "all 0.5s",
}}>
  Fetch NFTs
</button>


      </form>

      <table className="table">
        <thead>
          <tr>``
            <th className="text-center">TOKEN ID</th>
          </tr>
        </thead>
        <tbody>
          {metaData.map((tokenId, index) => (
            <tr key={index}>
              <td className="text-center">{tokenId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;