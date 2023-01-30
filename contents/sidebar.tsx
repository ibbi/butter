import cssText from "data-text:~/contents/sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

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
	const [isOpen, setIsOpen] = useState(false);
	const [questionAnswers, setQuestionAnswers] = useState<
		Array<{ q: string; a: string }>
	>([]);
	console.log(questionAnswers);
	document.addEventListener("mouseup", (e) => {
		if (e.shiftKey && getSelectedText().length > 0) {
			setQuestionAnswers((p) => [
				...p,
				{
					q: getSelectedText(),
					a: "Answer",
				},
			]);
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
			{questionAnswers.map((qa) => {
				return <ResponseBlock qa={qa} key={qa.q} />;
			})}
		</div>
	);
};

export default Sidebar;
