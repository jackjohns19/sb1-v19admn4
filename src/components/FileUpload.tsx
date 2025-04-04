import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const htmlFiles = acceptedFiles.filter(file => file.name.endsWith('.html'));
    if (htmlFiles.length > 0) {
      onUpload(htmlFiles);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.html']
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  });

  return (
    <div
      {...getRootProps()}
      className={`
        w-full p-8 border-2 border-dashed rounded-lg
        transition-colors duration-200 ease-in-out
        flex flex-col items-center justify-center gap-4
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-gray-400" />
      <p className="text-lg text-gray-600">Drag & drop HTML files here, or click to select files</p>
      <p className="text-sm text-gray-500">Only .html files are accepted</p>
    </div>
  );
}