const fullRANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const easyRANKS = ['J', 'Q', 'K', 'A'];
const SUITS = ['C', 'D', 'H', 'S'];


function shuffleArray(array){
	for (let i = array.length - 1; i > 0; i--) {  
		// Generate random number  
		let j = Math.floor(Math.random() * (i + 1)); 
		let temp = array[i]; 
		array[i] = array[j]; 
		array[j] = temp; 
	} 
	return array; 
}

export function createCards(cardTotal) {
	const cards = [];
	let RANKS =[];
	cardTotal === 52 ? RANKS = fullRANKS 
					 : RANKS = easyRANKS;
	for (let rank of RANKS) {
		for (let suit of SUITS) {
			const card = rank+suit;
			cards.push(card);
		}
	}
	//return shuffleArray(cards);
	return cards; //don' shuffle for debug
}

