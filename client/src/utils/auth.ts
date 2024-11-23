import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
    // TODO: return the decoded token
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
    // TODO: return a value that indicates if the user is logged in
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
    // TODO: return a value that indicates if the token is expired
  }

  getToken(): string {
    const token = localStorage.getItem("id_token") || "";
    return token
    // TODO: return the token
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken)
    window.location.assign("/")
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/")    
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
  }
}

export default new AuthService();
