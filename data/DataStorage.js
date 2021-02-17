import React, { createContext, useState } from "react";

export const DataStorage = createContext();
export const serverRequests = {
    mainUrl: "http://10.0.0.8:3000",
    post: "/posts",
    get: "/posts"
}
export const MyProvider = (props) => {
    const [favoriteList, setFavoriteList] = useState([]);
    const [orders, setOrders] = useState([]);
    return (
        <DataStorage.Provider value={[favoriteList, setFavoriteList, orders, setOrders]}>
            {props.children}
        </DataStorage.Provider>
    );
};
