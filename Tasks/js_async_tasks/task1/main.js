const btn = document.getElementById("addBtn");
const toast = document.getElementById("toast");

btn.addEventListener("click", () => {
  if (btn.disabled) return;

  btn.disabled = true;
  btn.textContent = "Adding...";
  btn.classList.add("loading");

  setTimeout(() => {
    btn.classList.remove("loading");
    btn.classList.add("added");
    btn.textContent = "Added!";

    toast.classList.add("show");

    setTimeout(() => {
      btn.classList.remove("added");
      btn.textContent = "Add to Cart";
      btn.disabled = false;

      toast.classList.remove("show");
    }, 2000);

  }, 3000);
});
