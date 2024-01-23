export const request = async (url: RequestInfo | URL, requestOptions: RequestInit | undefined ) => {
    return await fetch(url, requestOptions)
}