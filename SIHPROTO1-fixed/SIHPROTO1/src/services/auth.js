export function getFarmerId() {
  const stored = localStorage.getItem("farmerId");
  return stored ? Number(stored) : null;
}

export function getUserName() {
  return localStorage.getItem("userName") || "Farmer";
}

export function getUserRole() {
  return localStorage.getItem("userRole") || "farmer";
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  localStorage.removeItem("farmerId");
  localStorage.removeItem("gpsPermissionStatus");
  localStorage.removeItem("gpsPermissionUser");
  localStorage.removeItem("gpsLatitude");
  localStorage.removeItem("gpsLongitude");
}

export function storeCurrentLocation(latitude, longitude) {
  const userId = String(getFarmerId() ?? "guest");
  localStorage.setItem("gpsPermissionStatus", "granted");
  localStorage.setItem("gpsPermissionUser", userId);
  localStorage.setItem("gpsLatitude", String(latitude));
  localStorage.setItem("gpsLongitude", String(longitude));
}

export function getStoredLocation() {
  const userId = String(getFarmerId() ?? "guest");
  const permissionUser = localStorage.getItem("gpsPermissionUser");
  if (permissionUser !== userId) return null;

  const latitude = Number(localStorage.getItem("gpsLatitude"));
  const longitude = Number(localStorage.getItem("gpsLongitude"));

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return { latitude, longitude };
}

export function requestLocationPermission() {
  if (!navigator.geolocation) {
    return Promise.reject(new Error("Location access is not supported on this device."));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        storeCurrentLocation(latitude, longitude);
        resolve({ latitude, longitude });
      },
      (error) => {
        localStorage.setItem("gpsPermissionStatus", "denied");
        localStorage.setItem("gpsPermissionUser", String(getFarmerId() ?? "guest"));
        reject(new Error(error.message || "Location access denied."));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

export function shouldAskForLocation() {
  const userId = String(getFarmerId() ?? "guest");
  const permissionUser = localStorage.getItem("gpsPermissionUser");
  return permissionUser !== userId;
}
