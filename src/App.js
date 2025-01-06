import './App.css';
import Header from './global/Header';
import Footer from './global/Footer';


function App() {
  return (
    <>
    <head>
      <title>Little lemon</title>
      <meta name="description" content="your text goes here"/>
      <meta name="og:title" content=""/>
      <meta name="og:description" content=""/>
    </head>
      <Header />
      <main>
        <h1>Little Lemon</h1>
        <div className="items-grid">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
