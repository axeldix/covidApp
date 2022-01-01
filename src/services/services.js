export const getCountries = () => {
  const url = 'https://api.covid19api.com/countries';
  fetch(url);
};

export const getCovidDataByCountries = slug => {
  const url = `https://api.covid19api.com/total/dayone/country/${slug}/status/confirmed`;
  fetch(url);
};