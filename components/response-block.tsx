const ResponseBlock = ({ qa }: { qa: { q: string; a: string } }) => {
	return (
		<>
			<p className="input-text">
				<span className="input-header">input: </span>
				{qa.q}
			</p>
			<p className="output-text">
				<span className="output-header">output: </span>
				{qa.a}
			</p>
		</>
	);
};

export default ResponseBlock;
