﻿var Director = (new function ()
{
    var currentScene = null;
    var tick = null;

    var that =
    {
        Start: function ()
        {
            !!currentScene && currentScene.Start();

            that.Update();
        },

        Update: function ()
        {

            !!currentScene && currentScene.Update();

            MouseInput.Update();
            KeyboardInput.Update();


            tick = requestAnimationFrame(that.Update);
        },

        changeScene: function(scn)
        {
            currentScene = scn;
            cancelAnimationFrame(tick);
            that.Start();
        },

        get scene()
        {
            return currentScene;
        },

        set scene(scn)
        {
            currentScene = scn;
        }
    }

    return that;
}());