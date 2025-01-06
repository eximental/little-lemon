import './App.css';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import AppRoutes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
      <Router>
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Router>
  );
}

export default App;
