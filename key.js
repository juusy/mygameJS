var keys = {
    'W' : 38,
    'S' : 40,
    'A' : 37,
    'D' : 39,
    'Z' : 90,
    'SPACE': 32
};
var keyDown = {};
var SetKey = function (keyCode) {
    keyDown[keyCode] = true;
};
var isKeyDown = function (keyName) {
  return keyDown[keys[keyName]] == true;
};
var clearKey = function (keyCode) {
    keyDown[keyCode] = false;
};


