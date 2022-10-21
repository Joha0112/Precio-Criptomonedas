import './App.css';
import Crypto from './components/criptos';

function App() {
  return (
    <div className="container-fluid">
      <h1 className='text-center'>Lista De Las 50 Mejores Criptos</h1>
      <Crypto />
    </div>
  );
}

export default App;