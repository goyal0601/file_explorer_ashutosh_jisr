export type FileType = {
  type: 'file' | 'folder';
  name: string;
  meta?: string;
  data?: FileType[];
};