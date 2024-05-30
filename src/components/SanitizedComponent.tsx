import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface Props {
	html: string;
}

const SanitizedComponent = ({ html }: Props) => {
	const sanitizedHtml = DOMPurify.sanitize(html);

	return <>{parse(sanitizedHtml)}</>;
};

export default SanitizedComponent;
