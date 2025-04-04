import React from 'react';
import { File } from 'lucide-react';
import { HTMLFile } from '../types';

interface FileGridProps {
  files: HTMLFile[];
  onFileSelect: (file: HTMLFile) => void;
}

export function FileGrid({ files, onFileSelect }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => onFileSelect(file)}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
                   transform transition-transform duration-200 hover:scale-105"
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
        </div>
      ))}
    </div>
  );
}