export function getNumberOfSaves(urlParameter) {
    const endpoint = `https://tourscanner.com/interview/save_image/${urlParameter}`
    const fetchData = () =>
        fetch(endpoint).then((response) => response.json()).catch(error => console.log(error))
    return fetchData()
}