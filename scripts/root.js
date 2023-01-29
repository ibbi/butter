const getSelectedText = () => window.getSelection().toString();

document.addEventListener("mouseup", (e) => {
  if (e.ctrlKey && getSelectedText().length > 0) {
    console.log(getSelectedText());
  }
});
