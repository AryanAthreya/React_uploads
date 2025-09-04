// creating a custom hook
import { useState, useEffect } from "react";

// function to fetch currency information using api call
function useCurrencyInfo(currency){
    // using useeffect hook to automatically fetch currency info , this hook work by 
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        // convert the fetched api response into json format from string:
        .then((res) => res.json())
        .then((res) => setData(res[currency]));
    }, [currency]);

    // testing:
    // console.log(data);
    return data;
}

export default useCurrencyInfo;