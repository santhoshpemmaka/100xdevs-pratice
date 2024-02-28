"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useFetch = (url) => {
    const [data, setData] = (0, react_1.useState)([]);
    const [isloading, setLoading] = (0, react_1.useState)(false);
    const [iserror, setError] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setLoading(true);
                const respose = yield fetch(url);
                const result = yield respose.json();
                //@ts-ignore
                if (respose.status(200)) {
                    setData(result);
                    setLoading(false);
                }
            }
            catch (err) {
                //@ts-ignore
                setError(err);
            }
        });
        fetchData(url);
    }, [url]);
    return { data, isloading, iserror };
};
exports.default = useFetch;
