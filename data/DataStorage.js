import React, { createContext, useState } from "react";

export const DataStorage = createContext();
export const serverRequests = {
    mainUrl: "http://localhost:3000",
    post: "/posts",
    get: "/posts"
}
export const MyProvider = (props) => {
    const [favoriteList, setFavoriteList] = useState([]);
    const [products, setProducts] = useState([{
        flag: 0
    }]);
    return (
        <DataStorage.Provider value={[favoriteList, setFavoriteList, products, setProducts]}>
            {props.children}
        </DataStorage.Provider>
    );
};
