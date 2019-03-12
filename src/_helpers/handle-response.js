export function handleResponse(response) {
    if(response.status===500)
    {
        return Promise.reject('Problems with server you have '+response.status+" status:(")
    } else if(response.status===404){
        return Promise.reject('You have '+response.status+" status:(")
    }else {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                let error = response.status;

                return Promise.reject(error);
            }

            return data;
        });
    }
}