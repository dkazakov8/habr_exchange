export function makeRequest(requestUrl) {
  const headers = new Headers();
  headers.append('pragma', 'no-cache');
  headers.append('cache-control', 'no-cache');

  return fetch(requestUrl, {
    method: 'GET',
    headers,
  }).then(response => response.clone().json());
}
