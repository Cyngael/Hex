function GameScene()
{
    var that = new Scene();


    that.Start = function ()
    {
      that.board = new Board(9);
      that.board.Start();

     
    }


    that.Update = function ()
    {


     that.board.Update();

    }

    return that;
}
