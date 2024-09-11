import React from 'react';
import '../styles/Popover.css';


interface PopoverProps {
   x: number;
   y: number;
   onCopy: () => void;
   onDelete: () => void;
   onRename: () => void;
}


const Popover: React.FC<PopoverProps> = ({ x, y, onCopy, onDelete, onRename }) => {
   return (
       <div className="popover" style={{ top: y, left: x }}>
           <div className="popover-item" onClick={onCopy}>
               Copy
           </div>
           <div className="popover-item" onClick={onDelete}>
               Delete
           </div>
           <div className="popover-item" onClick={onRename}>
               Rename
           </div>
       </div>
   );
};


export default Popover;
