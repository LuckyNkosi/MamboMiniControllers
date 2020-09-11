window.fruitTouched = (key) => {
    console.log(key);
    switch (key) {
        case 'w': drone.moveLeft(); break;
        case 'd': drone.moveRight(); break;
        case 'a': drone.flip();break;
        default:
            break;
    }
};
