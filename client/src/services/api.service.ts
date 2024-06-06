import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      // validateStatus: function (status) {
      //   return status >= 200 && status < 400;
      // }
    });
  }

  getAuthenticatedUser = async () => {
    try {
      const authenticatedUser = await this.isAuthenticated();
      console.log({ authenticatedUser });
      if (authenticatedUser) {
        localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
        // window.location.reload();
      } else {
        console.warn("User not authenticated or no data received");
      }
    } catch (error: any) {
      console.error("Error fetching authenticated user:", error);
    }
  }


  async isAuthenticated() {
    try {
      const user = await this.api.get("/user/auth/verify-token", {
        withCredentials: true,
      });
      return user.data;
    } catch (error) {
      throw error;
    }
  }


  async getResource<T>(endpoint: string) {
    try {
      const response = await this.api.get<T>(`/${endpoint}`);
      console.log(response.status, response)
      this.handleStatus(response);
      return response.data;
    } catch (error: any) {
      console.log(error, error.statusCode)
      this.handleError(error as AxiosError);
      return error
    }
  }

  async getResources<T>() {
    try {
      const response = await this.api.get<T[]>('/');
      this.handleStatus(response);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      return error
    }
  }

  async postResource<T>(endpoint: string, resource: T) {
    try {
      const response = await this.api.post<T>(`/${endpoint}`, resource);
      console.log(response)
      return response.data;
    } catch (error: any) {
      console.log(error)
      if (error.code === "ERR_NETWORK") {
        return { reload: true, error }
      }
      return error.response
    }
  }

  async updateResource<T>(endpoint: string, resource: T) {
    try {
      const response = await this.api.patch<T>(`/${endpoint}`, resource);
      this.handleStatus(response);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error as AxiosError);
      return error
    }
  }

  async deleteResource(id: number): Promise<void> {
    try {
      const response = await this.api.delete<void>(`/${id}`);
      this.handleStatus(response);
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  private handleStatus(response: AxiosResponse) {
    switch (response.status) {
      case 200:
        return;
      case 302:
        console.log('Redirecting to:', response.headers['location']);
        break;
      case 400:
        throw new Error('Bad Request');
      case 500:
        throw new Error('Internal Server Error');
      default:
        throw new Error(`Unexpected status code: ${response.status}`);
    }
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      console.error(`Request failed with status ${error.response.status}: ${error.message}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}
