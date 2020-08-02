import axios from "axios";

const webConfigEnv = (window as any).env;

class Service {
  getRestClient() {
    var serviceInstance;
    var userContext = JSON.parse(localStorage.getItem("userContext") || "{}");
    if (!serviceInstance) {
      serviceInstance = axios.create({
        baseURL: webConfigEnv.BCC_PLEDGEREFBACK,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (userContext.token || {}).accessToken,
        },
      });
    }
    return serviceInstance;
  }
}

export default new Service();
