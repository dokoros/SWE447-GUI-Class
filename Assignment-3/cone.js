var gl = null;
//var cone = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    Cone(gl);
    //cone = new Cone(gl, 8);
    render();
}

function render() {
    Cone.render();
    //cone.render();
}

window.onload = init;
