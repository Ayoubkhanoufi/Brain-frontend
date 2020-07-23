import axios from "axios";

const getClient = (baseUrl = null) => {
  const token = process.browser ? localStorage.getItem("accessToken") : null;
  //https://brain2.dev.pulse.digital/api
  //http://localhost:8585/
  const options = {
    baseURL: baseUrl || "http://localhost:8585/",
  };

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    (requestConfig) => requestConfig,
    (requestError) => {
      return Promise.reject(requestError);
    }
  );

  // Add a response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};

class ApiClient {
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  }

  login(path, payload, callback) {
    return this.client.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.data));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  }
}

export default new ApiClient();
