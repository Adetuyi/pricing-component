const bar = document.querySelector('.bar');
const bBefore = document.querySelector('.barBefore');
const slider = document.querySelector('.slider');
const viewDOM = document.querySelector('.view');
const priceDOM = document.querySelector('.price');
const checker = document.querySelector('.checker');
const discountDOM = document.querySelector('.discount');

//Systems
slider.addEventListener('drag', slide);
slider.addEventListener('dragstart', () => slider.classList.add('dragging'));
slider.addEventListener('dragend', () => slider.classList.remove('dragging'));

//Mobile phones
slider.addEventListener('touchmove', slide);
slider.addEventListener('touchstart', () => slider.classList.add('dragging'));
slider.addEventListener('touchend', () => slider.classList.remove('dragging'));

//Checkbox
checker.addEventListener('click', () => {
	toggleActive();

	if (checker.classList.contains('active')) {
		isDiscounted = true;
		sessionStorage.setItem('discount', true);
	} else {
		(isDiscounted = false), sessionStorage.removeItem('discount');
	}
	showDOMPrice(left, isDiscounted);
});

let isDiscounted = false;
let left = 0;

document.addEventListener('DOMContentLoaded', () => {
	let sLeft = sessionStorage.getItem('left');
	let sDiscount = sessionStorage.getItem('discount');

	if (sLeft) {
		left = sLeft;

		const sRect = slider.getBoundingClientRect();

		bBefore.style.width = `${left}%`;
		slider.style.left = `calc(${left}% - ${sRect.width / 2}px)`;
	}
	if (sDiscount) {
		isDiscounted = sDiscount;
		toggleActive();
	}

	showDOMPrice(left, isDiscounted);
});

function toggleActive() {
	checker.classList.toggle('active');
	discountDOM.classList.toggle('active');
}

function slide(e) {
	let cursor = e.x;
	if (e.type === 'touchmove') cursor = e.changedTouches[0].pageX;
	const bRect = bar.getBoundingClientRect();
	const sRect = slider.getBoundingClientRect();

	if (cursor !== 0) {
		left = Math.floor(((cursor - bRect.left) / bRect.width) * 100);

		//Contain the left
		if (left < 0) {
			left = 0;
		} else if (left > 100) {
			left = 100;
		}

		bBefore.style.width = `${left}%`;
		slider.style.left = `calc(${left}% - ${sRect.width / 2}px)`;

		sessionStorage.setItem('left', left);

		showDOMPrice(left, isDiscounted);
	}
}

function showDOMPrice(percent, discount) {
	let price, view;
	if (percent <= 20) {
		price = 8;
		view = '10k';
	} else if (percent > 20 && percent <= 40) {
		price = 12;
		view = '50k';
	} else if (percent > 40 && percent <= 60) {
		price = 16;
		view = '100k';
	} else if (percent > 60 && percent <= 80) {
		price = 24;
		view = '500k';
	} else {
		price = 36;
		view = '1M';
	}

	if (discount) price *= 0.75;

	viewDOM.textContent = view;
	priceDOM.textContent = `$${price}.00`;
}
