const getSelectedText = () => window.getSelection().toString();

const createSidebar = () => {
	const rootElement = document.createElement("div");
	rootElement.style.setProperty("all", "initial");

	const className = "sidebar";
	const width = 400;
	const rootShadow = rootElement.attachShadow({ mode: "closed" });
	const closePanel = () => {
		sidebar.style.setProperty("right", `${-width}px`);
	};
	const openPanel = () => {
		sidebar.style.setProperty("right", "0px");
	};

	rootShadow.innerHTML = `
        <style>
          .${className} {
            height: 100vh;
            width: ${width}px;
            position: fixed;
            top: 0px;
            background-color: white;
            transition: right 0.15s ease-in;
            transition-delay: 0.3s;
            z-index: ${Number.MAX_SAFE_INTEGER}
          }
        </style>
        <div class="${className}">
           <button id="close" onclick="${() => closePanel()}">Close</button>
           <p id="innerpar">
              ${getSelectedText()}
           </p>
        </div>
      `;
	const sidebar = rootShadow.querySelector(`.${className}`) as HTMLElement;
	closePanel();

	document.addEventListener("mouseup", (e) => {
		if (e.ctrlKey && getSelectedText().length > 0) {
			rootShadow.querySelector("#innerpar").innerHTML = getSelectedText();
			openPanel();
		}
	});

	return rootElement;
};

const main = () => {
	const rootElement = createSidebar();
	document.body.appendChild(rootElement);
};

main();
