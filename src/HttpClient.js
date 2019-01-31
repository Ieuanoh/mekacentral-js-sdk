import HttpMethod from "./HttpMethod";
import fetch from "isomorphic-fetch";

const fallbackUrl = "https://test.mekacentral.mekamon.com";

let currentSession = {
  mekatoken: "",
  accountUuid: "",
  baseUrl: ""
};

// On initialisation attempt to reload session from local storage.
(function reloadSessionIfPresent() {
  if (typeof window !== "undefined" && !currentSession.mekatoken) {
    currentSession.mekatoken = localStorage.getItem("mekatoken");
  }

  if (
    typeof window !== "undefined" &&
    !currentSession.baseUrl &&
    localStorage.getItem("baseUrl")
  ) {
    currentSession.baseUrl = localStorage.getItem("baseUrl");
  } else if (!currentSession.baseUrl) {
    currentSession.baseUrl = fallbackUrl;
  }
})();

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*"
};

function appendQueryParams(url, queryParams) {
  console.log(queryParams);
  for (var paramName in queryParams) {
    url += `&${paramName}=${queryParams[paramName]}`;
  }
  return url;
}

function appendMekatoken(url) {
  if (currentSession.mekatoken) {
    return `${url}?mekatoken=${currentSession.mekatoken}`;
  } else {
    throw new Error(
      "No mekatoken present for request authentication. Login required."
    );
  }
}

function updateCurrentSession(json) {
  if (json.mekatoken) {
    currentSession.mekatoken = json.mekatoken;
    if (typeof window !== "undefined") {
      localStorage.setItem("mekatoken", json.mekatoken);
    }
  }
  if (json.properties && json.properties.accountId) {
    currentSession.accountUuid = json.properties.accountId;
    if (typeof window !== "undefined") {
      localStorage.setItem("accountUuid", json.properties.accountId);
    }
  }
}

export default {
  send: async (
    endpoint = "",
    httpMethod = HttpMethod.GET,
    options = {},
    requiresAuth = true
  ) => {
    if (requiresAuth) endpoint = appendMekatoken(endpoint);
    if (Object.keys(options).length) {
      if (options.queryParams && Object.keys(options.queryParams).length)
        endpoint = appendQueryParams(endpoint, queryParams);
    }

    const requestOptions = {
      method: httpMethod,
      headers: defaultHeaders,
      body: JSON.stringify(options.body)
    };

    const response = await fetch(
      `${currentSession.baseUrl}${endpoint}`,
      requestOptions
    );

    if (response.status !== 200) {
      const status = await response.json();
      return Promise.reject({
        statusCode: response.status,
        ...status.properties
      });
    } else {
      const json = await response.json();
      updateCurrentSession(json);
      return json;
    }
  },
  setBaseUrl: newBaseUrl => {
    if (newBaseUrl) {
      currentSession.baseUrl = newBaseUrl;
      if (typeof window !== "undefined") {
        localStorage.setItem("baseUrl", newBaseUrl);
      }
    }
  },
  deleteCurrentSession: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mekatoken");
      localStorage.removeItem("accountUuid");
    }
    currentSession.mekatoken = "";
    currentSession.accountUuid = "";
  },
  getCurrentSession: () => {
    return currentSession;
  }
};
