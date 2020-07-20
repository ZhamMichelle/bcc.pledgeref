import axios from "axios";

const webConfigEnv = (window as any).env;

export class Server {
  constructor() {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("ERROR");
        if (!error.response) {
          //   pm.setSnackBarMessage("Проверьте соединение с сетью.");
          //   pm.openSnackBar();
          //   pm.stopLoading();
        } else if (error.response.status === 401) {
          if (localStorage.refreshToken && localStorage.jwtToken) {
            const tokenData = {
              accessToken: localStorage.jwtToken,
              refreshToken: localStorage.refreshToken,
            };
            this.post(
              `${webConfigEnv.CAMUNDA_URL}/inline/api/auth/refreshToken`,
              tokenData
            )
              .then((data: any) => {
                if (data.ok) {
                  localStorage.setItem("jwtToken", data.tokens.accessToken);
                  localStorage.setItem(
                    "refreshToken",
                    data.tokens.refreshToken
                  );
                  localStorage.setItem("userInfo", JSON.stringify(data.user));
                } else {
                  (window as any).location.href = "/login";
                }
              })
              .then(() => {
                const config = error.config;
                config.headers = {
                  Authorization: "Bearer " + localStorage.jwtToken,
                };
                axios.request(config);
              });
          } else {
            (window as any).location.href = "/login";
          }
        } else {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            //pm.setSnackBarMessage(error.response.data.message);
          }
          //   pm.openSnackBar();
          //   pm.stopLoading();
        }
        return Promise.reject(error);
      }
    );
  }

  public request(config: any) {
    return axios.request(config);
  }
  public get(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    var userContext = JSON.parse(localStorage.getItem("userContext") || "{}");
    config.headers.Authorization =
      "Bearer " + (userContext.token || {}).accessToken;
    return axios.get(url, config).then((r) => r.data);
  }
  public delete(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    var userContext = JSON.parse(localStorage.getItem("userContext") || "{}");
    config.headers.Authorization =
      "Bearer " + (userContext.token || {}).accessToken;
    return axios.delete(url, config).then((r) => r.data);
  }

  public token(url: string, data: any, config = {} as any) {
    config = config || {};
    return axios.post(url, data, config).then((r) => r.data);
  }

  public post(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    var userContext = JSON.parse(localStorage.getItem("userContext") || "{}");
    config.headers.Authorization =
      "Bearer " + (userContext.token || {}).accessToken;
    return axios.post(url, data, config).then((r) => r.data);
  }

  public put(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    var userContext = JSON.parse(localStorage.getItem("userContext") || "{}");
    config.headers.Authorization =
      "Bearer " + (userContext.token || {}).accessToken;
    // config.baseURL = webConfigEnv.SERVER_URL;
    return axios.put(url, data, config).then((r) => r.data);
  }
}

export const server = new Server();
