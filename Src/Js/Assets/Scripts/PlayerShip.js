function PlayerShip(x,y,r)
{
    var that = new Ship(x,y,r);
    
    that.canMove = true;
    that.fireCoolDown = 100;
    that.color = "#0000aa";



    that.Start = function()
    {
        Collisions.RegisterCollider(this, "player");
    }

    return that;
}
