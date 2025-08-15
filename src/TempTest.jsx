import React, { useEffect } from 'react';
import './testRefresh'; // Import to run automatically

export default function TempTest() {
  useEffect(() => {
    import('./testRefresh');
  }, []);

  return <div>Testing Refresh...</div>;
}
