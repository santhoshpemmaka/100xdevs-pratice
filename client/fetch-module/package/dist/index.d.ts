declare const useFetch: (url: string) => {
    data: never[];
    isloading: boolean;
    iserror: undefined;
};
export default useFetch;
