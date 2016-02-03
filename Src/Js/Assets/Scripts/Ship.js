function Ship(x,y,r)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = "#FFFFFF";
	this.speed = 5;

	this.canMove = true;

	this.collisionType = "Circle";

	this.isActive = true;

	this.bulletPool = [];

	this.fireCoolDown = 300; //ms
	this.canFire = true;
	this.bulletRadius = 5;
	
	this.collideWithLists = ["bullet", "static"];

}

Ship.prototype =
{

	Start: function ()
	{
		


	},
    Update: function () 
    { 

    	for (var i = 0; i < this.bulletPool.length; i++) {
    		this.bulletPool[i].Update();
    	};

    	if(this.isActive)
    	{
			if(this.canMove)
				this.CheckInput();
    		
    		this.Render(); 
    	}
    },
    Render: function () 
    { 
    	var cx = ScreenCanvas.Context;
    	cx.beginPath();
		cx.moveTo(this.x,this.y);
		cx.arc(this.x, this.y, this.r, Math.PI * 2,false)
		cx.closePath();
		cx.fillStyle = this.color;
		cx.fill();
		//cx.stroke();

    },
    CheckInput: function ()
	{

		if(this.canMove)
		{
			var x = 0;
			var y = 0;

			if(KeyboardInput.isKeyDown("right")) x ++;
			if(KeyboardInput.isKeyDown("left")) x --;
			if(KeyboardInput.isKeyDown("down")) y ++;
			if(KeyboardInput.isKeyDown("up")) y --;

			this.Move(x,0);
			this.Move(0,y);
		}

		if(KeyboardInput.isKeyDown("space", false))
		{
	    	if(this.canFire)
    		{
				this.FireLeveled(2);		
					
	    	}
	    	else
	    	{
	    		//console.log("Can't shoot : On cooldown");
	    	}	

		} 
		
	},

    Move: function (x, y) 
    {
    	var newX = this.x + x * this.speed;
    	var newY = this.y + y * this.speed;


    	var lastX = this.x;
    	var lastY = this.y;
   		this.x = newX;
		this.y = newY;


		for (var i = 0; i < this.collideWithLists.length; i++) {
	        if(Collisions.CheckCollisionList(this, this.collideWithLists[i]))
	        {
	           	this.x = lastX;
	   			this.y = lastY;
	        	this.OnCollision(this.collideWithLists[i]);
	        }
			
		};    	

    },
    OnCollision : function(otherType) 
    { 
    	//console.log("Player Colli with ",otherType)
    },
    SetPosition: function(x, y)
    {
    	this.x = x;
    	this.y = y;
    },
    SetActive: function(active)
    {
    	this.isActive = active;
    }

}