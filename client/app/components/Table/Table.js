import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }
  // handleChangePage = (event, page) => {
  //   console.log("page number", page);
  // };

  render() {
    const {
      classes,
      tableHead,
      tableData,
      tableHeaderColor,
      page,
      size,
      totaldata,
      handleChangePage,
      handleChangeRowsPerPage
    } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
              <TableRow>
                {tableHead.map((prop, key) => (
                  <TableCell
                    className={`${classes.tableCell} ${classes.tableHeadCell}`}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => (
              <TableRow key={key}>
                {prop.map((prop, key) => (
                  <TableCell className={classes.tableCell} key={key}>
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                colSpan={3}
                count={totaldata}
                rowsPerPage={size}
                page={page - 1}
                // SelectProps={{
                //   native: true
                // }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  ),
  tableData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node]))
  )
};

export default withStyles(tableStyle)(CustomTable);
