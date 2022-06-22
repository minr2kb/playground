export default class Heap<T> {
	public heapArray: T[];
	public comparator: (a: T, b: T) => number;

	constructor(comparator: (a: T, b: T) => number) {
		this.heapArray = [];
		this.comparator = comparator;
	}

	private parent(idx: number) {
		return Math.ceil(idx / 2) - 1;
	}

	private leftChild(idx: number) {
		return 2 * idx + 1;
	}

	private rightChild(idx: number) {
		return 2 * idx + 2;
	}

	private swap(a: number, b: number) {
		[this.heapArray[a], this.heapArray[b]] = [
			this.heapArray[b],
			this.heapArray[a],
		];
	}

	size() {
		return this.heapArray.length - 1;
	}

	peek() {
		return this.heapArray[0];
	}

	clear() {
		this.heapArray = [];
	}

	addAll(elements: T[]) {
		elements.forEach(element => {
			this.push(element);
		});
	}

	push(value: T) {
		this.heapArray.push(value);
		let curIdx = this.heapArray.length - 1;
		let parIdx = this.parent(curIdx);

		// percolate up
		while (
			curIdx > 0 &&
			this.comparator(this.heapArray[parIdx], this.heapArray[curIdx]) > 0
		) {
			this.swap(parIdx, curIdx);
			curIdx = parIdx;
			parIdx = this.parent(curIdx);
		}
	}

	pop() {
		const min = this.heapArray[0];
		if (this.heapArray.length <= 1) this.heapArray = [];
		else {
			const popped = this.heapArray.pop();
			if (popped) this.heapArray[0] = popped;
		}

		let curIdx = 0;
		let leftIdx = this.leftChild(curIdx);
		let rightIdx = this.rightChild(curIdx);

		if (!this.heapArray[leftIdx]) return min;
		if (!this.heapArray[rightIdx]) {
			if (
				this.comparator(
					this.heapArray[leftIdx],
					this.heapArray[curIdx]
				) < 0
			) {
				this.swap(leftIdx, curIdx);
			}
			return min;
		}

		while (
			this.comparator(this.heapArray[leftIdx], this.heapArray[curIdx]) <
				0 ||
			this.comparator(this.heapArray[rightIdx], this.heapArray[curIdx]) <
				0
		) {
			const minIdx =
				this.comparator(
					this.heapArray[leftIdx],
					this.heapArray[rightIdx]
				) < 0
					? rightIdx
					: leftIdx;
			console.log(minIdx);
			this.swap(minIdx, curIdx);
			curIdx = minIdx;
			leftIdx = this.leftChild(curIdx);
			rightIdx = this.rightChild(curIdx);
			if (!this.heapArray[leftIdx]) return min;
			if (!this.heapArray[rightIdx]) {
				if (
					this.comparator(
						this.heapArray[leftIdx],
						this.heapArray[curIdx]
					) < 0
				) {
					this.swap(leftIdx, curIdx);
				}
				return min;
			}
		}

		return min;
	}
}
