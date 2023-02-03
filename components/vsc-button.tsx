const VscButton = ({
	icon,
	position,
	onClick,
	alt,
}: {
	icon: string;
	position: "top-right" | "bottom-right" | "top-left" | "bottom-left";
	onClick: () => void;
	alt: string;
}) => {
	return (
		<button onClick={onClick} className={`vsc-button ${position}`}>
			<img src={icon} alt={alt} />
		</button>
	);
};

export default VscButton;
