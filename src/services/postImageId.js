export function postImageId(urlParameter) {
    const endpoint = `https://tourscanner.com/interview/save_image/${urlParameter}`
    const fetchData = () =>
        fetch(endpoint, { method: "POST", body: { image_id: urlParameter } }).then((response) => { if (response.ok) { return response.json() } throw response }).then(data => { return data })
    fetchData()
}