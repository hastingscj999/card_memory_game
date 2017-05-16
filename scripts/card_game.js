/* iterator that tracks the number of cards that are face up */
var count = 0;
/* stores the values of face-up cards for comparison */
var openCards = [];

/* generates 12 cards and stores them as objects with DOM content and values */
function generateCards(){
	var subList = [];
	for (var i = 0; i < 12; i++){
		var card = document.createElement('div');
		card.style.width = 100;
		card.style.height = 144;
		card.style.backgroundImage = "url(images/card-down.jpg)";
		card.style.backgroundSize = "cover";
		card.style.borderRadius = "8px";
		card.style.position = "absolute";
		card.style.float = "left";
		card.style.cursor = "pointer";
		card.style.textAlign = "center";
		card.style.boxSizing = "border-box";
		card.classList.add(i + 1);
		card.classList.add("inactive");
		var item = {
			content: card,
			value: i + 1
		}
		subList.push(item);
	}	
	return subList;
}

/* joins 2 copies of the 12 card objects */
var cards = generateCards().concat(generateCards());

/* randomizes the final array */
cards.sort(function(){return 0.5 - Math.random()});



for (var j in cards){
	/* renders card elements in DOM */
	document.body.appendChild(cards[j].content);
	
	/* absolutely positions cards in grid */
	var cardLeft, cardTop;
	if (j < 8){
		cardLeft = (j * 100) + 12;
		cardTop = 12;
	} else if (j >=8 && j < 16){
		cardLeft = ((j-8) * 100) + 12;
		cardTop = 160;
	} else if (j >= 16){
		cardLeft = ((j-16) * 100) + 12;
		cardTop = 316;
	}
	cards[j].content.style.left = cardLeft;
	cards[j].content.style.top = cardTop;

	/* manages card behavior */
	cards[j].content.onclick = function(ev){
		var el = ev.target;
		/* detects that cards can still be turned and current card is inactive */
		if (count < 2 && el.classList[1] === "inactive"){
			/* iterate count */
			count++;
			/* add open card value to comparator array */
			openCards.push(el.classList[0]);
			/* toggle card class */
			el.classList.add("active");
			el.classList.remove("inactive");
			/* restyle card and display value */
			el.style.backgroundImage = "";
			el.style.border = "solid 1px #152b4f";
			el.innerHTML = "<p class='data' id=''>" + el.classList[0] + "</p>";
			/* if comparator array has 2 equal values, remove open cards */
			if (openCards[0] === openCards[1]){
				function removeCards(){
					var candidates = document.getElementsByClassName(el.classList[0]);
					var k = candidates.length;
					/* delay removal so that user briefly can see both matching face-up cards */
					setTimeout(function(){
						while (k--){
							if (candidates[k].classList && candidates[k].classList[0] === openCards[0]){
								document.body.removeChild(candidates[k]);
							}	
						}
						/* reset open card values and iterator */
						openCards = [];
						count = 0;
					}, 500);		
				}
				removeCards();
				var els = document.getElementsByClassName("inactive");
				/* display winning message if all cards have been removed */
				if (els.length === 0){
					var congrats = document.createElement("div");
					congrats.id = "congrats";
					congrats.innerHTML = "<div id='winner'>Congrats! You've won.</div>";
					document.body.appendChild(congrats);					
				}				
			} 
		} else {
			/* revert card to inactive, face-down state */
			if (el.style.classList[1] === "active"){
				count--;
				var index = openCards.indexOf(el.classList[0]);
				openCards.splice(index, 1);		
				el.innerHTML = "";
				el.style.backgroundImage = "url(images/card-down.jpg)";
				el.style.border = "";
				el.classList.add("inactive");
				el.classList.remove("active");
			}
		}
	}
}
