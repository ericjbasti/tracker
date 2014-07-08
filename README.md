tracker.js v.1.1
==========

Adding hit detection to your website
---------------

This jquery plugin, takes your current scroll position and tells you when an item is in view, or if its already passed.
You can fire callbacks based on any of the allowed conditions.

* passed : function() // if we go pass the element, this function is fired.
* inView : function() // while the element is on the screen we fire this function
* outside : function() // if the item has never been viewable we fire this function
* firstView : function() // the first time we view an element this function is called (this is the most commonly used function)

