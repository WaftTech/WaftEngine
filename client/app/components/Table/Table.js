import PropTypes from 'prop-types';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './table.css';
import Loader from '../../assets/img/loading_transparent.gif';

/* eslint-disable react/no-array-index-key */
function CustomTable({ ...props }) {
  const {
    classes,
    loading,
    tableHead,
    tableData,
    tableHeaderColor,
    pagination,
    handlePagination,
    emptyDataMsg,
  } = props;
  return (
    <div className="bg-white mt-4 border-t">
      <table className="w-full text-left table table-auto">
        {tableHead !== undefined ? (
          <thead>
            <tr>
              {tableHead.map((prop, key) => (
                <th
                  className="py-2 px-2 font-bold text-sm text-gray-800 border-b border-gray-300"
                  key={key}
                >
                  {prop}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
         {tableData.length > 0 ? (
        <tbody>
          {tableData.map((prop, key) => (
            <tr key={key}>
              {prop.map((each, index) => (
                <td
                  className="px-2 py-1 text-sm border-gray-200 text-gray-700"
                  key={index}
                >
                  {each}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
         ) : (
          loading && (
            <tbody>
              <tr>
                <td colSpan={tableHead.length} className="py-2 text-center">
                  <img
                    src={Loader}
                    alt="loading"
                    className="inline-block w-8 h-8"
                  />
                </td>
              </tr>
            </tbody>
          )
          )}
      </table>

      {tableData.length < 1 && loading === false && (
        <p
          className="px-2 py-1 text-sm border-gray-200 text-gray-700"
        >
          {emptyDataMsg || 'No Data Found'}
        </p>
      )}

      {pagination && handlePagination && (
        <>
          <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
            <span className="text-sm">Total Data: {pagination.totaldata}</span>
            <div className="inline-flex items-center justify-end ">
              <span className="text-sm">Rows Per page</span> <select className="text-sm inputbox w-20 mr-20 ml-4" value={pagination.size || 10} onChange={(e) => {
                handlePagination({ ...pagination, size: e.target.value })
              }}>{[10, 25, 50, 100].map(each => <option value={each}>{each}</option>)}</select>
              <span className="mr-20 text-sm">Page {pagination.page} of {Math.ceil(pagination.totaldata / pagination.size)}</span>
              <span onClick={() => {
                if (1 === pagination.page) {
                  return;
                }
                handlePagination({ ...pagination, page: pagination.page - 1 });
              }} className={`${1 === pagination.page ? 'opacity-50 pointer-events-none' : ''} w-12 h-12 rounded hover:bg-gray-200 inline-block cursor-pointer inline-flex items-center justify-center`}>
                <FaChevronLeft />
              </span>
              <span onClick={() => {
                if (Math.ceil(pagination.totaldata / pagination.size) === pagination.page) {
                  return;
                }
                handlePagination({ ...pagination, page: pagination.page + 1 });
              }} className={`${Math.ceil(pagination.totaldata / pagination.size) === pagination.page ? 'opacity-50 pointer-events-none' : ''} w-12 h-12 rounded hover:bg-gray-200 inline-block cursor-pointer inline-flex items-center justify-center`}>
                <FaChevronRight /></span>

            </div>
          </div>
        </>
      )}
    </div >
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  handlePagination: () =>
    console.log('todo: make handlePagination function!!!'),
};

CustomTable.propTypes = {
  classes: PropTypes.object,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  ),
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  handlePagination: PropTypes.func,
};

export default CustomTable;
