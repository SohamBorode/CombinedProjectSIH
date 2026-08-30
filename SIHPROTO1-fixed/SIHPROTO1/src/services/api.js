const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api";

function getErrorMessage(data, status) {
  if (data && typeof data === "object") {
    return (
      data.message ||
      data.error ||
      data.detail ||
      `Request failed with status ${status}`
    );
  }

  return `Request failed with status ${status}`;
}

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  let data = null;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text ? text : null;
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response.status));
  }

  return data;
}

export async function apiGet(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  return handleResponse(response);
}

export async function apiPost(endpoint, payload, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
    body: JSON.stringify(payload),
    ...options,
  });

  return handleResponse(response);
}

export async function apiUpload(endpoint, formData, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    body: formData,
    ...options,
  });

  return handleResponse(response);
}

export { API_URL };