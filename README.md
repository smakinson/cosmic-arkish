#Cosmic Ark-ish
This is a fun experiment using the Canvas publish target from Animate CC and mixing it with typescript and webpack. Feel free to poke around and see what is going on everything seems to be working out well. This game is based on the Atari&reg; classic Cosmic Ark&trade;. The game play is not inteded to be an exact recreation. Please do not use this code for any commercial product. If you see ways to improve the workflow, I'd love to hear from you.

###The main goal of this project was to:

* Use typescript 
* Use Animate CC as close to the way it was when working with Flash as possible
* Have a workflow as similar to working with Actionscript as possible while improving where possible

###Things accomplished so far

* Extending asset classes that are exported via the linkage id in the Animate CC Library
* Animation on both the timeline and via Greensock
* Mix in webpack to run things and keep the source compiled during dev

###Things to look into that I didnt think about upfront

* Is it possible to have a Library item that is dragged to the stage use my typescript class directly in the same manner it worked with Actionscript?


The intended home for the finished game is on my personal site: http://smakinson.github.io

###Game Play:

####Keyboard Option
Use the arrow keys to fire at meteors and move the saucer and the spacebar to beam up the aliens.

####Phone or tablet Option
My intent is to build an app or a webpage that can be used on a phone to control the game on my website. I will fill in the details here once I know what they are.

Original instructions found here: [http://www.gamesdatabase.org//Media/SYSTEM/Atari_2600/Manual/formated/Cosmic_Ark_-_1982_-_Imagic.pdf](http://www.gamesdatabase.org//Media/SYSTEM/Atari_2600/Manual/formated/Cosmic_Ark_-_1982_-_Imagic.pdf)