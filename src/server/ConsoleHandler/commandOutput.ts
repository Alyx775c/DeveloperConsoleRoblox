import { Colors } from "./outputHandler";

export default class CommandOutput {
	public color: keyof typeof Colors;
	public content: string;

	constructor(content: string, color: keyof typeof Colors) {
		this.content = content;
		this.color = color;
	}

	getString(): string {
		return `<font color="${Colors[this.color]}">${this.content}</font>`;
	}
}
