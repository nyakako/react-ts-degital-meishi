import DOMPurify from "dompurify";

interface SanitizedComponentProps {
	html: string;
}

const DangerouslySanitizedComponent = ({ html }: SanitizedComponentProps) => {
	const sanitizedHtml = DOMPurify.sanitize(html);

	return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>;
};

export default DangerouslySanitizedComponent;
