let input = document.querySelector(".input");
let inputAdd = document.querySelector(".box_top_add");
let listBox = document.querySelector(".box_bottom");

function addText() {
  if (input.value == 0) {
    alert("Write something!");
  } else {
    let textBox = document.createElement("div");
    textBox.classList.add("text_box");

    let text = document.createElement("p");
    text.classList.add("text_box_text");
    text.textContent = input.value;

    // let deleteBtn = document.createElement("div");
    // deleteBtn.classList.add("text_box_delete");
    // deleteBtn.textContent = "X";

    let deleteBtn = document.createElement("img");
    deleteBtn.classList.add("text_box_delete");
    deleteBtn.setAttribute("src", "pics/close.svg");

    // let editBtn = document.createElement("div");
    // editBtn.classList.add("text_box_edit");
    // editBtn.textContent = "+";

    let editBtn = document.createElement("img");
    editBtn.classList.add("text_box_edit");
    editBtn.setAttribute("src", "pics/edit.svg");

    deleteBtn.addEventListener("click", () => {
      listBox.removeChild(textBox);
    });

    editBtn.addEventListener("click", () => {
      let newText = prompt("Edit your text:", text.textContent);

      // if (newText == null) {
      //   alert("Write something!");
      // } else {
      //   text.textContent = newText;
      // }

      if (newText == null || newText.trim() == "") {
        alert("You cannot leave the note empty!");
        return;
      }
      if (newText.trim() == text.textContent.trim()) {
        alert("You didn't change anything!");
        return;
      }
      text.textContent = newText;
    });

    textBox.appendChild(text);
    textBox.appendChild(deleteBtn);
    textBox.appendChild(editBtn);
    listBox.appendChild(textBox);
    input.value = "";
  }
}

inputAdd.addEventListener("click", addText);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addText();
  }
});

// inputAdd.addEventListener("click", () => {
//   if (input.value == 0) {
//     alert("Write something!");
//   } else {
//     let textBox = document.createElement("div");
//     textBox.classList.add("text_box");

//     let text = document.createElement("p");
//     text.classList.add("text_box_text");
//     text.textContent = input.value;

//     let deleteBtn = document.createElement("div");
//     deleteBtn.classList.add("text_box_delete");
//     deleteBtn.textContent = "X";

//     let editBtn = document.createElement("div");
//     editBtn.classList.add("text_box_edit");
//     editBtn.textContent = "+";

//     deleteBtn.addEventListener("click", () => {
//       listBox.removeChild(textBox);
//     });

//     editBtn.addEventListener("click", () => {
//       let newText = prompt("Edit your text:", text.textContent);
//       if (newText.value == null) {
//         alert("Write something!");
//       } else {
//         text.textContent = newText;
//       }
//     });

//     textBox.appendChild(text);
//     textBox.appendChild(deleteBtn);
//     textBox.appendChild(editBtn);
//     listBox.appendChild(textBox);
//     input.value = "";
//   }
// });
