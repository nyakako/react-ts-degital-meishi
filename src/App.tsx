import DangerouslySanitizedComponent from "./components/DangerouslySanitizedComponent";
import SanitizedComponent from "./components/SanitizedComponent";

function App() {
	const testInputs = [
		"<script>alert('XSS');</script>",
		'<img src="x" onerror="alert(\'XSS\')" />',
		"<a href=\"javascript:alert('XSS')\">Click me</a>",
		"<div style=\"background: url(javascript:alert('XSS'))\">Test</div>",
		"<<script>alert('XSS');//</script>",
	];

	return (
		<>
			<h2>Sanitization Test</h2>
			{testInputs.map((input, index) => (
				<div key={index}>
					<h3>Test {index + 1}</h3>
					<DangerouslySanitizedComponent html={input} />
					<SanitizedComponent html={input} />
				</div>
			))}
			
		</>
	);
}

export default App;
