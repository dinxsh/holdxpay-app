import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://app.holdxpay.com/api';

interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
  user?: {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

export interface UserProfile {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface Connection {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
}

interface ConnectionsResponse {
  status: number;
  success: boolean;
  error: string | null;
  connections: Connection[];
  pagination?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

class ApiService {
  private static async getHeaders() {
    const token = await AsyncStorage.getItem('userToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Login failed. Please check your internet connection.');
    }
  }

  static async register(userData: {
    email: string;
    password: string;
    username: string;
    name: string;
  }): Promise<AuthResponse> {
    try {
      const [firstName, ...lastNameParts] = userData.name.trim().split(' ');
      const lastName = lastNameParts.join(' ');

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          username: userData.username,
          firstName,
          lastName,
        }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Registration failed. Please check your internet connection.');
    }
  }

  static async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        headers: await this.getHeaders(),
      });
      const data = await response.json();
      return data.user;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }

  static async updateUserProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await fetch(`${BASE_URL}/user/update`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data.user;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  }

  static async getConnections(page: number = 1, perPage: number = 10): Promise<ConnectionsResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/connection?page=${page}&perPage=${perPage}`,
        {
          headers: await this.getHeaders(),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch connections');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw new Error('Failed to fetch connections. Please check your internet connection.');
    }
  }

  static async requestPasswordReset(email: string): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}/user/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to request password reset');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  }

  static async resetPassword(token: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}/user/password/reset/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
}

export default ApiService;
