import React, { useState, useRef, useEffect } from 'react';
import { FileType } from '../types/FileType';
import open_folder from '../svg/open_folder.svg';
import close_folder from '../svg/close_folder.svg';
import file_svg from '../svg/file.svg';
import '../styles/FileExplorer.css';


interface FileExplorerProps {
   files: FileType;
}


const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
   const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});


   const handleToggle = (folderName: string) => {
       setExpandedFolders(prev => ({
           ...prev,
           [folderName]: !prev[folderName],
       }));
   };


   const handleRightClick = (e: React.MouseEvent, file: FileType) => {
       e.preventDefault();
   };



   const renderFileTree = (file: FileType) => {
       const { type, name, data } = file;
       if (type === 'folder') {
           return (
               <div key={name} className="folder">
                   <div
                       className="folder-name"
                       onClick={() => handleToggle(name)}
                   >
                       {expandedFolders[name] ? <img src={open_folder} alt='open_folder' /> : <img src={close_folder} alt='close_folder' />} {name}
                   </div>
                   {expandedFolders[name] && data?.map(renderFileTree)}
               </div>
           );
       } else {
           return (
               <div
                   key={name}
                   className="file"
                   onContextMenu={(e) => handleRightClick(e, file)}
               >
                   <img src={file_svg} alt='file_svg' /> {name}
               </div>
           );
       }
   };


   return (
       <div className="file-explorer">
           {renderFileTree(files)}
       </div>
   );
};


export default FileExplorer;
