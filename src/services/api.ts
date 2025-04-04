const API_BASE_URL = 'http://localhost:3001/api';

export const uploadFile = async (file: File): Promise<{ filename: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

export const getFiles = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/files`);
  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }
  return response.json();
};

export const getFileContent = async (filename: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/files/${filename}`);
  if (!response.ok) {
    throw new Error('Failed to fetch file content');
  }
  const data = await response.json();
  return data.content;
}; 