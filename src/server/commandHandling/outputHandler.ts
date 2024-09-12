export class OutputWriter {
	private textOut: TextLabel;
	private colors: typeof Colors;

	constructor(textOutput: TextLabel, colors: typeof Colors) {
		this.textOut = textOutput;

		this.colors = colors;
	}

	/**
	 * write
	 */
	public write(commandOut: CommandOutput) {
		let formattedText = commandOut.getText();

		/*
		if (color !== "None") {
			const colorValue = this.colors[color];
			print(colorValue);
			formattedText = `<font color="${colorValue}">${text}</font>`;
			print(formattedText);
		}*/

		if (this.textOut.Text.size() <= 1) {
			this.textOut.Text = formattedText;
		} else {
			this.textOut.Text = this.textOut.Text + "\n" + formattedText;
		}
	}
}

export class CommandOutput {
	private colors: typeof Colors;
	private color: keyof typeof Colors;
	private content: string;

	constructor(text: string, color: keyof typeof Colors, colors: typeof Colors = Colors) {
		this.colors = colors;
		this.color = color;

		this.content = text;
	}

	public getText(): string {
		return `<font color="${this.colors[this.color]}">${this.content}</font>`;
	}
}

export enum Colors {
	Red = "#FF0000",
	Green = "#00FF00",
	Blue = "#0000FF",
	Yellow = "#FFFF00",
	Cyan = "#00FFFF",
	Magenta = "#FF00FF",
	White = "#FFFFFF",
	Black = "000000",
	None = "",
}
