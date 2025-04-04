import React from 'react';
import { File, Trash2 } from 'lucide-react';
import { HTMLFile } from '../types';
import { deleteFile } from '../services/api';

interface FileGridProps {
  files: HTMLFile[];
  onFileSelect: (file: HTMLFile) => void;
  onFileDelete: (filename: string) => void;
}

export function FileGrid({ files, onFileSelect, onFileDelete }: FileGridProps) {
  const handleDelete = async (e: React.MouseEvent, filename: string) => {
    e.stopPropagation(); // Prevent triggering the file selection
    try {
      await deleteFile(filename);
      onFileDelete(filename);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => onFileSelect(file)}
          className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
                   transform transition-transform duration-200 hover:scale-105 relative"
        >
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            {file.preview ? (
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <File className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(file.lastModified).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={(e) => handleDelete(e, file.name)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 
                     group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            title="Delete file"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}