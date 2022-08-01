var id = "";

let input = document.getElementById("input");
let form = document.getElementById("form");
let lists = document.getElementById("lists");
let arr = getTodoData();
let edit = false;
// localStorage.clear();
showData();
form.addEventListener("submit", (e) => {
	e.preventDefault();
	let todo = input.value;
	console.log(id);

	if (todo == "") {
		document.getElementById("error").innerHTML = " Write something";
	} else if (edit) {
		const index = arr.findIndex((e) => e.id === id);
		arr[index].todo = todo;
		edit = false;
		input.value = "";
		setTodoData(arr);
		return showData();
	} else {
		const data = { id: Date.now(), todo };
		arr.push(data);
		input.value = "";
		setTodoData(arr);
		showData();
	}
});
function showData() {
	let html = "";

	if (arr.length > 0) {
		arr.forEach((element) => {
			html += `<li id='list'>${element.todo}<i class="fa fa-pencil" aria-hidden="true" onclick="editTodo(${element.id})"></i>&nbsp;<i class="fa fa-trash" onclick="deleteData(${element.id})" aria-hidden="true"></i></li>`;
			lists.innerHTML = html;
		});
	} else {
		html = "";
		lists.innerHTML = html;
	}
}

function editTodo(rid) {
	const index = arr.findIndex((e) => e.id === rid);
	input.value = arr[index].todo;

	edit = true;
	id = rid;
}
function deleteData(id) {
	// const index = arr.findIndex((e) => e.id === id);
	// arr.splice(index, 1);

	arr = arr.filter((e) => e.id !== id);

	// const newArray = arr.map((e) => {
	// 	return {
	// 		id: e.id,
	// 		todo: e.todo,
	// 		data: e.todo,
	// 	};
	// });
	// console.log(newArray);

	setTodoData(arr);
	showData();
}

function getTodoData() {
	const todos = JSON.parse(localStorage.getItem("todo"));
	return todos ? todos : [];
}

function setTodoData(setTodo) {
	localStorage.setItem("todo", JSON.stringify(setTodo));
}
