import bars from "~assets/bars.svg";
import refresh from "~assets/refresh.svg";

const Footer = ({
	onClickRefresh,
	onClickComplexity,
	currComplexity,
}: {
	onClickRefresh: () => void;
	onClickComplexity: () => void;
	currComplexity: "Simple" | "Regular" | "Detailed";
}) => {
	return (
		<div id="footer">
			<button
				onClick={onClickRefresh}
				className="base-button footer-button"
				title="retry query">
				<div className="center-children">
					<img src={refresh} alt="refresh" />
				</div>
			</button>
			<button
				onClick={onClickComplexity}
				className="base-button footer-button"
				id="complexity-button"
				title="change detail level">
				<div
					className="center-children"
					style={{ justifyContent: "flex-start" }}>
					<img src={bars} alt="complexity level" />
					<p
						style={{
							color: "#c5c5c5",
							padding: "0px 0px 0px 4px",
							display: "inline",
						}}>
						{currComplexity}
					</p>
				</div>
			</button>
		</div>
	);
};

export default Footer;
