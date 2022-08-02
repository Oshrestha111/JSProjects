let input = document.getElementById("input");
let form = document.getElementById("form");
let list = document.getElementById("list");

form.addEventListener("submit", (e) => {
	document.getElementById("error").innerHTML = "";
	e.preventDefault();

	if (todo) {
		let li = document.createElement("li");
		li.textContent = todo;
		list.appendChild(li);

		li.addEventListener("click", () => {
			li.classList.toggle("done");
		});

		li.addEventListener("contextmenu", () => {
			li.remove();
		});

		li.addEventListener("dblclick", () => {
			input.value = todo;

			form.addEventListener("change", () => {
				let todos = input.value;
				li.textContent = todos;
				list.appendChild(li);
			});
		});

		input.value = "";
	} else {
		document.getElementById("error").innerHTML = " Write something";
	}
});
