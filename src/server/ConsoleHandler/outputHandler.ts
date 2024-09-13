import CommandOutput from "./commandOutput";

export class OutputHandler {
	private label: TextLabel;

	constructor(OutputTextLabel: TextLabel) {
		this.label = OutputTextLabel;
	}

	write(commandOutput: CommandOutput): void {
		if (this.label.Text.size() === 0) {
			this.label.Text = "Welcome to Alyx's Console! \n";
			this.label.Text += commandOutput.getString();
		} else {
			this.label.Text += `\n${commandOutput.getString()}`;
		}
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
