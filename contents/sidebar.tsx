import cssText from "data-text:~/contents/sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useRef, useState } from "react";

import completion from "~api";
import close from "~assets/close.svg";
import ResponseBlock from "~components/response-block";
import VscButton from "~components/vsc-button";

// Inject to the webpage itself
import "./base.css";

export const config: PlasmoCSConfig = {
	matches: ["<all_urls>"],
	all_frames: true,
	css: ["font.css"],
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
	const bottomRef = useRef<HTMLDivElement>(null);

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
				completion(currPrompt).then((r) => {
					updateLoading(r.status === 200, r.data.choices[0].text);
				});
			}
		});
	}, []);

	useEffect(() => {
		document.body.classList.toggle("sidebar-show", isOpen);
	}, [isOpen]);

	useEffect(() => {
		console.log("scrolling");
		scrollToBottom();
	}, [questionAnswers]);

	const scrollToBottom = () => {
		bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
	};
	const getSelectedText = () => window.getSelection().toString();
	const updateLoading = (success, a) => {
		if (success) {
			setQuestionAnswers((p) => {
				const last = p[p.length - 1];
				return [...p.slice(0, p.length - 1), { ...last, a }];
			});
		} else {
			setQuestionAnswers((p) => {
				const last = p[p.length - 1];
				return [...p.slice(0, p.length - 1), { ...last, a: "Error" }];
			});
		}
	};

	return (
		<div id="sidebar" className={isOpen ? "open" : "closed"}>
			<VscButton
				onClick={() => setIsOpen(false)}
				alt="close"
				icon={close}
				position="top-right"
			/>
			<div id="scroll-wrapper">
				{questionAnswers.map((qa) => {
					return <ResponseBlock qa={qa} key={qa.q} />;
				})}
				<div ref={bottomRef} />
			</div>
		</div>
	);
};

export default Sidebar;
