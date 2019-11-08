import React, { useContext, useEffect, useState } from 'react';

const LocaleContext = React.createContext();

const Locale = () => {
  const state = useContext(LocaleContext);

  return <div>{state.locale | state.data.phone}</div>
};

const defaultLocale = 'au';

const locales = {
  au: {
    phone: 1234567,
  },
  us: {
    phone: 5345345,
  }
};

const initialState = {
  userLocale: '',
  locale: localStorage.getItem('locale') || defaultLocale,
  data: locales[localStorage.getItem('locale') || defaultLocale]
};

const Home = () => {
  const [state, setLocale] = useState(initialState);

  useEffect(() => {
    fetch('').then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    }).then(json => {
      setLocale({
        ...state,
        userLocale: json.country_code.toLowerCase()
      });
    }).catch(error => error)
  }, [state]);

  useEffect(() => {
    if (state.userLocale === 'ua' && state.locale === 'au') {
      console.log(1)
    }
  }, [state, state.userLocale]);

  const onChange = (e) => {
    const { value } = e.target

    setLocale({
      data: locales[value],
      locale: value
    });

    localStorage.setItem('locale', value)
  };

  return (
    <LocaleContext.Provider value={state}>
      <select onChange={onChange} value={state.locale}>
        <option value={'au'}>au</option>
        <option value={'us'}>us</option>
      </select>
      <Locale />
    </LocaleContext.Provider>
  )
};

export default Home;
