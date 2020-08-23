import React from 'react';

import Layout from './hoc/Layout/Layout';
import Code from './components/Code/Code';
import Builder from './components/Builder/Builder';

import './App.css';

function App() {
  return (
    <div>
       <Layout>
          <Builder/>
          <Code/>
       </Layout>
    </div>
  );
}

export default App;
