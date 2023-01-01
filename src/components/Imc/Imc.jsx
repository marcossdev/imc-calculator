import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import Table from '../Table/Table';
import './Imc.css';

function Imc() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [imc, setImc] = useState('');
  const [classification, setClassification] = useState('');
  const [classAlert, setClassAlert] = useState('');

  const [hide, setHide] = useState(false);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const column = [
    { header: 'IMC', value: 'classification' },
    { header: 'Classificação', value: 'info' },
    { header: 'Obesidade', value: 'obesity' },
  ];

  const data = [
    {
      min: 0,
      max: 18.4,
      classification: 'Menor que 18,5',
      info: 'Magreza',
      obesity: '0',
    },
    {
      min: 18.5,
      max: 24.9,
      classification: 'Entre 18,5 e 24,9',
      info: 'Normal',
      obesity: '0',
    },
    {
      min: 25,
      max: 29.9,
      classification: 'Entre 25,0 e 29,9',
      info: 'Sobrepeso',
      obesity: 'I',
    },
    {
      min: 30,
      max: 39.9,
      classification: 'Entre 30,0 e 39,9',
      info: 'Obesidade',
      obesity: 'II',
    },
    {
      min: 40,
      max: 99,
      classification: 'Maior que 40,0',
      info: 'Obesidade grave',
      obesity: 'III',
    },
  ];

  const validateInputs = () => {
    switch (true) {
      case height === '' && weight === '':
        return (
          setError(true),
          setMessage('Os campos não podem estar vazios!'),
          setTimeout(() => setError(false), 3000),
          true
        );
      case height === '':
        setError(true);
        setMessage('O campo de altura não pode estar vazio!');
        setTimeout(() => setError(false), 3000);
        return true;
      case weight === '':
        setError(true);
        setMessage('O campo de peso não pode estar vazio!');
        setTimeout(() => setError(false), 3000);
        return true;

      default:
        setMessage('');
        setError(false);
        return false;
    }
  };

  const calcIMC = () => {
    const validation = validateInputs();
    const regex = /(\d*)(\.|,)(\d*)/;
    const m = +height.replace(',', '.');
    const kg = +weight.replace(',', '.');
    if (validation === false) {
      if (regex.test(m) === false) {
        setMessage('A altura deve ser em metros!');
        setError(true);
        return false;
      }
      const result = (kg / m ** 2).toFixed(1);
      return result;
    }
    return false;
  };

  const setAlertClass = () => {
    const result = calcIMC();
    if (result !== false) {
      if (result < 18.5) {
        setClassAlert('low');
      } else if (result >= 18.5 && result <= 24.9) {
        setClassAlert('good');
      } else if (result >= 25 && result <= 29.9) {
        setClassAlert('medium');
      } else if (result >= 30) {
        setClassAlert('high');
      }
    }
  };

  const changeState = () => {
    setHide(!hide);
  };

  const getClassification = () => {
    data.forEach((item) => {
      const result = calcIMC();
      if (result >= item.min && result <= item.max) {
        return setClassification(item.info);
      }
      return false;
    });
  };

  const getResult = (e) => {
    e.preventDefault();
    const result = calcIMC();
    if (result !== false) {
      setAlertClass();
      changeState();
      getClassification();
      setImc(result);
    }
  };

  const clearImputs = (e) => {
    e.preventDefault();
    setHeight('');
    setWeight('');
  };

  const handleClose = (reason) => {
    if (reason === 'clickway') {
      return;
    }
    setError(false);
  };

  return (
    <div className="Imc">
      <div className="main-container">
        <div className={`imc-calc ${hide ? 'hide' : ''}`}>
          <h2>Calculadora de IMC</h2>
          <form className="form-imc">
            <label htmlFor="height">Altura: </label>
            <input
              type="text"
              id="height"
              placeholder="Exemplo 1,70"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9.,]/, '');
                setHeight(e.target.value);
              }}
              value={height}
              autoComplete="off"
            />
            <label htmlFor="weight">Peso: </label>
            <input
              type="text"
              id="weight"
              placeholder="Exemplo 65"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9.,]/, '');
                setWeight(e.target.value);
              }}
              value={weight}
              autoComplete="off"
            />
            <div className="buttons">
              <button className="calc" type="submit" onClick={getResult}>
                Calcular
              </button>
              <button className="clean" type="submit" onClick={clearImputs}>
                Limpar
              </button>
            </div>
          </form>
        </div>
        <div className={`imc-result ${hide ? '' : 'hide'}`}>
          <p className="imc">
            Seu IMC é: <span className={classAlert}>{imc}</span>
          </p>
          <p className="situation">
            Situação atual: <span className={classAlert}>{classification}</span>
          </p>
          <p className="table-check">Confira as classificações</p>
          <Table tableData={data} tableColumn={column} />
          <button className="back" type="button" onClick={changeState}>
            Voltar
          </button>
        </div>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Imc;
