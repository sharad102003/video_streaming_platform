// src/Components/Inbox.jsx
import React from 'react';
import SuprSendInbox from '@suprsend/react-inbox';
import 'react-toastify/dist/ReactToastify.css'; // needed for toast notifications

const Inbox = () => {
  return (
    <SuprSendInbox
      workspaceKey={process.env.REACT_APP_SUPRSEND_WORKSPACE_KEY}
      subscriberId={process.env.REACT_APP_SUPRSEND_SUBSCRIBER_ID}
      distinctId="1234"
    />
  );
};

export default Inbox;
