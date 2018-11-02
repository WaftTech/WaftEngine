import React from 'react';
import QueueAnim from 'rc-queue-anim';

const ResponsiveTable = () => (
  <article className="article">
    <h2 className="article-title">Responsive Table</h2>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Material</th>
            <th>Quantity</th>
            <th>Unit price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>AZ90</td>
            <td>Acrylic (Transparent)</td>
            <td>25</td>
            <td>$2.90</td>
          </tr>
          <tr>
            <td>2</td>
            <td>BC30</td>
            <td>Plywood (Birch)</td>
            <td>50</td>
            <td>$1.25</td>
          </tr>
          <tr>
            <td>3</td>
            <td>DL32</td>
            <td>Laminate (Gold on Blue)</td>
            <td>10</td>
            <td>$2.35</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
);

const FlipScroll = () => (
  <article className="article">
    <h2 className="article-title">Flip Scroll</h2>
    <div className="box box-default table-flip-scroll">

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Code</th>
            <th className="numeric">Price</th>
            <th className="numeric">Change</th>
            <th className="numeric">Open</th>
            <th className="numeric">High</th>
            <th className="numeric">Low</th>
            <th className="numeric">Volume</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AAC</td>
            <td className="numeric">$1.38</td>
            <td className="numeric">-0.01</td>
            <td className="numeric">$1.39</td>
            <td className="numeric">$1.39</td>
            <td className="numeric">$1.38</td>
            <td className="numeric">9,395</td>
          </tr>
          <tr>
            <td>AAD</td>
            <td className="numeric">$1.15</td>
            <td className="numeric">    +0.02</td>
            <td className="numeric">$1.14</td>
            <td className="numeric">$1.15</td>
            <td className="numeric">$1.13</td>
            <td className="numeric">56,431</td>
          </tr>
          <tr>
            <td>AAX</td>
            <td className="numeric">$4.00</td>
            <td className="numeric">-0.04</td>
            <td className="numeric">$4.01</td>
            <td className="numeric">$4.05</td>
            <td className="numeric">$4.00</td>
            <td className="numeric">90,641</td>
          </tr>
          <tr>
            <td>ABC</td>
            <td className="numeric">$3.00</td>
            <td className="numeric">    +0.06</td>
            <td className="numeric">$2.98</td>
            <td className="numeric">$3.00</td>
            <td className="numeric">$2.96</td>
            <td className="numeric">862,518</td>
          </tr>
          <tr>
            <td>ABP</td>
            <td className="numeric">$1.91</td>
            <td className="numeric">0.00</td>
            <td className="numeric">$1.92</td>
            <td className="numeric">$1.93</td>
            <td className="numeric">$1.90</td>
            <td className="numeric">595,701</td>
          </tr>
          <tr>
            <td>ABY</td>
            <td className="numeric">$0.77</td>
            <td className="numeric">    +0.02</td>
            <td className="numeric">$0.76</td>
            <td className="numeric">$0.77</td>
            <td className="numeric">$0.76</td>
            <td className="numeric">54,567</td>
          </tr>
          <tr>
            <td>ACR</td>
            <td className="numeric">$3.71</td>
            <td className="numeric">    +0.01</td>
            <td className="numeric">$3.70</td>
            <td className="numeric">$3.72</td>
            <td className="numeric">$3.68</td>
            <td className="numeric">191,373</td>
          </tr>
          <tr>
            <td>ADU</td>
            <td className="numeric">$0.72</td>
            <td className="numeric">0.00</td>
            <td className="numeric">$0.73</td>
            <td className="numeric">$0.74</td>
            <td className="numeric">$0.72</td>
            <td className="numeric">8,602,291</td>
          </tr>
          <tr>
            <td>AGG</td>
            <td className="numeric">$7.81</td>
            <td className="numeric">-0.22</td>
            <td className="numeric">$7.82</td>
            <td className="numeric">$7.82</td>
            <td className="numeric">$7.81</td>
            <td className="numeric">148</td>
          </tr>
          <tr>
            <td>AGK</td>
            <td className="numeric">$13.82</td>
            <td className="numeric">    +0.02</td>
            <td className="numeric">$13.83</td>
            <td className="numeric">$13.83</td>
            <td className="numeric">$13.67</td>
            <td className="numeric">846,403</td>
          </tr>
          <tr>
            <td>AGO</td>
            <td className="numeric">$3.17</td>
            <td className="numeric">-0.02</td>
            <td className="numeric">$3.11</td>
            <td className="numeric">$3.22</td>
            <td className="numeric">$3.10</td>
            <td className="numeric">5,416,303</td>
          </tr>
        </tbody>
      </table>

    </div>
  </article>
);


const Page = () => (
  <section className="container-fluid container-mw-xl chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><ResponsiveTable /></div>
      <div key="2"><FlipScroll /></div>
    </QueueAnim>
  </section>
);

export default Page;
