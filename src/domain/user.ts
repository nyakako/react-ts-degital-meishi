export class User {
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public github_id: string | null,
		public qiita_id: string | null,
		public x_id: string | null,
		public skills: string[]
	) {
		this.github_id = github_id ? `https://github.com/${github_id}` : null;
		this.qiita_id = qiita_id ? `https://qiita.com/${qiita_id}` : null;
		this.x_id = x_id ? `https://x.com/${x_id}` : null;
	}
}
