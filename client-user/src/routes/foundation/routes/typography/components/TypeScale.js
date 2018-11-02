import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Types = [
  {
    scaleCategory: '<div class="mdc-typography--headline1">h1</div>',
    typeface: 'Roboto',
    font: 'Light',
    size: '96',
    case: 'sentence',
    letterSpacing: '-1.5'
  },
  {
    scaleCategory: '<div class="mdc-typography--headline2">h2</div>',
    typeface: 'Roboto',
    font: 'Light',
    size: '60',
    case: 'sentence',
    letterSpacing: '-0.5'
  },
  {
    scaleCategory: '<div class="mdc-typography--headline3">h3</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '48',
    case: 'sentence',
    letterSpacing: '0'
  },
  {
    scaleCategory: '<div class="mdc-typography--headline4">h4</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '34',
    case: 'sentence',
    letterSpacing: '0.25'
  },
  {
    scaleCategory: '<div class="mdc-typography--headline5">h5</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '24',
    case: 'sentence',
    letterSpacing: '0'
  },
  {
    scaleCategory: '<div class="mdc-typography--headline6">h6</div>',
    typeface: 'Roboto',
    font: 'Medium',
    size: '20',
    case: 'sentence',
    letterSpacing: '0.15'
  },
  {
    scaleCategory: '<div class="mdc-typography--subtitle1">Subtitle 1</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '16',
    case: 'sentence',
    letterSpacing: '0.15'
  },
  {
    scaleCategory: '<div class="mdc-typography--subtitle2">Subtitle 2</h2>',
    typeface: 'Roboto',
    font: 'Medium',
    size: '14',
    case: 'sentence',
    letterSpacing: '0.1'
  },
  {
    scaleCategory: '<div class="mdc-typography--body1">Body 1</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '16',
    case: 'sentence',
    letterSpacing: '0.5'
  },
  {
    scaleCategory: '<div class="mdc-typography--body2">Body 2</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '14',
    case: 'sentence',
    letterSpacing: '0.25'
  },
  {
    scaleCategory: '<div class="mdc-typography--button">Button</div>',
    typeface: 'Roboto',
    font: 'Medium',
    size: '14',
    case: 'All caps',
    letterSpacing: '0.75'
  },
  {
    scaleCategory: '<div class="mdc-typography--caption">Caption</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '12',
    case: 'sentence',
    letterSpacing: '0.4'
  },
  {
    scaleCategory: '<div class="mdc-typography--overline">Overline</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '10',
    case: 'All caps',
    letterSpacing: '1.5'
  },
]



const Section = () => (
  <article className="article">
    <h2 className="article-title">Type Scale</h2>

    <div className="rich-media">
      <div className="row">
        <div className="col-xl-4">
          <p>The Material Design type scale includes a range of contrasting styles that support the needs of your product and its content.</p>
          <p>The type scale is a combination of 13 styles that are supported by the type system. It contains reusable categories of text, each with an intended application and meaning.</p>
        </div>
        <div className="col-xl-8">
          <img src="assets/md/anatomy.png" className="img-fluid mb-5" alt="anatomy" />
        </div>
      </div>
    </div>

    <div className="box box-default">
      <Table className="table-striped">
        <TableHead>
          <TableRow>
            <TableCell>Scale Category</TableCell>
            <TableCell>Typeface</TableCell>
            <TableCell>Font</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Case</TableCell>
            <TableCell>Letter Spacing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Types.map((type, i) => {
            return (
              <TableRow key={i}>
                <TableCell component="th" scope="row" className="text-capitalize" dangerouslySetInnerHTML={{ __html: type.scaleCategory }}></TableCell>
                <TableCell>{type.typeface}</TableCell>
                <TableCell>{type.font}</TableCell>
                <TableCell>{type.size}</TableCell>
                <TableCell>{type.case}</TableCell>
                <TableCell>{type.letterSpacing}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </article>
)

export default Section;
