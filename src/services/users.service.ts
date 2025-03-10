
import api from './api';
import { User } from './auth.service';

export interface CreateUserDto {
  email: string;
  name: string;
  role: string;
}

export const usersService = {
  async getAll() {
    return api.get<User[]>('/users').then(response => response.data);
  },

  async getById(id: number) {
    return api.get<User>(`/users/${id}`).then(response => response.data);
  },

  async create(user: CreateUserDto) {
    return api.post<User>('/users', user).then(response => response.data);
  },

  async update(id: number, data: Partial<CreateUserDto>) {
    return api.patch<User>(`/users/${id}`, data).then(response => response.data);
  },

  async delete(id: number) {
    return api.delete(`/users/${id}`);
  }
};
