export async function postJSON(url, json) {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
        },
    });
    //TODO:better to have this check here instead in the match
    // resultCheck(res,url);
    try {
        return await res.json()
    } catch (e) {
        console.log(e)
    }
}