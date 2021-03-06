

	const socket = io.connect('http://localhost:3000');
    socket.on('dataReady', ResultsRecieved);
    
    function ResultsRecieved(results) {
        console.log('Got results');
        
        document.getElementById('moveLeft').innerHTML =       results.moveLeft ;
        document.getElementById('moveRight').innerHTML =      results.moveRight ;
        document.getElementById('flip').innerHTML =           results.flip ;
        document.getElementById('moveForwards').innerHTML =   results.moveForwards ;
        document.getElementById('moveBackwards').innerHTML =  results.moveBackwards ;
        
        const resultsArray = [results.moveLeft, results.moveRight, results.flip, results.moveForwards, results.moveBackwards]
        let hightNumber = Math.max(...resultsArray)
        if(hightNumber > 0){
            document.getElementById('message').innerHTML = 'Highest Nuber: ' + hightNumber ;

            let indexOfHighstNumber = resultsArray.indexOf(hightNumber);
            ExecuteDroneAction(indexOfHighstNumber);
        }else{
            document.getElementById('message').innerHTML = 'No results' ;

        }
    }

    function fetchTweets(){        
        socket.emit('GetTweets', '#jsday');
    }
    function ExecuteDroneAction(intValue){
        switch (intValue) {
            case 0: drone.moveLeft();
            case 1: drone.moveRight();
            case 2: drone.flip();
            case 3: drone.moveForwards();
            case 4: drone.moveBackwards();

            default:
                break;
        }
    }

    function StartDemo(){
        console.log('starting demo...');
        // drone.takeOff();
        setInterval(() => {
            fetchTweets();
        }, 5000);
    }

    window.start = StartDemo;