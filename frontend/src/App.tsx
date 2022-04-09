import React, {useEffect, useState} from 'react';
import {execTest} from "./lib/api/test";

function App() {
    const [message, setMessage] = useState<string>('')

    const handleExecTest = async () => {
        const res = await execTest()

        if (res.status === 200) {
            setMessage(res.data.message)
        }
    }

    useEffect(() => {handleExecTest()}, [])

  return (
      <h2>{message}</h2>
  );
}

export default App;
