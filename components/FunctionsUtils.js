import axios from 'axios'

export const axiosRequest = async (url = "", method, data) => {
    try {
        let res = await axios({
            url: url,
            method: method,
            data:data,
            headers: {
                "content-type": "application/json",
                // "Access-Control-Allow-Origin": "*",
            },
        });
        let dataFromServer = res;
        if (dataFromServer) {
            return dataFromServer;
        } else {
            return null;
        }
    } catch (e) {
        console.log(`😱 Axios failed functionUtils 21: ${e}`);
        return "";
    }
}

export const updateOrder = async(url, data)=>{
    try {
        let res = await axios({
            url: url,
            method: "patch",
            data:data,
            headers: {
                "content-type": "application/json",
                // "Access-Control-Allow-Origin": "*",
            },
        });
        let dataFromServer = res;
        if (dataFromServer) {
            return dataFromServer;
        } else {
            return null;
        }
    } catch (e) {
        console.log(`😱 Axios failed update order: ${e}`);
        return "";
    }

}
