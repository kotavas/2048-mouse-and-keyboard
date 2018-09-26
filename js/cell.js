class Cell{
	constructor(fieldElement, game){
		this.game = game;
		this.fieldElement = fieldElement;
		this.element = createAndAppend({
			className: 'cell',
			parentElement: fieldElement
		});

		if(Math.random() > 0.8){
			this.spawn();
		}
		//this.element.onclick = this.merge.bind(this);
	}

	get value(){
		return this._value || 0;
	}

	set value(value){
		this._value = value;
		this.element.innerHTML = value == 0? '' : value;
		this.element.setAttribute('cell-color', value);
	}

	clear(){
		this.value = '';
	}

	merge(cell){
		if(this.value){
			this.game.Rating(this.value + cell.value);	
		}
		new AnimateCell(cell, this);
		this.value += cell.value;
		cell.clear();
	}

	isSameTo(cell){
		return this.value == cell.value;
	}

	spawn(){
		this.value = Math.random() > 0.9 ? 4 : 2;
	}

	get isEmpty(){
		return this.value == 0;
	}
}

class AnimateCell{
	constructor(cell1, cell2){
		this.element = cell1.element.cloneNode(true);
		this.element.className = 'cell animate';
		
		this.element.style.top = cell1.element.offsetTop + 'px';
		this.element.style.left = cell1.element.offsetLeft + 'px';

		cell1.fieldElement.appendChild(this.element);

		this.element.style.top = cell2.element.offsetTop + 'px';
		this.element.style.left = cell2.element.offsetLeft + 'px';

		//setTimeout();

		setTimeout(function() {
			cell1.fieldElement.removeChild(this.element);
		}.bind(this), 1000);

		//cell2.element.offsetTop;
		//cell2.element.offsetLeft;

	}
}