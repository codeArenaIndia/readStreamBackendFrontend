import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { createWriteStream } from 'streamsaver';

function App() {
const url = "http://localhost:2000";
const fileName = "emptions.txt"

  const downloadFile = (url, fileName) => {
    return fetch(url).then(res => {
      const fileStream = createWriteStream(fileName);
      const writer = fileStream.getWriter();
      if (res.body.pipeTo) {
        writer.releaseLock();
        return res.body.pipeTo(fileStream);
      }
  
      const reader = res.body.getReader();
      const pump = () =>
        reader
          .read()
          .then(({ value, done }) => (done ? writer.close() : writer.write(value).then(pump)));
  
      return pump();
    });
  };
  downloadFile(url, fileName).then(() => { alert('done'); });
  return (
    <div className="App">
      <header className="App-header">
     
        <h1>Hello</h1>
      </header>
    </div>
  );
}

export default App;
