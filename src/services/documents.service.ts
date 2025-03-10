
import api from './api';

export interface Document {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface CreateDocumentDto {
  title: string;
  description: string;
  file: File;
}

export const documentsService = {
  async getAll() {
    return api.get<Document[]>('/documents').then(response => response.data);
  },

  async getById(id: number) {
    return api.get<Document>(`/documents/${id}`).then(response => response.data);
  },

  async create(document: CreateDocumentDto) {
    const formData = new FormData();
    formData.append('title', document.title);
    formData.append('description', document.description);
    formData.append('file', document.file);

    return api.post<Document>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data);
  },

  async update(id: number, data: Partial<CreateDocumentDto>) {
    return api.patch<Document>(`/documents/${id}`, data).then(response => response.data);
  },

  async delete(id: number) {
    return api.delete(`/documents/${id}`);
  }
};
