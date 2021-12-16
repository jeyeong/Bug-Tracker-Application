import React from 'react';
import loadingImg from '../../assets/img/loading.svg'

import './Loading.css'

const Loading = () => {
  return (
    <div className='spinner'>
      <img src={loadingImg} alt='Loading...' />
    </div>
  );
}

export default Loading;
