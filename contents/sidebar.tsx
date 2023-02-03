import cssText from "data-text:~/contents/sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useRef, useState } from "react";

import completion from "~api";
import close from "~assets/close.svg";
import Footer from "~components/footer";
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

const complexities = ["Simple", "Regular", "Detailed"];

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [questionAnswers, setQuestionAnswers] = useState<
		Array<{ q: string; a: string }>
	>([]);
	const [complexityIdx, setComplexityIdx] = useState<number>(1);

	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onMouseUp = (e) => {
			const currPrompt = getSelectedText();
			if (e.shiftKey && currPrompt.length > 0) {
				askQuestion(currPrompt, complexities[complexityIdx]);
				setIsOpen(true);
			}
		};
		document.addEventListener("mouseup", onMouseUp);
		return () => document.removeEventListener("mouseup", onMouseUp);
	}, [complexityIdx]);

	useEffect(() => {
		document.body.classList.toggle("sidebar-show", isOpen);
	}, [isOpen]);

	useEffect(() => {
		scrollToBottom();
	}, [questionAnswers]);

	const askQuestion = (q: string, complexity) => {
		setQuestionAnswers((p) => [
			...p,
			{
				q,
				a: "Loading...",
			},
		]);
		completion(q, complexity).then((r) => {
			updateLoading(r.status === 200, r.data.choices[0].text);
		});
	};

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
	const onClickRefresh = () => {
		const lastQ = questionAnswers[questionAnswers.length - 1].q;
		askQuestion(lastQ, complexities[complexityIdx]);
	};
	const onClickComplexity = () => {
		setComplexityIdx((p) => (p + 1) % complexities.length);
	};

	return (
		<div id="sidebar" className={isOpen ? "open" : "closed"}>
			<VscButton
				onClick={() => setIsOpen(false)}
				alt="close"
				icon={close}
				position="top-right"
			/>
			<Footer
				onClickRefresh={onClickRefresh}
				onClickComplexity={onClickComplexity}
				currComplexity={complexities[complexityIdx]}
			/>
			<div id="scroll-wrapper">
				{questionAnswers.map((qa) => {
					return <ResponseBlock qa={qa} key={qa.q} />;
				})}
				<div style={{ marginTop: "24px" }} ref={bottomRef} />
			</div>
		</div>
	);
};

export default Sidebar;
