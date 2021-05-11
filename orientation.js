import "./mobileDetect.js";

const mobileDetect = new MobileDetect(window.navigator.userAgent);

function getDeviceOrientation() {
  if (window.screen.orientation) {
    return window.screen.orientation.type;
  }

  // iOS/safari
//   return Math.abs(+window.orientation) === 90 ? "landscape-primary" : "portrait-primary";
}

function getDeviceWidth() {
  const deviceOrientation = getDeviceOrientation();
  return (deviceOrientation === "portrait-primary" || deviceOrientation === "portrait-secondary")
    ? Math.max(
        document.documentElement ? document.documentElement.clientWidth : 0,
        window.innerWidth || 0
      )
    : Math.max(
        document.documentElement ? document.documentElement.clientHeight : 0,
        window.innerHeight || 0
      );
}

const appDiv = document.getElementById("app");

const data = {
  "window.orientation": window.orientation ?? "null",
  "window.screen.orientation.type": getDeviceOrientation() ?? "null",
  "MobileDetect.mobile()": mobileDetect.mobile() ?? "null",
};

// console.log(data)

appDiv.innerHTML = `${JSON.stringify(data, null, 4)}`;

