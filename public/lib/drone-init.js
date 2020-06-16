import { ParrotDrone } from "../lib/drone.v1.2.lucky.js";

//#region  Initialisation
// to make working with angles easy
window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

let drone = new ParrotDrone();
window.drone = drone;
function onDisconnectCallback() {
  console.log("Disconnected called");
  init();
}
function init() {
  //connect:
  drone
    .connect(onDisconnectCallback)
    .then(() => {
      console.log("connected");
    })
    .catch(() => console.log("Connection Error"));
}

function connectToDrone() {
  init();
}
function takeOff() {
  drone.takeOff();
}
function land() {
  drone.land();
}
function disconnectFromDrone() {
  drone.land();
}
function hover() {
  drone.hover();
}

window.takeOff = takeOff;
window.land = land;
window.connectToDrone = connectToDrone;
window.hover = hover;
window.disconnectFromDrone = disconnectFromDrone;

//#endregion


//#region Utility

function ToDegrees(value) {
  console.log(value);
  
  return Math.round(value * TO_DEG);
}

//#endregion

