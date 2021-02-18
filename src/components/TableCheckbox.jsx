/* eslint-disable react/prop-types */
import React from 'react';

const TableCheckbox = React.forwardRef((
  {
    indeterminate,
    ...rest
  },
  ref,
) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div className="ui fitted checkbox">
      <input
        id="checkbox-1"
        name="checkbox-1"
        type="checkbox"
        ref={resolvedRef}
        {...rest}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label />
    </div>
  );
});

export default TableCheckbox;
