import React from 'react';
import Dialog from '../Dialog/index';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   <Slide direction="up" ref={ref} {...props} />;
// });

export default function DeleteDialog(props) {
  const handleClose = () => {
    props.doClose();
  };

  const handleDialogDelete = () => {
    props.doDelete();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        title="Are you sure to delete?"
        actions={
          <>
            <button
              type="button"
              className="bg-gray-100 border flex-1 rounded px-3 py-2 text-sm leading-none font-bold hover:bg-gray-300"
              onClick={handleClose}
            >
              Don't Delete
            </button>
            <button
              type="button"
              className="bg-red-100 text-red-600 flex-1 px-3 py-2 text-sm font-bold leading-none border border-red-300 hover:bg-red-600 rounded"
              onClick={handleDialogDelete}
            >
              Delete
            </button>
          </>
        }
      />
    </div>
  );
}
