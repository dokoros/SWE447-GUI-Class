
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
        /*
           0.5, 0.5,  0.5,  //vert 0
           0.5, -0.5,  0.5,   //vert 1
           -0.5,  -0.5,  0.5,  //vert 2
           -0.5,  0.5,  0.5,  //vert 3

           0.5, 0.5, -0.5,    //vert 4
           0.5, -0.5, -0.5,    //vert 5
           -0.5, -0.5, -0.5,    //vert 6
           -0.5, 0.5, -0.5,    //vert 7
        */
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
        /*
        // select the top left image
        0   , 0  ,
        0   , 0.5,
        0.25, 0  ,
        0   , 0.5,
        0.25, 0.5,
        0.25, 0  ,
        // select the top middle image
        0.25, 0  ,
        0.5 , 0  ,
        0.25, 0.5,
        0.25, 0.5,
        0.5 , 0  ,
        0.5 , 0.5,
        // select to top right image
        0.5 , 0  ,
        0.5 , 0.5,
        0.75, 0  ,
        0.5 , 0.5,
        0.75, 0.5,
        0.75, 0  ,
        // select the bottom left image
        0   , 0.5,
        0.25, 0.5,
        0   , 1  ,
        0   , 1  ,
        0.25, 0.5,
        0.25, 1  ,
        // select the bottom middle image
        0.25, 0.5,
        0.25, 1  ,
        0.5 , 0.5,
        0.25, 1  ,
        0.5 , 1  ,
        0.5 , 0.5,
        // select the bottom right image
        0.5 , 0.5,
        0.75, 0.5,
        0.5 , 1  ,
        0.5 , 1  ,
        0.75, 0.5,
        0.75, 1  ,
        */
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
        1.0,  0.0,
        ]),
        numComponents : 2
    };

    this.indices = {
        values : new Uint16Array([
            // Add your list of triangle indices here
            /*
            // front
            3, 2, 7,
            7, 2, 6,


            //bottom
            3, 2, 0,
            0, 2, 1,

            //back
            0, 1, 4,
            4, 1, 5,

            //left
            0, 3, 4,
            4, 3, 7,

            //Right
            2, 1, 6,
            6, 1, 5,

            //top
            4, 5, 7,
            7, 5, 6

          */
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
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
                    //new Uint8Array([0, 0, 255, 255]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

        /*
        // Check if the image is a power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
            } else {
            // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        

        }
        */
          
    }


    function initTexture(){
        texture = gl.createTexture();
        texImage = new Image();
        texImage.onload = function() {

            LoadingTexture(texImage, texture);
        };
        texImage.src = "Test.png";
    }
    initTexture();

            
    function isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }
    
    
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

        // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
    
        gl.vertexAttribPointer(this.textureCoordinates.attributeLoc, this.textureCoordinates.numComponents, gl.FLOAT, gl.FALSE, 0, 0);

        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.uniform1i(TexLoc, 0);

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
