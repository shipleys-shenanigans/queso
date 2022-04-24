const urlGenerator = (path, params) => {
  const port = process.env.REACT_APP_BACKEND_PORT;
  const ip = process.env.REACT_APP_INTERNAL_IP;
  let urlBase = `http://${ip}:${port}/queso/${path}`;

  Object.keys(params).forEach((p, i) => {
    if (i > 0) urlBase += "&";
    else urlBase += "?";
    urlBase += `${p}=${encodeURIComponent(params[p])}`;
  })

  return urlBase;
} 

export const getRequestBackend = (path, params) => {
  const url = urlGenerator(path, params);
  return fetch(url)
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error("Network response was not ok.");
      });
}