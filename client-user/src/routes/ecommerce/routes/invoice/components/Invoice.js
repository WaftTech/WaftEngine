import React from 'react';
import QueueAnim from 'rc-queue-anim';
import './styles.scss';

const Invoice = () => (
  <div className="invoice-wrapper">
    <section className="invoice-container" id="invoice">

      <div className="invoice-inner">
        <div className="row">
          <div className="col-6">
            <h1>INVOICE</h1>
          </div>
          <div className="col-6 text-right">
            Lisa Doe <br />
            PO Box 21177 <br />
            MELBOURNE VIC 8011 <br />
            Austria
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-6">
            <p><strong>Invoice To</strong></p>
              Jone Doe <br />
              PO Box 21177 <br />
              MELBOURNE VIC 8011 <br />
              Austria
            </div>
          <div className="col-6 text-right">
            <p><strong>Details:</strong></p>
            <strong>Date:</strong> August 10, 2014 <br />
            <strong>ID:</strong> 1357995 <br />
            <strong>Amount Due:</strong> $ 3040
          </div>
        </div>

        <div className="divider my-4" />

        <table className="table table-bordered table-striped">
          <thead>
            <tr className="thead-dark">
              <th className="text-center">#</th>
              <th>Product</th>
              <th className="text-center">Unit Cost</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td>Product One</td>
              <td className="text-center">100</td>
              <td className="text-center">1</td>
              <td className="text-center">100</td>
            </tr>
            <tr>
              <td className="text-center">2</td>
              <td>Product Two</td>
              <td className="text-center">550</td>
              <td className="text-center">2</td>
              <td className="text-center">1100</td>
            </tr>
            <tr>
              <td className="text-center">3</td>
              <td>Product Three</td>
              <td className="text-center">320</td>
              <td className="text-center">2</td>
              <td className="text-center">640</td>
            </tr>
            <tr>
              <td className="text-center">4</td>
              <td>Product Four</td>
              <td className="text-center">80</td>
              <td className="text-center">5</td>
              <td className="text-center">400</td>
            </tr>
            <tr>
              <td className="text-center">5</td>
              <td>Product Five</td>
              <td className="text-center">90</td>
              <td className="text-center">4</td>
              <td className="text-center">360</td>
            </tr>
            <tr>
              <td className="text-center">6</td>
              <td>Product Six</td>
              <td className="text-center">35</td>
              <td className="text-center">4</td>
              <td className="text-center">140</td>
            </tr>
          </tbody>
        </table>

        <div className="row">
          <div className="col-8">
            <p className="size-h3">Thanks for your business</p>
            <ul>
              <li>Aeserunt tenetur cum nihil repudiandae perferendis fuga vitae corporis!</li>
              <li>Laborum, necessitatibus recusandae ullam at iusto dolore.</li>
              <li>Voluptatum aperiam voluptates quasi!</li>
              <li>Assumenda, iusto, consequuntur corporis atque culpa saepe magnam recusandae</li>
              <li>Possimus odio ipsam magni sint reiciendis unde amet</li>
            </ul>
          </div>
          <div className="col-4 invoice-sum text-right">
            <ul className="list-unstyled">
              <li>Sub - Total amount: $ 2740</li>
              <li>Discount: -----</li>
              <li>Tax (12%): $300</li>
              <li><strong>Grand Total: $ 3040</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const Page = () => (
  <section className="page-invoice">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Invoice /></div>
    </QueueAnim>
  </section>
);

export default Page;

