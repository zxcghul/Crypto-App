import { useRef, useState } from "react";
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  DatePicker,
  Button,
  Result,
} from "antd";
import { useCrypto } from "../../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not number",
  },
  number: {
    range: "${label} must be between ${min} adn$ {max}",
  },
};

export function AddAssetForm() {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [result, setResult] = useState(false);
  const assetRef = useRef()

  if (result) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
        ]}
      />
    );
  }
  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  function onFinish(value) {
    const newAsset = {
      id: coin.id,
      amount: value.amount,
      price: value.price,
      date: value.date?.$d ?? new Date(),
    }
    console.log(newAsset);
    assetRef.current = newAsset
    setResult(true)
    addAsset(newAsset)
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("Price");
    form.setFieldsValue({
      price: price,
    });
    form.setFieldsValue({
      total: value * price,
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }
  

  return (
    
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        Price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin}/>
      <Divider></Divider>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="price" name="price">
        <InputNumber style={{ width: "100%" }} onChange={handlePriceChange} />
      </Form.Item>

      <Form.Item label="total" name="total">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item label="Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
