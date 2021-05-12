import "./mobileDetect.js";

const mobileDetect = new MobileDetect(window.navigator.userAgent);

function getDeviceOrientation() {
  if (window.screen.orientation) {
    return window.screen.orientation.type;
  }

  // iOS/safari
//   return Math.abs(+window.orientation) === 90 ? "landscape-primary" : "portrait-primary";
}

const getOrientation = () => {
  let orientation =
    (window.screen.orientation || {}).type || window.screen['mozOrientation'] || window.screen['msOrientation'];

  // Fallback 1 - try deprecated 'window.orientation'
  if (!orientation && window.orientation != undefined)
    orientation = window.orientation === 0 ? 'portrait-primary' : 'landscape-primary';

  // Fallback 2 - compare height and width
  if (!orientation) orientation = window.innerHeight > window.innerWidth ? 'portrait-primary' : 'landscape-primary';

  return orientation;
};

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
  "MobileDetect.phone()": mobileDetect.phone() ?? "null",
  "MobileDetect.tablet()": mobileDetect.tablet() ?? "null",
  "calculatedOrientation": getOrientation(),
};

// console.log(data)

appDiv.innerHTML = `${JSON.stringify(data, null, 4)}`;

