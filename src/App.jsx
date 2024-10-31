import React from 'react';
import MedalForm from './MedalForm';
import './App.css';

function App() {
  return (
    <Layout> 
      <section className="whole_layout">
        <h1>2024 파리올림픽</h1>
        <MedalForm />
      </section>
    </Layout>
  );
}

function Layout({ children }) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default App
