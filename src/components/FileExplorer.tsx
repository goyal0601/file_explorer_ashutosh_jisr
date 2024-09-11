import React, { useState, useRef, useEffect } from 'react';
import { FileType } from '../types/FileType';
import Popover from './Popover';
import open_folder from '../svg/open_folder.svg';
import close_folder from '../svg/close_folder.svg';
import file_svg from '../svg/file.svg';
import '../styles/FileExplorer.css';


function getFilePath(root: FileType, targetFileName: string): string | null {
   let result: string | null = null;


   function traverse(fileMeta: FileType, currentPath: string) {
       if (fileMeta.type === 'file') {
           if (fileMeta.name === targetFileName) {
               result = currentPath + fileMeta.name;
           }
       } else if (fileMeta.type === 'folder' && fileMeta.data) {
           fileMeta.data.forEach(child => {
               if (!result) { // Continue searching only if the file hasn't been found
                   traverse(child, currentPath + fileMeta.name + '/');
               }
           });
       }
   }


   traverse(root, '');
   return result;
}

interface FileExplorerProps {
   files: FileType;
}


const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
   const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
   const [popover, setPopover] = useState<{ x: number; y: number; file: FileType | null } | null>(null);
   const popoverRef = useRef<HTMLDivElement>(null);


   const handleToggle = (folderName: string) => {
       setExpandedFolders(prev => ({
           ...prev,
           [folderName]: !prev[folderName],
       }));
   };


   const handleRightClick = (e: React.MouseEvent, file: FileType) => {
       e.preventDefault();
       setPopover({
           x: e.clientX,
           y: e.clientY,
           file,
       });
   };


   const handleAction = (action: string) => {
       if (popover?.file) {
           const filePath = getFilePath(files, popover.file.name);
           console.log(`Action: ${action}, File Path: ${filePath}`);
       }
       setPopover(null);
   };


   const handleClickOutside = (e: MouseEvent) => {
       if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
           setPopover(null);
       }
   };


   useEffect(() => {
       if (popover) {
           document.addEventListener('mousedown', handleClickOutside);
       } else {
           document.removeEventListener('mousedown', handleClickOutside);
       }


       return () => {
           document.removeEventListener('mousedown', handleClickOutside);
       };
   }, [popover]);


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
           {popover && (
               <div ref={popoverRef}>
                   <Popover
                       x={popover.x}
                       y={popover.y}
                       onCopy={() => handleAction('copy')}
                       onDelete={() => handleAction('delete')}
                       onRename={() => handleAction('rename')}
                   />
               </div>
           )}
       </div>
   );
};


export default FileExplorer;
