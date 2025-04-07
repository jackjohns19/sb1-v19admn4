import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { FileGrid } from './components/FileGrid';
import { Settings } from './components/Settings';
import { FileViewer } from './components/FileViewer';
import { HTMLFile, Settings as SettingsType } from './types';
import { uploadFile, getFiles, getFileContent } from './services/api';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [files, setFiles] = useState<HTMLFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<HTMLFile | null>(null);
  const [settings, setSettings] = useState<SettingsType>({
    filesystemPath: '/uploads'
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const fileNames = await getFiles();
      const filePromises = fileNames.map(async (filename) => {
        const content = await getFileContent(filename);
        return {
          id: uuidv4(), //crypto.randomUUID(),
          name: filename,
          content,
          lastModified: Date.now(),
          preview: `http://192.168.0.180:3001/api/files/${filename}`
        };
      });
      const loadedFiles = await Promise.all(filePromises);
      setFiles(loadedFiles);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const handleFileUpload = async (uploadedFiles: File[]) => {
    try {
      for (const file of uploadedFiles) {
        await uploadFile(file);
      }
      await loadFiles();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleFileDelete = (filename: string) => {
    setFiles(files => files.filter(file => file.name !== filename));
  };

  if (selectedFile) {
    return <FileViewer file={selectedFile} onBack={() => setSelectedFile(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HTML File Manager</h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full
                     hover:bg-gray-100 transition-colors duration-200"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-8">
          <FileUpload onUpload={handleFileUpload} />
        </div>

        <FileGrid 
          files={files} 
          onFileSelect={setSelectedFile} 
          onFileDelete={handleFileDelete}
        />

        <Settings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSave={setSettings}
        />
      </div>
    </div>
  );
}

export default App;