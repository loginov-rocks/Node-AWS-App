import { AxiosStatic } from 'axios';

interface AuthData {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  tokenType: string;
}

export default class Auth {
  private readonly axios: AxiosStatic;
  private readonly storage: Storage;
  private readonly storageKey: string;

  private authData: AuthData | null;

  constructor(axios: AxiosStatic, storage: Storage, storageKey: string) {
    this.axios = axios;
    this.storage = storage;
    this.storageKey = storageKey;

    this.authData = this.restore();
  }

  private store(authData: AuthData) {
    this.storage.setItem(this.storageKey, JSON.stringify(authData));
  }

  private restore() {
    const authDataString = this.storage.getItem(this.storageKey);

    if (!authDataString) {
      return null;
    }

    return JSON.parse(authDataString);
  }

  public parseQueryString(queryString: string) {
    const urlParams = new URLSearchParams(queryString);

    const accessToken = urlParams.get('access_token');
    const expiresIn = Number(urlParams.get('expires_in'));
    const idToken = urlParams.get('id_token');
    const tokenType = urlParams.get('token_type');

    if (!accessToken || !expiresIn || !idToken || !tokenType) {
      return false;
    }

    this.authData = { accessToken, expiresIn, idToken, tokenType };
    this.store(this.authData);

    return true;
  }

  public useAuth() {
    this.axios.interceptors.request.use(request => {
      if (this.authData) {
        request.headers.authorization = `${this.authData.tokenType} ${this.authData.idToken}`;
      }

      return request;
    });
  }
}
