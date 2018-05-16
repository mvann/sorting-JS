var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

var list = new List(100);

var DRAW_X = 25;
var DRAW_Y = 300;
var SPACING_INCREMENT = 8;
var LINE_WIDTH = 4;

var KEY_B = 66;
var KEY_I = 73;
var KEY_J = 74;
var KEY_S = 83;

var INSTANT = true;

var REFRESH_RATE = 1;

var NONE = 0;
var INSERTION_METHOD = 1;
var SELECTION_METHOD = 2;
var BUBBLE_METHOD = 3;

var counter = 0;

window.requestAnimationFrame(loop);

function List(listLengthIn){

  this.currentIndex = undefined;
  this.searchIndex = undefined;
  this.savedIndex = undefined;
  this.swapped = false;
  this.algorithm = NONE;
  this.smallestIndex = undefined;

  this.elements = [];
  for(var i = 1; i <= listLengthIn; i ++){
    this.elements.push(i);
  }

  // this.instant = function(){
  //   while(this.algorithm !== NONE){
  //     this.update();
  //   }
  // };

  this.update = function(){
    if(this.algorithm === INSERTION_METHOD){
      this.insertion();
    }
    else if(this.algorithm === SELECTION_METHOD){
      this.selection();
    }
    else if(this.algorithm === BUBBLE_METHOD){
      this.bubble();
    }
  };

  this.insertion = function(){
    if(this.currentIndex === undefined) this.currentIndex = 0;

    if(this.currentIndex + 1 >= this.elements.length){
      this.finish();
    }
    else if(this.elements[this.currentIndex + 1] < this.elements[this.currentIndex]){
      if(this.savedIndex === undefined) this.savedIndex = this.currentIndex;
      this.elements = swap(this.elements, this.currentIndex, this.currentIndex+1);
      if(this.currentIndex > 0) this.currentIndex --;
      else this.currentIndex ++;
    }
    else {
      if(this.savedIndex === undefined){
        this.currentIndex ++;
      }
      else{
        this.currentIndex = this.savedIndex;
        this.savedIndex = undefined;
      }
    }
  };

  this.selection = function(){
    if(this.currentIndex === undefined) this.currentIndex = 0;
    if(this.searchIndex === undefined) this.searchIndex = 0;
    if(this.smallestIndex === undefined) this.smallestIndex = 0;
    // console.log(this.currentIndex + ', ' + this.searchIndex + ', ' + this.smallestIndex);
    if(this.elements[this.searchIndex] < this.elements[this.smallestIndex]){
      this.smallestIndex = this.searchIndex;
    }
    this.searchIndex++;
    if(this.searchIndex >= this.elements.length){
      this.elements = swap(this.elements, this.currentIndex, this.smallestIndex);
      this.currentIndex++;
      this.searchIndex = this.currentIndex;
      this.smallestIndex = this.currentIndex;
    }
    if(this.currentIndex >= this.elements.length){
      this.finish();
    }
  };

  this.bubble = function(){
    if(this.currentIndex === undefined)this.currentIndex = this.elements.length - 2;
    if(this.elements[this.currentIndex] > this.elements[this.currentIndex + 1]){
      this.elements = swap(this.elements, this.currentIndex, this.currentIndex + 1);
      this.swapped = true;
    }
    this.currentIndex --;
    if(this.currentIndex < 0){
      if(this.swapped === false){
        this.finish();
      }
      else{
        this.currentIndex = this.elements.length - 2;
        this.swapped = false;
      }
    }
  }

  this.shell = function(){
    if(this.currentIndex === undefined)this.currentIndex = this.elements.length - 2;
    if(this.elements[this.currentIndex] > this.elements[this.currentIndex + 1]){
      this.elements = swap(this.elements, this.currentIndex, this.currentIndex + 1);
      this.swapped = true;
    }
    this.currentIndex --;
    if(this.currentIndex < 0){
      if(this.swapped === false){
        this.finish();
      }
      else{
        this.currentIndex = this.elements.length - 2;
        this.swapped = false;
      }
    }
  }

  this.finish = function(){
    this.currentIndex = undefined;
    this.searchIndex = undefined;
    this.smallestIndex = undefined;
    this.swapped = false;
    this.algorithm = NONE;
    console.log("Finished Sorting!");
  };

  this.draw = function(){
    for(var i = 0; i < this.elements.length; i++){
      if(i === this.currentIndex ||
      i === this.searchIndex) {ctx.strokeStyle = 'black';}
      else ctx.strokeStyle = 'red';
      ctx.lineWidth = LINE_WIDTH;
      ctx.beginPath();
      ctx.moveTo(DRAW_X + SPACING_INCREMENT * i, DRAW_Y);
      ctx.lineTo(DRAW_X + SPACING_INCREMENT * i, DRAW_Y - this.elements[i]);
      ctx.stroke();
    }
  };

  this.shuffle = function(){
    for(var i = this.elements.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.elements[i];
      this.elements[i] = this.elements[j];
      this.elements[j] = temp;
    }
    drawEverything();
  };

}

document.addEventListener('keydown', function(evt){
  var keyCode = evt.keyCode;
  if(keyCode === KEY_S){
    list.shuffle();
  }
  else if(keyCode === KEY_I){
    list.algorithm = INSERTION_METHOD;
    console.log("Inserting");
  }
  else if(keyCode === KEY_J){
    list.algorithm = SELECTION_METHOD;
    console.log("Selecting");
  }
  else if(keyCode === KEY_B){
    list.algorithm = BUBBLE_METHOD;
    console.log("Bubbling");
  }
});

function loop(){
  if(counter % REFRESH_RATE === 0){
    runGame();
  }
  counter++;
  window.requestAnimationFrame(loop);
}

function runGame(){
  list.update();
  drawEverything();
}

function drawEverything(){
  clearCanvas();
  list.draw();
}

function clearCanvas(){
  ctx.clearRect(0, 0, c.width, c.height);
}

function swap(arr, i, j){
  var tempJ = arr[j];
  arr[j] = arr[i];
  arr[i] = tempJ;
  return arr;
}












// Screen Anchor
