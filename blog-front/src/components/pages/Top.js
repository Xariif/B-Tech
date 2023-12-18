import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';
import { useNotification } from '../hooks/useNotification';

export default function Top() {
  const notification = useNotification();

  return (
    <>
      <Button
        onClick={() => {
				  notification.showToast('Success', 'success');
        }}
      >
        succes
      </Button>
      <Button
        onClick={() => {
				  notification.showToast('info', 'info');
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
				  notification.setLoader(true);
        }}
      >
        warning
      </Button>
    </>
  );
}
