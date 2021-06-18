
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return;
    }

    this.positions = {
        values : new Float32Array([
        // Add your list vertex positions here
       // Front face
			-0.5, -0.5, +0.5,
			-0.5, +0.5, +0.5,
			+0.5, -0.5, +0.5,
			+0.5, +0.5, +0.5,
			+0.5, -0.5, +0.5,
			-0.5, +0.5, +0.5,
			// Back face
			-0.5, -0.5, -0.5,
			+0.5, -0.5, -0.5,
			-0.5, +0.5, -0.5,
			+0.5, +0.5, -0.5,
			-0.5, +0.5, -0.5,
			+0.5, -0.5, -0.5,
			// Top face
			-0.5, +0.5, -0.5,
			+0.5, +0.5, -0.5,
			-0.5, +0.5, +0.5,
			+0.5, +0.5, +0.5,
			-0.5, +0.5, +0.5,
			+0.5, +0.5, -0.5,		
			// Bottom face
			-0.5, -0.5, -0.5,
			-0.5, -0.5, +0.5,
			+0.5, -0.5, -0.5,
			+0.5, -0.5, +0.5,
			+0.5, -0.5, -0.5,
			-0.5, -0.5, +0.5,
			// Right face
			+0.5, -0.5, -0.5,
			+0.5, -0.5, +0.5,
			+0.5, +0.5, -0.5,
			+0.5, +0.5, +0.5,
			+0.5, +0.5, -0.5,
			+0.5, -0.5, +0.5,		
			// Left face
			-0.5, -0.5, -0.5,
			-0.5, +0.5, -0.5,
			-0.5, -0.5, +0.5,
			-0.5, +0.5, +0.5,
			-0.5, -0.5, +0.5,
			-0.5, +0.5, -0.5,
            
            ]),
        numComponents : 3
    };

    this.textureCoordinates = {
        values: new Float32Array ([
        
        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,

        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        0.0,  1.0,
        1.0,  0.0
        
        ]),
        numComponents : 2
    };

    this.indices = {
        values : new Uint16Array([
       
        // Add your list of triangle indices here
		0,  1,  2,  3,  4,  5,   // front
		6,  7,  8,  9, 10, 11,   // back
	    12, 13, 14, 15, 16, 17,   // top
		18, 19, 20, 21, 22, 23,   // bottom
		24, 25, 26, 27, 28, 29,   // right
		30, 31, 32, 33, 34, 35,   // left
        
        ])
    };
    this.indices.count = this.indices.values.length;

    

    // Create a texture.

    function LoadingTexture(image, texture){
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        
          
    }

    function requestCORSIfNotSameOrigin(img, url) {
        if ((new URL(url, window.location.href)).origin !== window.location.origin) {
          img.crossOrigin = "";
        }
    }

    function initTexture(url){
        texture = gl.createTexture();
        var textureInfo = {
            width: 1,   // we don't know the size until it loads
            height: 1,
            texture: texture,
        };
        texImage = new Image();
        texImage.onload = function() {
            textureInfo.width = texImage.width;
            textureInfo.height = texImage.height;
            LoadingTexture(texImage, texture);
        };

        //texImage.src = "cubetexture.png";
        requestCORSIfNotSameOrigin(texImage, url);
        texImage.src = url;
        return textureInfo;
        
        //texImage.src = "https://webglfundamentals.org/webgl/resources/noodles.jpg";
    }
    var texInfo = initTexture("cubetexture.png");

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    this.textureCoordinates.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.textureCoordinates.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.textureCoordinates.values, gl.STATIC_DRAW );

    this.textureCoordinates.attributeLoc = gl.getAttribLocation(this.program, "a_texcoord");
    gl.enableVertexAttribArray(this.textureCoordinates.attributeLoc);

    TexLoc = gl.getUniformLocation( this.program, "u_texture" );
    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;


    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // bind the texcoord buffer.
        gl.bindBuffer( gl.ARRAY_BUFFER, this.textureCoordinates.buffer );
    
        gl.vertexAttribPointer(this.textureCoordinates.attributeLoc, this.textureCoordinates.numComponents, gl.FLOAT, gl.FALSE, 0, 0);

        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texInfo.texture)
        gl.uniform1i(TexLoc, 0);

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
