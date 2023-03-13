// 配列作成
let cardPair = 4;
let cards = [];
let temporary = [];
for(let i = 0; i < cardPair; i++){
	temporary.push(i+1);
	temporary.push(i+1);
}
for(let i=cardPair*2; temporary.length > 0;i--){ 
	let r = Math.floor(Math.random()*i);
	cards[cardPair*2-i] = temporary[r];
	temporary.splice(r,1);
}

// カード作成
const panel = document.getElementById("panel");
for(let i=0; i<cardPair*2; i++){
	const elem = document.createElement("div")
	panel.appendChild(elem);
	panel.children[i].setAttribute("class","card back")
	panel.children[i].setAttribute("onclick",`reveal(${i})`);
}

// 裏の時だけ実行。めくった場所と数字を取得。取得済みの場合は比較。
let revealedPosi;
let revealedNum;
function reveal(cardPosi){
	if(panel.children[cardPosi].classList.contains("back") === true){
		panel.children[cardPosi].setAttribute("class","card");
		panel.children[cardPosi].textContent = cards[cardPosi];
		if(!revealedNum){
			revealedNum = panel.children[cardPosi].textContent;
			revealedPosi = cardPosi;
			return;
		}
		if(panel.children[cardPosi].textContent === revealedNum){
			score[player]++;
			p1.textContent = `player1:${score[1]}`;
			p2.textContent = `player2:${score[2]}`;
		}
	// 遅延してから透明or裏にするタイマー		
		setTimeout(function(){
			if(panel.children[cardPosi].textContent === revealedNum){
				panel.children[cardPosi].setAttribute("class","card finish");
				panel.children[revealedPosi].setAttribute("class","card finish");
				if(score[1]+score[2] === cardPair){
					alert("終了です");
					location.reload();
				}
			}else{
				panel.children[cardPosi].setAttribute("class","card back");
				panel.children[revealedPosi].setAttribute("class","card back");
				player === 2 ? player = 1 : player = 2;
				nextP.textContent = `次はplayer${player}の番です`;
				panel.children[cardPosi].textContent = null;
				panel.children[revealedPosi].textContent = null;
			}
			revealedNum = null;
		},400);
	}
}

// プレイヤー表示
let player = 1;
let score = {};
score[1] = 0;
score[2] = 0;
const nextP = document.getElementById("nextPlayer");
const p1 = document.getElementById("player1Point");
const p2 = document.getElementById("player2Point");
nextP.textContent = `次はplayer${player}の番です`;
p1.textContent = `player1:${score[1]}`;
p2.textContent = `player2:${score[2]}`;
