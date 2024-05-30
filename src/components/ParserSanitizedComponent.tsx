import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface SanitizedComponentProps {
	html: string;
}

const ParserSanitizedComponent = ({ html }: SanitizedComponentProps) => {
	const sanitizedHtml = DOMPurify.sanitize(html);

	return <div>{parse(sanitizedHtml)}</div>;
};

export default ParserSanitizedComponent;
