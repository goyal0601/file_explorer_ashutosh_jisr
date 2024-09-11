import React from 'react';
import FileExplorer from './components/FileExplorer';
import { Files } from './data/fileData';


function App() {
 return (
   <div className="App">
     <h1>File Explorer Jisr</h1>
     <FileExplorer files={Files} />
   </div>
 );
}


export default App;
