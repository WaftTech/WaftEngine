import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let id = 0;
function createData(name, xs, sm, md, lg, xl) {
  id += 1;
  return { id, name, xs, sm, md, lg, xl };
}

const data = [
  createData('Grid behavior', 'Horizontal at all times', 'Collapsed to start, horizontal above breakpoints' ),
  createData('Max container width', 'None (auto)', '540px', '720px', '960px', '1140px' ),
  createData('Class prefix', '.col-', '.col-sm-', '.col-md-', '.col-lg-', '.col-xl-' ),
  createData('# of columns', '12', '12', '12', '12', '12',),
  createData('Gutter width', '30px (15px on each side of a column)'),
  createData('Nestable', 'Yes' ),
  createData('Offsets', 'Yes' ),
  createData('Column ordering', 'Yes' ),
];

function SimpleTable() {

  return (
    <Paper className="table-responsive">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Extra Small</TableCell>
            <TableCell>Small</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>Large</TableCell>
            <TableCell>Extra Large</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            if (n.id === 3) {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell><code>{n.xs}</code></TableCell>
                  <TableCell><code>{n.sm}</code></TableCell>
                  <TableCell><code>{n.md}</code></TableCell>
                  <TableCell><code>{n.lg}</code></TableCell>
                  <TableCell><code>{n.xl}</code></TableCell>
                </TableRow>
              )
            }
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell>{n.xs}</TableCell>
                <TableCell>{n.sm}</TableCell>
                <TableCell>{n.md}</TableCell>
                <TableCell>{n.lg}</TableCell>
                <TableCell>{n.xl}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}



const Article = () => {
  return(
    <article className="article">
      <h2 className="article-title mb-3">Bootstrap Grid System</h2>
      <p className="mb-5">Bootstrap's <em>powerful</em> mobile-first flexbox grid system</p>
      <SimpleTable />
    </article>
  )
}

export default Article;