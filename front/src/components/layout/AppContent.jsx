import { Layout, Typography, Tag } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from './PortfolioChart';
import AssetTable from './AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
  };

export default function AppContent () {
  const { assets, crypto }= useCrypto()
    return (<Layout.Content style={contentStyle}>
      
      <Typography.Title level={3} style={{textAlign: 'left', color: '#ffff'}}> Portfolio: 
      <Tag color="#87d068" style={{fontSize: 24, padding: '.4rem', marginLeft: '1rem'}}>{assets.map(asset => {
        const coin = crypto.find(c => c.id === asset.id)
        return asset.amount * coin.price
      }).reduce((acc, v)=> acc += v, 0).toFixed(2)} $
      </Tag>
      </Typography.Title>
      <PortfolioChart/>
      <AssetTable/>
    </Layout.Content>)
}