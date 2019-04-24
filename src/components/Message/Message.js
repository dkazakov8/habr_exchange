import React from 'react';

import { observer } from 'utils';
import { useLocalization } from 'hooks';

function Message(props) {
  const { filename, messages, text, values } = props;

  const getLn = useLocalization(filename, messages);

  return getLn(text, values);
}

const ConnectedMessage = observer(Message);

export function init(filename, messages) {
  return function MessageHoc(props) {
    const fullProps = { filename, messages, ...props };

    return <ConnectedMessage {...fullProps} />;
  };
}
