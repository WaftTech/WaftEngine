import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialIcon from 'components/MaterialIcon';
import Chip from '@material-ui/core/Chip';

function SimpleTable(props) {
  return (
    <div className="box box-default table-responsive">
      <Table className="table-hover">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell component="th" scope="row">1</TableCell>
            <TableCell><MaterialIcon icon="trending_up" className="text-success mr-1" />TWLT</TableCell>
            <TableCell><Chip label="Pending" className="table-chip bg-info" /></TableCell>
            <TableCell>Amery Lee</TableCell>
            <TableCell><span className="text-primary">55%</span></TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell component="th" scope="row">2</TableCell>
            <TableCell><MaterialIcon icon="trending_up" className="text-primary mr-1" />A16Z</TableCell>
            <TableCell><Chip label="Due" className="table-chip bg-primary" /></TableCell>
            <TableCell>Romayne Carlyn</TableCell>
            <TableCell><span className="text-success">34%</span></TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell component="th" scope="row">3</TableCell>
            <TableCell><MaterialIcon icon="trending_down" className="text-warning mr-1" />DARK</TableCell>
            <TableCell><Chip label="Due" className="table-chip bg-success" /></TableCell>
            <TableCell>Marybeth Joanna</TableCell>
            <TableCell><span className="text-info">68%</span></TableCell>
          </TableRow>
          <TableRow key={4}>
            <TableCell component="th" scope="row">4</TableCell>
            <TableCell><MaterialIcon icon="trending_flat" className="text-info mr-1" />Q300</TableCell>
            <TableCell><Chip label="Blocked" className="table-chip bg-danger" /></TableCell>
            <TableCell>Jonah Benny</TableCell>
            <TableCell><span className="text-warning">52%</span></TableCell>
          </TableRow>
          <TableRow key={5}>
            <TableCell component="th" scope="row">5</TableCell>
            <TableCell><MaterialIcon icon="trending_down" className="text-danger mr-1" />RVNG</TableCell>
            <TableCell><Chip label="Suspended" className="table-chip bg-warning" /></TableCell>
            <TableCell>Daly Royle</TableCell>
            <TableCell><span className="text-danger">77%</span></TableCell>
          </TableRow>
          <TableRow key={6}>
            <TableCell component="th" scope="row">6</TableCell>
            <TableCell><MaterialIcon icon="trending_down" className="text-info mr-1" />FDSA</TableCell>
            <TableCell><Chip label="Suspended" className="table-chip bg-info" /></TableCell>
            <TableCell>Jane Swift</TableCell>
            <TableCell><span className="text-success">55%</span></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default SimpleTable;
