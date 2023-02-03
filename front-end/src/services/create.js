
const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

export async function create(formData, path) {


    const jsonData = await fetch(`http://localhost:5001/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: formData
        }),
    })

    const data = await jsonData.json()
    return data
}




