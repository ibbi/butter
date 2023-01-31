import cssText from "data-text:~/contents/sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

import completion from "~api";
import ResponseBlock from "~components/response-block";

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
	useEffect(() => {
		document.addEventListener("mouseup", (e) => {
			const currPrompt = getSelectedText();
			if (e.shiftKey && currPrompt.length > 0) {
				setQuestionAnswers((p) => [
					...p,
					{
						q: currPrompt,
						a: "Loading...",
					},
				]);
				setIsOpen(true);
				completion(currPrompt).then((a) => {
					console.log(a);
				});
			}
		});
	}, []);

	const [isOpen, setIsOpen] = useState(false);
	const [questionAnswers, setQuestionAnswers] = useState<
		Array<{ q: string; a: string }>
	>([]);

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
			{questionAnswers.map((qa) => {
				return <ResponseBlock qa={qa} key={qa.q} />;
			})}
		</div>
	);
};

export default Sidebar;
