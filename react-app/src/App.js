import './App.css';

function App() {
  const redirectVue = () => {
    window.history.pushState('', '', '/vue')
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p className='vue-link' onClick={redirectVue}>跳转到 vue 子应用</p>
      </header>
    </div>
  );
}

export default App;
