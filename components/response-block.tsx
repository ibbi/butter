const ResponseBlock = ({ qa }: { qa: { q: string; a: string } }) => {
	return (
		<>
			<p style={{ backgroundColor: "black", color: "white" }}>{qa.q}</p>
			<p style={{ backgroundColor: "white", color: "black" }}>{qa.a}</p>
		</>
	);
};

export default ResponseBlock;
