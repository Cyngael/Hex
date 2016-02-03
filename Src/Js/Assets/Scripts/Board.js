function Board(s)
{
	this.size = s;

	this.strokeColor = "#333";

	this.strokeWidth = 15;

	this.needToRender = true;

    this.isGameOver = false;

    this.colorTurn = -1;

    this.winner = 0;

}

Board.prototype =
{

	Start: function ()
	{
	
        //tab[x][y]
		this.tab = new Array(this.size);

		for (var i = 0; i < this.size; i++) {
			this.tab[i] = new Array(this.size);
		};


	

        this.r =  (ScreenCanvas.Canvas.height/this.size*0.9) ;

        this.x_offset = this.r * 0.75;
        this.y_offset = this.r * 0.5;

        this.y_start = ScreenCanvas.Canvas.height/2;
        this.x_start = ((ScreenCanvas.Canvas.width - (this.r * this.size + (this.r/2 * (this.size-1)))) / 2) + (this.r/2);




        for (var i = 0; i < this.tab.length; i++) {
            for (var j = 0; j < this.tab[i].length; j++) {
                this.tab[i][j] = new HexTile(   i,
                                                j,
                                                this.x_start + (j* this.x_offset) + (i * this.x_offset) ,
                                                this.y_start + (i * -this.y_offset) + (j * this.y_offset),
                                                0);
            };
        };

     

	},
    Update: function () 
    { 


        if(MouseInput.left)
        {
            MouseInput.left = false;
            var result = this.CheckClick(MouseInput.x,MouseInput.y);

            if(result != null && result.color === 0)
            {
                result.color = this.colorTurn; 
                this.colorTurn *= -1;

                this.CheckGameOver();
                this.needToRender = true;
            }

        }


    	if(this.needToRender)
    	{
    		this.Render(); 

            if(this.isGameOver)
            {
                this.DrawGameOver();
            }
    	}

		

    },
    CheckClick: function(x,y)
    {



        for (var i = 0; i < this.tab.length; i++) {
            for (var j = 0; j < this.tab[i].length; j++) {
                   
                if(x <= this.tab[i][j].x + this.r/4 && x > this.tab[i][j].x - this.r/4 )
                {
                    if(y <= this.tab[i][j].y + this.r/4 && y > this.tab[i][j].y - this.r/4 )
                    {
                        return this.tab[i][j];
                    }

                }
                
            };
        };

        return null;

    },
    Render: function () 
    { 

    	ScreenCanvas.Clear();

    	
    	var cx = ScreenCanvas.Context;

    
        this.DrawBackground(cx);
    
        cx.strokeStyle = this.strokeColor;
        cx.lineWidth = 5;

		for (var i = 0; i < this.size ; i++) {
            for (var j = 0; j < this.size; j++) {
                this.DrawHex(cx,
                            this.tab[i][j].x,
                            this.tab[i][j].y,
                            this.r,
                            this.tab[i][j].color);
            };

		};

        cx.font = '30pt Arial';
        cx.fillStyle = "#000";
        cx.fillText("Current Player : ", 20 , 60);

         this.DrawHex(cx,
                        300,
                        50,
                        30,
                        this.colorTurn);


	   
	

		this.needToRender = false;
    },
    DrawBackground: function(cx)
    {

        var offset = 20;

        //Black bands
        cx.beginPath();
        cx.moveTo(ScreenCanvas.Canvas.width/2 ,this.tab[this.size-1][0].y - this.r*0.6  - offset);
        cx.lineTo(  this.x_start - this.r - offset,ScreenCanvas.Canvas.height/2)
        cx.lineTo(ScreenCanvas.Canvas.width/2,ScreenCanvas.Canvas.height/2);
        cx.closePath();

         if(cx.fillStyle != "#000")
                cx.fillStyle = "#000";
        cx.fill();

        cx.beginPath();
        cx.moveTo(ScreenCanvas.Canvas.width/2 ,this.tab[0][this.size-1].y + this.r*0.6  + offset);
        cx.lineTo(this.tab[this.size-1][this.size-1].x + this.r  + offset ,ScreenCanvas.Canvas.height/2)
        cx.lineTo(ScreenCanvas.Canvas.width/2,ScreenCanvas.Canvas.height/2);
        cx.closePath();
        cx.fill();



        //White bands
        cx.beginPath();
        cx.moveTo(ScreenCanvas.Canvas.width/2 ,this.tab[this.size-1][0].y - this.r*0.6  - offset);
        cx.lineTo(this.tab[this.size-1][this.size-1].x + this.r  + offset ,ScreenCanvas.Canvas.height/2)
        cx.lineTo(ScreenCanvas.Canvas.width/2,ScreenCanvas.Canvas.height/2);
        cx.closePath();

        cx.fillStyle = "#fff";
        cx.fill();

        cx.beginPath();
        cx.moveTo(ScreenCanvas.Canvas.width/2 ,this.tab[0][this.size-1].y + this.r*0.6  + offset);
        cx.lineTo(  this.x_start - this.r - offset,ScreenCanvas.Canvas.height/2)
        cx.lineTo(ScreenCanvas.Canvas.width/2,ScreenCanvas.Canvas.height/2);

        cx.closePath();
        cx.fill();


    },
    DrawHex : function(cx,x,y,r,contained)
    {
        cx.beginPath();

        cx.moveTo(x - r/2 , y);
        cx.lineTo(x - r/4 , y + r/2);
        cx.lineTo(x + r/4 , y + r/2);
        cx.lineTo(x + r/2 , y);
        cx.lineTo(x + r/4 , y - r/2);
        cx.lineTo(x - r/4 , y - r/2);
        cx.closePath();

        switch(contained)
        {
            case -1 : 
                if( cx.fillStyle != "#FFF")
                    cx.fillStyle = "#FFF";
                cx.fill();

            break;

            case 1 :
                if( cx.fillStyle != "#000")
                    cx.fillStyle = "#000";
                cx.fill();
            break;

            default :
                if( cx.fillStyle != "#333")
                    cx.fillStyle = "#aaaa33";
               cx.fill();
            break;

        }

        cx.stroke();


    },
    DrawGameOver : function()
    {
        var cx = ScreenCanvas.Context;
        cx.globalAlpha = 0.8;
        cx.fillStyle = "#FF9933";
        cx.fillRect(0,0,ScreenCanvas.Canvas.width, ScreenCanvas.Canvas.height);
        cx.globalAlpha = 1;

        cx.font = '60pt Arial';
        cx.fillStyle = "#000"
        cx.fillText((this.winner == -1 ? "White" : "Black") + " Win",ScreenCanvas.Canvas.width/3,ScreenCanvas.Canvas.height/2);

    },
    CheckGameOver : function()
    {

        var gameOver = false;

        for (var j = 0; j < this.size; j++) {
            if(this.tab[0][j].color == -1)
            {
               gameOver = this.CheckGameOverRecursive(this.tab[0][j], this.tab[0][j].color);

               if(gameOver)
               {
                    this.winner = -1;
                    break;
               }
            }
            if(this.tab[j][0].color == 1)
            {
                gameOver = this.CheckGameOverRecursive(this.tab[j][0], this.tab[j][0].color);

                if(gameOver)
                {
                    this.winner = 1;
                    break;
                }
            }
        };


        this.isGameOver = gameOver;

    },
    CheckGameOverRecursive : function(tile, col)
    {

        var ret = false;

        if(col == -1)
        {
            if(tile.row == this.size-1)
                return true;
        }
        else
        {
            if(tile.col == this.size-1)
                return true;
        }
       
        tile.hasBeenChecked = true;


        var nextTile;

         //top right
        if(ret == false)
        {
            if(tile.row + 1 < this.size)
            {
                nextTile = this.tab[tile.row + 1][tile.col];

                if(nextTile.color == tile.color && nextTile.hasBeenChecked == false )
                {
                    ret = this.CheckGameOverRecursive(nextTile,tile.color);

                }
            }
        }
     //bot left
        if(ret == false)
        {
            if( tile.row > 0)
            {
                nextTile = this.tab[tile.row - 1][tile.col];  

                if(nextTile.color == tile.color && nextTile.hasBeenChecked == false )
                {
                    ret = this.CheckGameOverRecursive(nextTile,tile.color);

                }
            }
          
        }   
        //bot bot
        if(ret == false)
        {
            if(tile.row > 0 && tile.col  + 1 < this.size)
            {
                nextTile = this.tab[tile.row - 1][tile.col + 1];  

                if(nextTile.color == tile.color && nextTile.hasBeenChecked == false )
                {
                    ret = this.CheckGameOverRecursive(nextTile,tile.color);

                }
            }
           
        } 
        //bot right
        if(ret == false)
        {
            if(tile.col > 0)
            {
                nextTile = this.tab[tile.row][tile.col - 1];  

                if(nextTile.color == tile.color && nextTile.hasBeenChecked == false )
                {
                    ret = this.CheckGameOverRecursive(nextTile,tile.color);

                }
            }
            
        } 
        //top left
         if(ret == false)
        {
            if(tile.col  + 1 < this.size)
            {
                nextTile = this.tab[tile.row][tile.col + 1];  

                if(nextTile.color == tile.color && nextTile.hasBeenChecked == false )
                {
                    ret = this.CheckGameOverRecursive(nextTile,tile.color);

                }
            }
        } 
        //top top
        if(ret == false)
        {
            if(tile.row  + 1 < this.size && tile.col > 0)
            {

                nextTile = this.tab[tile.row + 1 ][tile.col - 1];   

                if(nextTile.color == tile.color && nextTile.hasBeenChecked == false )
                {
                    ret = this.CheckGameOverRecursive(nextTile,tile.color);

                }
                
            }
        } 


        tile.hasBeenChecked = false;

        return ret;
        
    }
}