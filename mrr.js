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

e.visualTickClock = () => {
	let now, eTick, boxes;
	document.body.innerText = "";

	const sheet = document.querySelectorAll('style')[0].sheet;
	sheet.insertRule('div { display: inline-flex;width: 1vw;height: 1vw;margin: -0.5px;border: 0.5px solid black;background: white; }');
	sheet.insertRule('body, html { display: flex; flex-wrap: wrap; padding: 0 !important; }');
	sheet.insertRule('.a ~ div { background: transparent; }');
	sheet.insertRule('.a { background: purple !important; }');

	for (var i = 0; i < 1000; ++i) {
		let el = document.createElement('div');
		el.dataset.i = i;
		document.body.appendChild(el);
	}
	boxes = [...document.querySelectorAll('div')];
	setInterval(() => {
		now = new Date();
		eTick = Math.floor((((now.getHours()*60)+now.getMinutes()*1)*60)/86.4);
		boxes[eTick].className = "a";
	}, 8640);
};
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