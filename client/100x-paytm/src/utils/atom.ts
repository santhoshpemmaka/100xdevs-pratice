import { atom, selector } from 'recoil';


export const userLoginSelector = selector({
    key: "userLoginSelector",
    get: (props) => {
        let loginStatus = false;
        loginStatus = localStorage.getItem('token') ? true : false;
        return loginStatus
    }
})
