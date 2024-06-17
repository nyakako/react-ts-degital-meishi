import parse from "html-react-parser";
import { FC } from "react";

interface Props {
	html: string;
}

const SanitizedComponent: FC<Props> = ({ html }) => {
	// const sanitizedHtml = DOMPurify.sanitize(html);
	// return parse(sanitizedHtml);

	return parse(html);

	// 比較用
	// return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>;
};

export default SanitizedComponent;
