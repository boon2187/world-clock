import React, { useState, useEffect, useMemo } from 'react';
import { format, addHours } from 'date-fns';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [city, setCity] = useState('Beijing');
  const [cityTime, setCityTime] = useState(currentTime);

  // 日本との時差

  const timeZones =useMemo(()=> ({
     Beijing: -1,
    NewYork: -13,
    Sydney: 1,
  }),[]);

  // 現在時刻の更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // クリーンアップ関数
    // メモリーリークを防ぐために、コンポーネントがアンマウントされたときにタイマーをクリアする
    return () => clearInterval(timer);
  }, []);

  // 選択した都市の時刻を更新
  useEffect(() => {
    const updateCityTime = () => {
      const cityOffset = timeZones[city];
      const newCityTime = addHours(currentTime, cityOffset);
      setCityTime(newCityTime);
    };

    updateCityTime();
   
  }, [currentTime, city,timeZones]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Current Time: {format(currentTime, 'yyyy-MM-dd HH:mm:ss')}</h1>
      <div>
        <label htmlFor="city">Select a city: </label>
        <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="Beijing">Beijing</option>
          <option value="NewYork">New York</option>
          <option value="Sydney">Sydney</option>
        </select>
      </div>
      <h2>{city} Time: {format(cityTime, 'yyyy-MM-dd HH:mm:ss')}</h2>
    </div>
  );
};

export default App;
