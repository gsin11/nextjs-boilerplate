import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import cookies from 'nookies';

const counties = [
  {
    'label': 'us',
    'name': 'United States',
  },
  {
    'label': 'br',
    'name': 'Brazil'
  }
];
const Header = () => {
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(router.query.country);

  const handleChange = e => {
    setSelectedCountry(e.target.value);
    router.push(`/[country]`, `/${e.target.value}`);
  }

  useEffect(() => {
    cookies.set(null, 'defaultCountry', selectedCountry, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
  }, [selectedCountry])


  return (
    <header>
      <select onChange={handleChange} value={selectedCountry}>
        {counties.map((item, index) => {
          return (
            <option key={index} value={item.label}>{item.name}</option>
          )
        })}
      </select>
      <style jsx>{`
        header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
    </header>
  )
}

export default Header;