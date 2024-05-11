import HttpClient from "../http/HttpClient";

export default class UserGatewayHttp {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.httpClient.get(`/users/${id}`);
    return response.data;
  }

  async createUser(user: User): Promise<User> {
    const response = await this.httpClient.post(`/users`, user);
    return response.data;
  }

  async updateUser(user: User): Promise<User> {
    const response = await this.httpClient.put(`/users/${user.id}`, user);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.httpClient.delete(`/users/${id}`);
  }
}
