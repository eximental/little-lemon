// src/pages/Home.js
import React from 'react';

function Home() {
  return (
    <main>
      <h1>Welcome to Little Lemon</h1>
      <section aria-labelledby="our-menu">
        <h2 id="our-menu">Our Menu</h2>
        <div className="items-grid">
          <article>
            <h3>Item 1</h3>
            <p>Description of item 1.</p>
          </article>
          <article>
            <h3>Item 2</h3>
            <p>Description of item 2.</p>
          </article>
          <article>
            <h3>Item 3</h3>
            <p>Description of item 3.</p>
          </article>
          {/* Add more articles as needed */}
        </div>
      </section>
    </main>
  );
}

export default Home;
