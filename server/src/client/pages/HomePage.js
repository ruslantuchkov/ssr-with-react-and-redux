import React from 'react';

const Home = () => {
  return (
    <div>
      Hello Home!!!
      <button onClick={() => console.log('klikied')}>CLicK</button>
    </div>
  );
};

export default {
  component: Home
};