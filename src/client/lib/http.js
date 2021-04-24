export async function postJSON(url, json) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });
  resultCheck(response, url);
  try {
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function fetchJson(url) {
  const res = await fetch(url);
  resultCheck(res, url);
  return await res.json();
}

const resultCheck = (res, url) => {
  if (!res.ok) {
    throw new HttpExceptionCode(res, url);
  }
};

//TODO: are we using this function
export class HttpExceptionCode extends Error {
  constructor(res, url) {
    super(`loading error for ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}
