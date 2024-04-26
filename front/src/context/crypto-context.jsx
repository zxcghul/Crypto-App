import { createContext, useState, useEffect, useContext } from "react";
import { FetchCrypto, FetchAssets } from "../api";
import { percentDifference } from "../utils";
import { cryptoAssets } from "../data";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});


export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map(asset => {
      const coin = result.find((coin) => coin.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
};
    })
    
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await FetchCrypto();
      res = result;
      const assets = await FetchAssets();

      setAssets(
        mapAssets(assets, result)
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  
  function addAsset(newAsset) {
    setAssets(prev => mapAssets([...prev, newAsset], crypto))
    localStorage.setItem(newAsset.id, JSON.stringify(newAsset))
    let item = JSON.parse(localStorage.getItem(newAsset.id));
    cryptoAssets.push(item)
  }
  return <CryptoContext.Provider value={{loading, crypto, assets, addAsset, setAssets, mapAssets}}>{children}</CryptoContext.Provider>;
}


export default CryptoContext
export let res
export function useCrypto() {
  return useContext(CryptoContext)
  
}