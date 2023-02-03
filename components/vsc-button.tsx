const VscButton = ({
	icon,
	position,
	onClick,
	alt,
}: {
	icon: string;
	position: "top-right";
	onClick: () => void;
	alt: string;
}) => {
	return (
		<button onClick={onClick} className={`base-button vsc-button ${position}`}>
			<div className="center-children">
				<img src={icon} alt={alt} />
			</div>
		</button>
	);
};

export default VscButton;
