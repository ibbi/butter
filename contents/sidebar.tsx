import iconBase64 from "data-base64:~assets/icon.png";
import cssText from "data-text:~/contents/sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

// Inject to the webpage itself
import "./sidebar-base.css";

export const config: PlasmoCSConfig = {
	matches: ["<all_urls>"],
	all_frames: true,
};

// Inject into the ShadowDOM
export const getStyle = () => {
	const style = document.createElement("style");
	style.textContent = cssText;
	return style;
};

export const getShadowHostId = () => "sidebar";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	document.addEventListener("mouseup", (e) => {
		if (e.ctrlKey && getSelectedText().length > 0) {
			setIsOpen(true);
		}
	});
	const getSelectedText = () => window.getSelection().toString();

	useEffect(() => {
		document.body.classList.toggle("sidebar-show", isOpen);
	}, [isOpen]);

	return (
		<div id="sidebar" className={isOpen ? "open" : "closed"}>
			{isOpen && (
				<button className="sidebar-toggle" onClick={() => setIsOpen(false)}>
					🟡 Close
				</button>
			)}
			<img src={iconBase64} alt="Extension Icon" width={128} height={128} />
			<p>{getSelectedText()}</p>
		</div>
	);
};

export default Sidebar;
