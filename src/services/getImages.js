export const getImages = () => {
    const res = fetch('https://tourscanner.com/interview/images').then(res => res.json()).catch(error => console.log(error))
    return res
}