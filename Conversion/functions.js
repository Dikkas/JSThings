function kelvin(c){
    return (c + 273.15).toFixed(2);
}

function fahrenheit(c){
    let far = (c*1.8) + 32;
    console.log("Celsius para Fahrenheit: " + far.toFixed(2));
    return far;
}