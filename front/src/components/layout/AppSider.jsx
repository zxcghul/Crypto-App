import { Layout, Card, Statistic, List, Typography, Tag, Button, Result } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitilize } from "../../utils";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";


const siderStyle = {
  padding: "1rem",
};


export default function AppSider() {

  const { assets, setAssets, mapAssets} = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitilize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? "#3f8600" : "#cf1322",
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {title: 'Total profit', value: asset.totalProfit, withTag: true},
              {title: 'Asset Amount', value: asset.amount, isPlane: true},
            ]}
            renderItem={(item) => (
              
              <List.Item>
                <span>{item.title}</span>
                <span>
                {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                {item.isPlane && item.value}
                {!item.isPlane && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                </span>
              </List.Item>
            )}
          />
          <Button type="primary" size={'small'} style={{backgroundColor: '#DCDCDC', color: 'black'}} 
          onClick={async () => {
            localStorage.removeItem(asset.id)
            setAssets(
              mapAssets(assets.filter((n) => {
                return n.id != asset.id
              }))
            );
          }}>
            delete
          </Button>
        </Card>
      ))}
    </Layout.Sider>
  );
}
