import { atom } from 'recoil';

type MyAtomType = {
    token: string | null,
    username : string |null
}

export const authState = atom<MyAtomType>({
  key: 'authState',
  default: { token: null, username: null },
});