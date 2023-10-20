import React, { useState, useEffect } from 'react';
import { Container, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

function App() {
  const [sellingPrice, setSellingPrice] = useState('');
  const [commission, setCommission] = useState('10');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [exchangeRate, setExchangeRate] = useState(localStorage.getItem('exchangeRate') || '38'); // Загрузка значения из localStorage
  const [result, setResult] = useState('');

  useEffect(() => {
    const sellingPriceValue = parseFloat(sellingPrice);
    const commissionValue = parseFloat(commission) / 100;
    const purchasePriceValue = parseFloat(purchasePrice);
    const exchangeRateValue = parseFloat(exchangeRate);

    if (!isNaN(exchangeRateValue)) {
      // Сохранение значения в localStorage
      localStorage.setItem('exchangeRate', exchangeRateValue.toString());
    }

    if (!isNaN(sellingPriceValue)) {
      let profit = sellingPriceValue;

      if (!isNaN(commissionValue)) {
        profit -= commissionValue * sellingPriceValue;
      }

      if (!isNaN(purchasePriceValue) && !isNaN(exchangeRateValue)) {
        profit -= purchasePriceValue * exchangeRateValue;
      }

      setResult(profit.toFixed(2));
    } else {
      setResult('0');
    }
  }, [sellingPrice, commission, purchasePrice, exchangeRate]);

  const textColor = result < 0 ? 'red' : result > 0 ? 'green' : 'black';

  return (
    <Container>
      
      <TextField
        label="Цена продажи"
        type="number"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Закупочная стоимость"
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <Select
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
        >
          <MenuItem value="10">10%</MenuItem>
          <MenuItem value="15">15%</MenuItem>
          <MenuItem value="20">20%</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Курс доллара"
        type="number"
        value={exchangeRate}
        onChange={(e) => setExchangeRate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h2" style={{ textAlign: 'center', color: textColor }}>
        <p>{result}</p>
      </Typography>
    </Container>
  );
}

export default App;
