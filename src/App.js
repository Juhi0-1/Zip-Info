
import { useState } from 'react';
import './App.css';
import countriesData from './data';
import axios from 'axios';
function App() {
  const [code, setCode] = useState('');
  const [country, setCountry] = useState('');
  const [locationInfo, setLocationInfo] = useState(['Enter code and country for results']);
  const [selectedCountry, setSelectedCountry] = useState('');


  function getCountryCode(countryName) {
    const country = countriesData.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
  
    return country ? country.code : null;
  }
 const handleChange = (e)=>{
  
  setSelectedCountry(e.target.value);
   setCountry(()=>getCountryCode(e.target.value)) ;
  

   
 }

 const getInfo = ()=>{
  axios.get(`https://api.zippopotam.us/${country}/${code}`)
  .then((response) => {
    console.log(response.data);
    setLocationInfo(response.data);
  })
  .catch((error) => {
    console.error('There was a problem with the request:', error);
    setLocationInfo('Error 404 Not Found, Check console for more updates');
  });
 }

 const countryOptions = countriesData.map((country, index) => (
  <option key={index} value={country.name}>
    {country.name}
  </option>
));


const clearOut = ()=>{
  setCountry('');
  setCode('');
  setLocationInfo(['Enter code and country for results']);
  setSelectedCountry('');
}
  return (
    <div className='flex flex-row h-screen '>
    <div className=' w-1/2 h-screen bg-gradient-to-r from-purple-300 to-purple-100 '>
      <h1 className='text-3xl font-serif font-bold text-center text-purple-950 my-10'>Zip Code Information App</h1>
      <div className='lg:absolute lg:top-1/3 flex flex-col justify-evenly'>

       <div className='lg:p-5 flex flex-col justify-evenly text-center items-center lg:flex-row md:flex-row'>
        <label className='font-serif font-bold text-2xl text-purple-950'> Postal Code : </label>
        <input className='bg-white text-lg rounded p-2 lg:m-2 '  value={code} placeholder='Enter Zip Code' onChange={(e)=>setCode(e.target.value)}/>
       </div>
       <div className='lg:p-5  flex flex-col justify-evenly text-center items-center  lg:flex-row md:flex-row '>
        <label className='font-serif font-bold text-2xl text-purple-950'> Country :</label>
        {/* <input className='bg-white text-xl p-2 m-2' placeholder='--Select Country--'  onChange={handleChange}/> */}
        <select 
        //  className='bg-white text-xl p-2 m-2'
         className="border lg:m-2 p-2 rounded lg:py-2 lg:px-3 text-gray-700  "
        value={selectedCountry} onChange={handleChange}>
        <option value="" disabled hidden className="text-gray-400">--Select a Country--</option>
        {countryOptions}
      </select>
       </div>
       
       <div className='flex flex-row justify-evenly'>
       <button className='px-8 py-3 text-purple-900 rounded bg-purple-200 mt-2 font-semibold' onClick={getInfo}>Get data</button>
       <button  className='px-8 py-3 text-purple-900 rounded bg-purple-200 mt-2 font-semibold ' onClick={clearOut}>Clear</button>
       </div>
       </div>

    </div>
    <div className='w-1/2 h-full overflow-y-auto p-8'>
      <h1 className='text-purple-900  text-3xl p-6 font-serif font-semibold'>Results</h1>
    <pre>{JSON.stringify(locationInfo, null, 2)}</pre>
    </div>
    </div>
  );
}

export default App;
