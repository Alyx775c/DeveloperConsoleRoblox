import Commands from "server/commandRegistry";
import { Colors, CommandOutput, OutputWriter } from "./outputHandler";

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const Events = ReplicatedStorage.FindFirstChild("Events");
const DevConsoleFire = Events?.FindFirstChild("DevConsoleFire");

if (DevConsoleFire?.IsA("RemoteFunction")) {
	DevConsoleFire.OnServerInvoke = (player: Player, ...args: unknown[]) => {
		const playerGUI = player.WaitForChild("PlayerGui");
		const DevConsoleGUI = playerGUI.FindFirstChild("ScreenGui")?.FindFirstChild("Console");
		const TextOutput = DevConsoleGUI?.FindFirstChild("TextOut")?.FindFirstChild("TextLabel");

		if (TextOutput?.IsA("TextLabel")) {
			const outputHandler = new OutputWriter(TextOutput, Colors);

			let commandName: string;

			let stringArgs = args[0] as string;
			let splitSpaceArgs = stringArgs.split(" ");

			commandName = splitSpaceArgs[0].lower();
			splitSpaceArgs.shift();

			if (Commands[commandName]) {
				outputHandler.write(Commands[commandName](splitSpaceArgs).unwrap());
			} else {
				outputHandler.write(new CommandOutput("Unknown Command!", "Red"));
			}
		}
	};
}
