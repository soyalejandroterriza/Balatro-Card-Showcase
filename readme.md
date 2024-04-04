# Balatro Card Showcase

## What is this?

Balatro Card Showcase es un pequeño proyecto que he hecho para que los creadores de contenido descargable o **modders de Balatro** tengan una manera sencilla de **exponer las cartas de sus mods**.
Balatro Card Showcase is a small project that I have made downloadable content creators or **Balatro modders** have a simple way to expose the cards of their mods.

It is a completely local webpage that gets the information of the cards to display through a JSON.
A JSON is a easily editable file by anyone, that gathers the needed information, in this case of the cards to display. The images of the cards are stored in a specific folder.

## How to use with my cards

To use this template with your mods, download *"index.html" and "BCS_resources "* and include them in the folder of the Balatro downloadable content or mod you are going to share.

Dentro de la carpeta *BCS_resources>Card_pictures* se encuentran todas imágenes de las cartas que se van a mostrar. Te recomiendo que utilices el formato .webp o png y que las imágenes tengan unas dimensiones concrétamente de **142 x 190**.
Store the images of the cards to display in the folder *BCS_resources>Card_pictures*. I recommend that you use the .webp or png format and **142 x 190** resolution.

In BCS_resources>Code>cards.json is all the information of the cards that you will have to edit. There are many videos on the internet about how to write in JSON, but I think you will know how to do it just by looking at the file.



With very little or no HTML knowledge, you can also change the information displayed by the "Show info" button by modifying the index.html file on lines 153-159.
(```<h1></h1>``` are tags that wrap text, while ```<p></p>``` wrap paragraphs).
To change the title "Balatro Jokers" check the ```<span></span>``` with the pageTitle class on line 87 of index.html.






