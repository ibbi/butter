const ResponseBlock = ({ qa }: { qa: { q: string; a: string } }) => {
	return (
		<>
			<p
				style={{
					backgroundColor: "#cccccc",
					color: "#323232",
					fontWeight: "bold",
					padding: "0.5rem",
				}}>
				{qa.q}
			</p>
			<p style={{ color: "#f0eaea" }}>{qa.a}</p>
		</>
	);
};

export default ResponseBlock;
