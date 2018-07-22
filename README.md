# movingBox

Canvas based clipboard with multiple feature like merge,split,grawity behaviour with rectangle object.

Problem statement

Create a "class" that produces squares of random size and color.
Every instance displays its size in px²
Every instance is draggable
Add a button that populates the page with 20 instances per click
When dropped on each other one instance "consumes" the other and grows by the size of the consumed instance
The colors of the merged nodes are a mix of the original colors (50/50)

When merging instances, the resulting color is a proportional blend of the original colors 
(NOT 50/50 but in the ratio of the original sizes)
Double-clicking an instance splits the instance into 2 fragments of random color and size.
The sum of the resulting node sizes is eq. to the size of the original instance

Let us see some eye candy. Use style animation or css transitions to make it look nice and nifty.
Add a "Shake" button that randomly moves elements
Add a "Drop" button that simulates a burst of gravity and drops instances on the "ground"
Find a way of dynamically using a text color for the px² size that still maintains a good contrast against the background color.

This is implemented using typescript which is over enginnered this project..
but to let you all know about typescript integration with canvas feature.

Use below link to understand Problem statement which is not proper but it helps you to get the feel about the project
http://jsfiddle.net/herat130/4dk5s98j/25/
