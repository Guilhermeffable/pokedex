import React from 'react';

const SvgrMock = React.forwardRef((props, ref) => <svg ref={ref} data-testid='svg' {...props} />);

export const ReactComponent = SvgrMock;
export default SvgrMock;
