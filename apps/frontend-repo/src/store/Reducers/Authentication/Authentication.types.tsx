export interface UserData {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string | null;
}

export interface AuthState {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  displayName: string | null;
}

export interface Actions {
  type: string,
  payload: {[key: string]: unknown}
}