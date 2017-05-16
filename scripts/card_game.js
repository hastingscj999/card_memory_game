
var cards = [];
var count = 0;
var openCards = [];

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

var cards = generateCards().concat(generateCards());
cards.sort(function(){return 0.5 - Math.random()});

for (var j in cards){
	document.body.appendChild(cards[j].content);
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
	cards[j].content.onclick = function(ev){
		var el = ev.target;
		if (count < 2 && el.style.backgroundImage !== ""){
			count++;
			openCards.push(el.classList[0]);
			el.classList.add("active");
			el.classList.remove("inactive");
			el.style.backgroundImage = "";
			el.style.border = "solid 1px #152b4f";
			el.innerHTML = "<p class='data' id=''>" + el.classList[0] + "</p>";
			if (openCards[0] === openCards[1]){
				function removeCards(){
					var candidates = document.getElementsByClassName(el.classList[0]);
					var k = candidates.length;
					setTimeout(function(){
						while (k--){
							if (candidates[k].classList && candidates[k].classList[0] === openCards[0]){
								document.body.removeChild(candidates[k]);
							}	
						}
						
						openCards = [];
						count = 0;
					}, 500);		
				}
				removeCards();
				var els = document.getElementsByClassName("inactive");
				if (els.length === 0){
					var congrats = document.createElement("div");
					congrats.id = "congrats";
					congrats.innerHTML = "<div id='winner'>Congrats! You've won.</div>";
					document.body.appendChild(congrats);					
				}				
			} 
		} else {
			if (el.style.backgroundImage === ""){
				count--;
				var index = openCards.indexOf(el.classList[0]);
				openCards.splice(index, 1);
				// if (el.tagName === "DIV"){
					el.innerHTML = "";
					el.style.backgroundImage = "url(images/card-down.jpg)";
					el.style.border = "";
					el.classList.add("inactive");
					el.classList.remove("active");
				// }
			}
		}
	}
}
