import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { FC } from "react";

interface Props {
	html: string;
}

const SanitizedComponent: FC<Props> = ({ html }) => {
	const sanitizedHtml = DOMPurify.sanitize(html);

	return <>{parse(sanitizedHtml)}</>;
};

export default SanitizedComponent;
