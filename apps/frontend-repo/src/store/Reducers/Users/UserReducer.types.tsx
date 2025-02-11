import { User } from '../../../../../../packages/shared/src/user';

export type Data = User | null
export interface StateUserType {
  data: Data,
  loading: boolean,
  error: string | null
}