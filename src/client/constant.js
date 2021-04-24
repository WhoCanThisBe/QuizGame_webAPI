export const NAV_PATH = {
  HOME: "/",
  MATCH: "/matches",
};


const REST_API_ENDPOINT = {
  HOST: "http://localhost",
  PORT: "3000",
  BASE: "/api",
}

const ENDPOINT_TEMPLATE = {
  BASE: `${REST_API_ENDPOINT.HOST}:${REST_API_ENDPOINT.PORT}${REST_API_ENDPOINT.BASE}`,
};

export const MATCH_ENDPOINT = {
  MATCH: `${ENDPOINT_TEMPLATE.BASE}/matches`
}