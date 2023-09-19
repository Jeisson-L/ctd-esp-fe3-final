export const fetchCheckoutApi = async (comicId: Number) => {
    const url = `/api/comics/${comicId}`
    const response = await fetch(url);
    return await response.json();
}