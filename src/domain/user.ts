export class User {
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public github_id: string,
		public qiita_id: string,
		public x_id: string,
		public skills: string[]
	) {
		this.github_id = `https://github.com/${github_id}`;
		this.qiita_id = `https://qiita.com/${qiita_id}`;
		this.x_id = `https://x.com/${x_id}`;
	}
}
