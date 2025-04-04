import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { HTMLFile } from '../types';

interface FileViewerProps {
  file: HTMLFile;
  onBack: () => void;
}

export function FileViewer({ file, onBack }: FileViewerProps) {
  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(file.content);
      newWindow.document.close();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <button
            onClick={openInNewTab}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md 
                     hover:bg-blue-600 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Open in New Tab
          </button>
        </div>
      </div>
      <div className="flex-1 h-[calc(100vh-4rem)]">
        <iframe
          srcDoc={file.content}
          title={file.name}
          className="w-full h-full border-0"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}