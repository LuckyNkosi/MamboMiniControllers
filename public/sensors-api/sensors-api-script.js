// var socket;
// socket = io.connect('http://localhost:3000');

//#region Reference Data

const ReferencePositions = {
    origin      : {
        x: 0,
        y: 0,
        z: 10
    },
    faceDown    : {
        x: 0,
        y: 0,
        z: -10
    },
    straightUp  : {
        x: 0,
        y: 10,
        z: 0
    },
    upsideDown  : {
        x: 0,
        y: -10,
        z: 0
    },
    rightTilt   : {
        x: -10,
        y: 0,
        z: 0
    },
    leftTilt    : {
        x: 10,
        y: 0,
        z: 0
    },
    leanAway    : {
        x: 0,
        y: 7,
        z: 5
    },
    leanTowards : {
        x: 0,
        y: 7,
        z: -5
    },
}


const PhoneOrientations = Object.freeze({
    origin      : 'origin      ',
    faceDown    : 'faceDown    ',
    straightUp  : 'straightUp  ',
    upsideDown  : 'upsideDown  ',
    rightTilt   : 'rightTilt   ',
    leftTilt    : 'leftTilt    ',
    leanTowards : 'leanTowards ',
    leanAway    : 'leanAway    '
  });
//#endregion

let previousPosition = ReferencePositions.origin;

let sensor = new Accelerometer();
sensor.addEventListener('reading', function(e) {

    if( !isAtPosition(e.target, previousPosition)) //Position has changed
    {            
        document.getElementById('x').innerHTML = 'x: ' + e.target.x;
        document.getElementById('y').innerHTML = 'y: ' + e.target.y;
        document.getElementById('z').innerHTML = 'z: ' + e.target.z;
        SendSensorDate(GetDirection(e.target));
    }
});

function GetDirection(position){    

    if( isAtPosition(position, ReferencePositions.origin      )) { previousPosition = ReferencePositions.origin     ; return "origin"; }
    if( isAtPosition(position, ReferencePositions.faceDown    )) { previousPosition = ReferencePositions.faceDown   ; return "faceDown"; }
    if( isAtPosition(position, ReferencePositions.straightUp  )) { previousPosition = ReferencePositions.straightUp ; return "straightUp"; }
    if( isAtPosition(position, ReferencePositions.upsideDown  )) { previousPosition = ReferencePositions.upsideDown ; return "upsideDown"; }
    if( isAtPosition(position, ReferencePositions.rightTilt   )) { previousPosition = ReferencePositions.rightTilt  ; return "rightTilt"; }
    if( isAtPosition(position, ReferencePositions.leftTilt    )) { previousPosition = ReferencePositions.leftTilt   ; return "leftTilt"; }
    if( isAtPosition(position, ReferencePositions.leanTowards )) { previousPosition = ReferencePositions.leanTowards; return "leanTowards"; }
    if( isAtPosition(position, ReferencePositions.leanAway    )
            && previousPosition != ReferencePositions.origin   ) { previousPosition = ReferencePositions.leanAway   ; return "leanAway"; }
    return ("ERROR: x:" + position.x + ", y: "+ position.y + ", z: " + position.z)
}


function isAtPosition(refPosition, newPosition){
    return( 
        IsSomewhatEqual(refPosition.x, newPosition.x ) && 
        IsSomewhatEqual(refPosition.y, newPosition.y ) && 
        IsSomewhatEqual(refPosition.z, newPosition.z ) 
    )
}

function IsSomewhatEqual(val1, val2){
    let Offset = 2.5;
    return (Math.abs(val1 - val2) <= Offset);
}

sensor.start();

function SendSensorDate(dir){
    if(dir.includes("ERROR")) return;

    switch (dir) {
        case 'origin':      drone.land();           console.log('land drone');  break;
        case 'leftTilt':    drone.moveLeft();       console.log('moveLeft drone');  break;
        case 'faceDown':    drone.flip();           console.log('flip drone');  break;
        case 'leanAway':    drone.moveForwards();   console.log('moveForwards drone');  break;
        case 'rightTilt':   drone.moveRight();      console.log('moveRight drone');  break;
        case 'straightUp':  drone.takeOff();        console.log('takeOff drone');  break;
        case 'upsideDown':  drone.flip();           console.log('flip drone');  break;
        case 'leanTowards': drone.moveBackwards();  console.log('moveBackwards drone');  break;
    
        default:
            break;
    }
}

