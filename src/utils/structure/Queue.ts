export default class Queue<T> {
	public queueArray: T[];

	constructor() {
		this.queueArray = [];
	}

	size() {
		return this.queueArray.length;
	}

	peek() {
		return this.queueArray[this.queueArray.length - 1];
	}

	clear() {
		this.queueArray = [];
	}

	addAll(elements: T[]) {
		elements.forEach(element => {
			this.push(element);
		});
	}

	push(value: T) {
		this.queueArray = [value, ...this.queueArray];
	}

	pop() {
		return this.queueArray.pop();
	}
}
