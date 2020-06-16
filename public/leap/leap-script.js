import { ParrotDrone } from "../lib/drone.v1.2.lucky.js";

// to make working with angles easy
window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;
const THRESHOD_ANGLE = 40;

let droneState = "None";
// import { ParrotDrone } from "./lib/drone.v1.2.lucky";

let drone = new ParrotDrone();
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

Leap.loop({
  // frame callback is run before individual frame components
  frame: function(frame) {
    roll.innerHTML = "";
    yaw.innerHTML = "";
    pitch.innerHTML = "";
  },

  // hand callbacks are run once for each hand in the frame
  hand: function(hand) {
    roll.innerHTML +=
      "Roll: " + hand.id + " &nbsp;roll: " + ToDegrees(hand.roll()) + "°<br/>";
    yaw.innerHTML +=
      "Yaw: " + hand.id + " &nbsp;yaw: " + ToDegrees(hand.yaw()) + "°<br/>";
    pitch.innerHTML +=
      "Pitch: " +
      hand.id +
      " &nbsp;pitch: " +
      ToDegrees(hand.pitch()) +
      "°<br/>";
    console.log('hand:' + hand);
    
    sendCommand(hand);
  }
});

function ToDegrees(value) {
  console.log(value);
  
  return Math.round(value * TO_DEG);
}

function sendCommand(hand) {
  pitchDrone(hand);
  rollDrone(hand);
  yawDrone(hand);
  balanceDrone(hand);
}

function balanceDrone(hand){
  if(
    withinThreshold( ToDegrees(hand.pitch()) ) &&
    withinThreshold( ToDegrees(hand.roll()) ) && 
    withinThreshold( ToDegrees(hand.yaw()) )
  ) 
  drone.hover();
}

function withinThreshold(handValue){
  return (
    handValue <  THRESHOD_ANGLE &&
    handValue >- THRESHOD_ANGLE );
}

function pitchDrone(hand) {
  let pitchValue = ToDegrees(hand.pitch());
  //   console.log("pitchValue : " + pitchValue);
  if (pitchValue > THRESHOD_ANGLE) {
    console.log("right = pitchValue : " + pitchValue);
    drone.moveBackwards();
  } else if (pitchValue < -THRESHOD_ANGLE) {
    console.log("right = pitchValue : " + pitchValue);
    drone.moveForwards();
  }
}
function yawDrone(hand) {
  let yawValue = ToDegrees(hand.yaw());
  if (yawValue > THRESHOD_ANGLE) {
    drone.twistRight();
  } else if (yawValue < -THRESHOD_ANGLE) {
    drone.twistLeft();
  }
}
function rollDrone(hand) {
  let yawValue = ToDegrees(hand.roll());
  if (yawValue > THRESHOD_ANGLE) {
    drone.moveLeft();
  } else if (yawValue < -THRESHOD_ANGLE) {
    drone.moveRight();
  }
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
