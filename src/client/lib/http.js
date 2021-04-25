export async function postJSON(url, json) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log({ response });

  const hasAttachedHeaders = Object.keys(response.headers).length > 0;

  if (hasAttachedHeaders) {
    console.log("Headers on response: ", response.headers);
  }

  resultCheck(response, url);
  return hasAttachedHeaders ? await response.json() : response.status;
}

export async function fetchJson(url) {
  const response = await fetch(url);
  resultCheck(response, url);
  return await response.json();
}

const resultCheck = (res, url) => {
  if (!res.ok) {
    throw new HttpExceptionCode(res, url);
  }
};

//TODO: are we using this function
export class HttpExceptionCode extends Error {
  constructor(res, url) {
    super(`Loading error for ${url}: ${res.status} ${res.statusText}`);
    // By setting the name-property on the error, we get the name of our own Error-class (HttpExceptionCode) -
    // in the thrown error, instead of "Error: "...
    this.name = HttpExceptionCode.name;
    this.status = res.status;
  }
}
