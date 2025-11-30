export default function animatePlaceholder(placeholders: string[]) {
	let current = 0;
	let display = $state('');
	let charIndex = 0;

	const text = placeholders[current];
	display = '';
	charIndex = 0;

	const interval = setInterval(() => {
		display = text.slice(0, charIndex + 1);
		charIndex++;
		if (charIndex === text.length) {
			clearInterval(interval);
			setTimeout(() => {
				current = (current + 1) % placeholders.length;
				animatePlaceholder();
			}, 1200);
		}
	}, 100);
}
