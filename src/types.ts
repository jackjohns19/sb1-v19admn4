export interface HTMLFile {
  id: string;
  name: string;
  content: string;
  lastModified: number;
  preview?: string;
}

export interface Settings {
  filesystemPath: string;
}