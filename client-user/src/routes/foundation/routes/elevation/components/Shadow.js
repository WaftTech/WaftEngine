import React from 'react';

let numArray = [];
for (let i = 0; i < 25; i++) {
  numArray.push(i);
}

const Section = () => (
  <article className="article">
    <h2 className="article-title">Shadows</h2>
    <div className="elevation-demo-container">
      {
        numArray.map((num, i) =>
          <div className={`elevation-demo-surface mdc-elevation--z${num}`} key={i}>
            {num}dp
          </div>
        )
      }
    </div>
  </article>
)

export default Section;
