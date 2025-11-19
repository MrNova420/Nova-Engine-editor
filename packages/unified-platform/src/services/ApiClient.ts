/**
 * Nova Engine Unified Platform - API Client
 * Centralized API client that connects frontend to backend services
 */

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';
const HUB_API_URL = process.env.VITE_HUB_API_URL || 'http://localhost:3001';

class ApiClient {
  private baseUrl: string;
  private hubUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.hubUrl = HUB_API_URL;
  }

  /**
   * Get auth token from localStorage
   */
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Get default headers including auth
   */
  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Make API request with error handling
   */
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: response.statusText,
        }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', url, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
  }

  /**
   * GET request to Hub API
   */
  async hubGet<T>(endpoint: string): Promise<T> {
    return this.request<T>(`${this.hubUrl}${endpoint}`, {
      method: 'GET',
    });
  }

  /**
   * POST request to Hub API
   */
  async hubPost<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.hubUrl}${endpoint}`, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // ============ AUTHENTICATION ============

  async login(email: string, password: string) {
    return this.post('/api/auth/login', { email, password });
  }

  async register(username: string, email: string, password: string) {
    return this.post('/api/auth/register', { username, email, password });
  }

  async getMe() {
    return this.get('/api/auth/me');
  }

  // ============ GAMES ============

  async getGames(params?: {
    category?: string;
    search?: string;
    sort?: string;
    limit?: number;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.get(`/api/games${query ? `?${query}` : ''}`);
  }

  async getGame(gameId: string) {
    return this.get(`/api/games/${gameId}`);
  }

  async createGame(gameData: any) {
    return this.post('/api/games', gameData);
  }

  async updateGame(gameId: string, gameData: any) {
    return this.put(`/api/games/${gameId}`, gameData);
  }

  async deleteGame(gameId: string) {
    return this.delete(`/api/games/${gameId}`);
  }

  async getGameStats(gameId: string) {
    return this.get(`/api/games/${gameId}/stats`);
  }

  // ============ USER / SOCIAL ============

  async getUserProfile(userId: string) {
    return this.get(`/api/users/${userId}`);
  }

  async getUserStats() {
    return this.get('/api/users/me/stats');
  }

  async getFriends() {
    return this.get('/api/social/friends');
  }

  async addFriend(friendId: string) {
    return this.post(`/api/social/friends/${friendId}`);
  }

  async removeFriend(friendId: string) {
    return this.delete(`/api/social/friends/${friendId}`);
  }

  async getAchievements() {
    return this.get('/api/social/achievements');
  }

  // ============ MULTIPLAYER ============

  async getLobbies(gameId?: string) {
    return this.get(
      `/api/multiplayer/lobbies${gameId ? `?gameId=${gameId}` : ''}`
    );
  }

  async createLobby(lobbyData: any) {
    return this.post('/api/multiplayer/lobbies', lobbyData);
  }

  async joinLobby(lobbyId: string) {
    return this.post(`/api/multiplayer/lobbies/${lobbyId}/join`);
  }

  async leaveLobby(lobbyId: string) {
    return this.post(`/api/multiplayer/lobbies/${lobbyId}/leave`);
  }

  async quickMatch(gameId: string, options?: any) {
    return this.post('/api/multiplayer/quick-match', { gameId, ...options });
  }

  // ============ PROJECTS (EDITOR) ============

  async getProjects() {
    return this.hubGet('/api/projects');
  }

  async getProject(projectId: string) {
    return this.hubGet(`/api/projects/${projectId}`);
  }

  async createProject(projectData: any) {
    return this.hubPost('/api/projects', projectData);
  }

  async updateProject(projectId: string, projectData: any) {
    return this.hubPost(`/api/projects/${projectId}`, projectData);
  }

  async deleteProject(projectId: string) {
    return this.request(`${this.hubUrl}/api/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  async saveProject(projectId: string, sceneData: any) {
    return this.hubPost(`/api/projects/${projectId}/save`, sceneData);
  }

  // ============ ASSETS ============

  async getAssets(projectId: string) {
    return this.hubGet(`/api/assets?projectId=${projectId}`);
  }

  async uploadAsset(projectId: string, file: File, metadata?: any) {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await fetch(
      `${this.hubUrl}/api/assets/upload?projectId=${projectId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Asset upload failed');
    }

    return response.json();
  }

  // ============ BUILDS ============

  async buildProject(projectId: string, buildConfig: any) {
    return this.hubPost(`/api/builds`, { projectId, ...buildConfig });
  }

  async getBuildStatus(buildId: string) {
    return this.hubGet(`/api/builds/${buildId}/status`);
  }

  // ============ NOTIFICATIONS ============

  async getNotifications() {
    return this.get('/api/notifications');
  }

  async markNotificationRead(notificationId: string) {
    return this.put(`/api/notifications/${notificationId}/read`, {});
  }

  async clearNotifications() {
    return this.delete('/api/notifications');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
