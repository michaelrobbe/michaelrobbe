function Game() {

	this._dirt = new Element('dig', 'dirt');
	this._gold = new Element('gold', 'gold');
	this._depth = 0;

	/*DEBUG*/
	this._dirt._value = 200;
	this._dirt.update();
	this._gold._value = 10;
	this._gold.update();
	/*END DEBUG*/

	this.upgrades = [];
	this.upgrades.push(new Upgrade('shovel', this._dirt, 5, 10, this._gold));

	var sellDirt = document.querySelector('#dirt #sell');
	sellDirt.addEventListener('click', () => {
		this.trade(10, this._dirt, this._gold);
	});

	this.trade = function(price, element, buy) {
		console.log((element._value - price));
		if (element.afford(price)) {
			element.spend(price);
			buy.add();
		} else {
			announce('not enough ' + element.noun.id);
		}
	}

	var announce = function(msg) {
		console.log(msg);
	}
}

function Upgrade(noun, element, base_price, max_upgrade, gold) {

	this.noun = document.getElementById(noun + '_upgrade');
	this.noun.addEventListener('click', () => {
		if (gold.afford(this.getPrice())) {
			gold.spend(this.getPrice());
			element._level++;
			this.noun.innerHTML = `Upgrade Shovel lv.${element._level} (${this.getPrice()}g)`;
			// this.noun.hidden = true;
		};
	});

	this.getPrice = function() {
		console.log(base_price);
		return base_price * (element._level + 1);
	}
}

function Element(verb, noun) {
	this._value = 0;
	this._level = 0;

	if (verb != noun) {
		this.verb = document.getElementById(verb);
		this.verb.addEventListener('click', () => { this.add() });
	}
	this.noun = document.getElementById(noun);
	this.UIValue = this.noun.querySelector('.value');


	this.add = function() {
		this._value = this._value + 1 + (1 * this._level);
		this.update();
	}

	this.afford = function(amt) {
		if (this._value - amt >= 0) {
			return true;
		}
		return false;
	}

	this.spend = function(amt) {
		this._value = this._value - amt;
		this.update();
	}

	this.update = function() {
		this.UIValue.innerHTML = this._value;
	}
}