var canvasWidth, canvasHeight, scale;
var cols, rows;
var off, hOff;

function setup() {
  cols = 10;
  rows = 5;

  canvasWidth = windowWidth * .6;
  canvasWidth -= canvasWidth % cols;
  canvasHeight = canvasWidth * (rows / cols);
  scale = canvasWidth / cols;
  off = .2 * scale;

  var canvas = createCanvas(canvasWidth + off, canvasHeight + (2 * off * (rows / cols)));
  canvas.parent("Canvas");
  var canvasDiv = document.getElementById("Canvas");
  canvasDiv.style.width = "" + (canvasWidth + off) + "px";
  canvasDiv.style.height = "" + (canvasHeight + (2 * off * (rows / cols))) + "px";
  //console.log(canvasDiv);

  console.log("SETUP FINISHED");
}

function draw() {
  background(102, 238, 238);
  stroke(24);
  fill(24);

  translate(off / 2, off * (rows / cols));
  for (let i = 0; i < cols + 1; i++) {
    for (let j = 0; j < rows + 1; j++) {
      strokeWeight(0);
      circle(i * scale, j * scale, off);
    }
  }
  translate(-off / 2, -off * (rows / cols));
  
  strokeWeight(3);
  line(mouseX - (off / 1.5), mouseY, mouseX + (off / 1.5), mouseY);
  line(mouseX, mouseY - (off / 1.5), mouseX, mouseY + (off / 1.5));
}

//https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

function mousePressed(event) {
  if (event.target.nodeName === "CANVAS") {
    if (d1 != null) {
      if ((mouseX >= 2.75 * scale && mouseX <= (2.75 + 1.6) * scale) && (mouseY >= 2.85 * scale && mouseY <= (2.85 + .75) * scale)) {
        moveToFrom(players[turn].tile + d1 + d2, players[turn].tile);
        turn++;
        if (turn >= players.length) turn = 0;
        d1 = null;
        d2 = null;
      }
    }
    tiles.forEach(tile => {
      if (tile.smallBox != null) {
        if ((mouseX >= tile.smallBox.x * scale && mouseX <= (tile.smallBox.x + tile.smallBox.width) * scale) && (mouseY >= tile.smallBox.y * scale && mouseY <= (tile.smallBox.y + tile.smallBox.height) * scale)) {
          console.log(tile);
        }
      }
    });
  }
}