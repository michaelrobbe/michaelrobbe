document.mrr = {
	epoch: {}
};
let e = document.mrr.epoch;
e.version = 0.1;
e.Epoch = (date) => {
	this.date = new Date(date).getTime();
}
e.now = () => {
	return new Date().getTime() - this.date
};
e.timestamp = () => {
	return ((e.now()/8640)/10000).toFixed(4);
};

// 32*32 (1024 boxes) @ 10px, 1d:3m:27s
let base = 32;
let size = 10;

e.visualTickClock = () => {
  let now, eTick, c, d;
  // document.body.innerText = "";
  d = document.createElement('div');
  d.id = 'd';
  d.style = 'position:absolute; top: 0; right: 0; background-color:rgba(0,0,0,0.5)';
  document.body.appendChild(d);
  c = document.createElement('canvas');
  c.id = 'c';
  c.width = (base*size)+1;
  c.height = (base*size)+1;
  document.getElementById('d').appendChild(c);
  document.body.style.overflow = 'hidden';

  c_canvas = document.getElementById("c");
  context = c_canvas.getContext("2d");
  context.fillStyle = 'white';
  makeGrid(size, base);

  // 1/1000th day ticks
  setInterval(() => {
    now = new Date();
    eTick = Math.floor((((now.getHours()*60)+now.getMinutes()*1)*60)/86.4);
    context.fillRect((eTick%base)*size, Math.floor(eTick/base)*size, size, size);
  }, 8640);
};

makeGrid = (boxSize, base) => {
  width = (base * boxSize) + 1;
  height = (base * boxSize) + 1;

  for (var x = 0.5; x < width; x += boxSize) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }

  for (var y = 0.5; y < height; y += boxSize) {
    context.moveTo(0, y);
    context.lineTo(width-1, y);
  }

  context.moveTo(0,0);
  context.strokeStyle = "#bbb";
  context.stroke();
}

let tickTime = (e) => {
  var x = Math.floor(e.layerX/size);
  var y = Math.floor(e.layerY/size);
  var num = (y*base) + x + 1;

  var xnum = Math.floor(num * 86.4);
  xnum = xnum / 3600;
  xh = Math.floor(xnum);
  xm = ((xnum - xh) * 60).toFixed(2);
  xs = Math.floor((xm - Math.floor(xm)) * 60);
  xm = Math.floor(xm);
  xnum = xh + ':' + xm + ':' + xs;

  console.log(x, y);
  console.log(num, xnum);
  return num;
}

document.body.addEventListener('click', (e) => { tickTime(e); });

e.duration = (t = '') => {
	if (!t) {
		var t = prompt('24H timecode (E.G. 23:59)', '15:55');
	}
	t = t.split(':');
	return 'eX:' + Math.floor((((t[0]*60)+t[1]*1)*60)/8.64);
};
e.tabClock = () => {
	document.title = e.timestamp();
	let i = setInterval(() => {
		document.title = e.timestamp();
	}, 8640);
};
e.tabCountdown = (t = '') => {
	if (!t) {
		let t = prompt('countdown', '15:55');
	}
	t = t.split(':');
	t = new Date().setHours(t[0],t[1]);
	document.title = ((((new Date().getTime()*-1)+ t)/(86400000))).toFixed(4);
	let i =	setInterval(() => {
		document.title = ((((new Date().getTime()*-1)+ t)/(86400000))).toFixed(4);
	}, 8640);
};
