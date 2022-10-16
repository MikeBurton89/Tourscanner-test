export function getNumberOfSaves(urlParameter) {
    const endpoint = `https://tourscanner.com/interview/save_image/${urlParameter}`
    const fetchData = () =>
        fetch(endpoint).then((response) => response.json())
    return fetchData()
}