// 1 means alive (dark), and 0 means dead (white).
const pattern = [
	[0, 1, 1, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[0, 1, 0, 0, 0, 1, 0],
	[0, 0, 1, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0],
];

const numberAnswer = [ 4, 42];
const passcodeAnswer = [4, 12345678];
const cardPasswords = ["alexisasiamark", "ravenasiamark", "password", "again", "4"];
const secretWord = "gratitude";

const libraryAddress = {
	hex: "the longest comment in the source code. (dont include the <!-- and -->, just the text in between)",
	wall: 3,
	shelf: 2,
	volume: 31,
	page: 39,
};

function drawBoard(board) {
	for (let row = 0; row < pattern.length; row++) {
		for (let column = 0; column < pattern[row].length; column++) {
			const cell = document.createElement("div");

			if (pattern[row][column] === 1) {
				cell.className = "cell on";
			} else {
				cell.className = "cell";
			}

			board.appendChild(cell);
		}
	}
}

drawBoard(document.getElementById("board"));
drawBoard(document.getElementById("coverArt"));

const card = document.getElementById("card");
const stage = document.querySelector(".stage");
const inside = document.getElementById("inside");
const toggleButton = document.getElementById("toggleBtn");
const secretButton = document.getElementById("secretTrigger");
const musicVideo = document.getElementById("musicVideo");
const videoHintArrow = document.getElementById("videoHintArrow");
const hintNote = document.getElementById("hintNote");
let passwordGateOpened = false;

function setCardOpen(isOpen) {
	card.classList.toggle("open", isOpen);
	stage.classList.toggle("is-open", isOpen);
	inside.inert = !isOpen;

	if (isOpen) {
		toggleButton.textContent = "Close";
	} else {
		toggleButton.textContent = "Open";
	}

	toggleButton.setAttribute("aria-expanded", String(isOpen));
	musicVideo.classList.toggle("hidden", !isOpen || passwordGateOpened);
	videoHintArrow.classList.toggle("hidden", !isOpen || passwordGateOpened);
	hintNote.classList.toggle("hidden", !isOpen || passwordGateOpened);
	secretButton.classList.toggle("hidden", isOpen);
}

function toggleCard() {
	setCardOpen(!card.classList.contains("open"));
}

function showPasswordGate() {
	passwordGateOpened = true;
	stage.classList.add("has-password-gate");
	document.getElementById("passwordGate").classList.remove("hidden");
	musicVideo.classList.add("hidden");
	setCardOpen(true);
	document.getElementById("passwordInput").focus();
}

function checkCardPassword() {
	const passwordInput = document.getElementById("passwordInput");
	const passwordMessage = document.getElementById("passwordMessage");

	if (cardPasswords.includes(passwordInput.value.trim())) {
		document.getElementById("passwordGate").classList.add("hidden");
		document.getElementById("puzzle").classList.remove("hidden");
		card.classList.add("wide");
		passwordMessage.textContent = "";
	} else {
		passwordMessage.textContent = "Incorrect password. Please try again.";
		passwordMessage.className = "msg bad";
		passwordInput.select();
	}
}

function checkFirstPuzzle() {
	const answer = Number(document.getElementById("answer").value);
	const message = document.getElementById("msg1");

	if (numberAnswer.includes(answer)) {
		message.className = "msg ok";
		document.getElementById("p1").classList.add("hidden");
		document.getElementById("p2").classList.remove("hidden");
	} else {
		message.textContent = "Not quite. try again.";
		message.className = "msg bad";
	}
}

function showLibraryPuzzle() {
	const passcode = Number(document.getElementById("num2").value);
	const message = document.getElementById("msg3");

	if (passcodeAnswer.includes(passcode)) {
		message.className = "msg ok";
		document.getElementById("aHex").textContent = libraryAddress.hex;
		document.getElementById("aWall").textContent = libraryAddress.wall;
		document.getElementById("aShelf").textContent = libraryAddress.shelf;
		document.getElementById("aVolume").textContent = libraryAddress.volume;
		document.getElementById("aPage").textContent = libraryAddress.page;
		document.getElementById("p2").classList.add("hidden");
		document.getElementById("p3").classList.remove("hidden");
	} else {
		message.textContent = "That number is not correct. Try again.";
		message.className = "msg bad";
	}
}

function unlockMessage() {
	const word = document.getElementById("word").value.trim().toLowerCase();
	const message = document.getElementById("msg2");

	if (word === secretWord) {
		document.getElementById("puzzle").classList.add("hidden");
		document.getElementById("message").classList.remove("hidden");
	} else {
		message.textContent = "That is not the word. Check the Library again.";
		message.className = "msg bad";
	}
}

toggleButton.addEventListener("click", toggleCard);
secretButton.addEventListener("click", showPasswordGate);
document.getElementById("passwordBtn").addEventListener("click", checkCardPassword);
document.getElementById("checkBtn").addEventListener("click", checkFirstPuzzle);
document.getElementById("mapBtn").addEventListener("click", showLibraryPuzzle);
document.getElementById("unlockBtn").addEventListener("click", unlockMessage);
