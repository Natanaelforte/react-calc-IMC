import { useState } from 'react';
import styles from './App.module.css';
import logo from './img/powered.png';
import leftArrowImage from './img/leftarrow.png'
import {GridItem} from './components/GridItem'

import { levels, calculateImc, Level } from './helpers/imc';

const App = () => {
  const [heighField, setHeigthField] = useState<number>(0);
  const [weighField, setWeigthField] = useState<number>(0);
  const [showLevel, setShowLevel] = useState<Level | null>(null);

  const botaoCalcular = () => {
    if(heighField && weighField) {
      setShowLevel(calculateImc(heighField,weighField));

    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleBackButtom = () => {
    setShowLevel(null)
    setHeigthField(0)
    setWeigthField(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={logo} alt='' width={150} />
        </div>
      </header>
      <div className={styles.container}>

        <div className={styles.leftSide}>
          <h1>Calcúle o seu IMC</h1>
          <p>
            IMC é a sigla para índice de massa corpórea,
             parâmetro adotado pela Organização Mundial
             de Saúde para, calcular o peso ideal de 
             cada pessoa.
            </p>

            <input
              type='number'
              placeholder='Digite sua altura. ex: 1.5 (em metros)'
              value={heighField > 0 ? heighField : ''}
              onChange={e => setHeigthField(parseFloat(e.target.value))}
              disabled={showLevel? true : false}
            />

            <input
              type='number'
              placeholder='Digite seu peso. ex: 50.5 (em kg)'
              value={weighField > 0 ? weighField : ''}
              onChange={e => setWeigthField(parseFloat(e.target.value))}
              disabled={showLevel? true : false}
            />

            <button onClick={botaoCalcular} disabled={showLevel? true : false}>Calcúlar</button>

        </div>

        <div className={styles.rightSide}>
          {! showLevel &&
            <div className={styles.grid}>
              {levels.map((item, key)=>(
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {showLevel &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButtom}>
                <img src={leftArrowImage} alt='' width={25}/>
              </div>
              <GridItem item={showLevel}/>
            </div>
          }
        </div>

      </div>

    </div>
  );
}

export default App;