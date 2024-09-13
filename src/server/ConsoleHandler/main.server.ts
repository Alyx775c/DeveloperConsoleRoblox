import { Players, ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { OutputHandler } from "./outputHandler";
import Commands, { ValidPlayers } from "server/commands";
import CommandOutput from "./commandOutput";

const EventsFolder = ReplicatedStorage.FindFirstChild("Events");
const ConsoleAddedEvent = EventsFolder?.FindFirstChild("ConsoleAdded") as RemoteEvent;
const SendTextEvent = EventsFolder?.FindFirstChild("InputSending") as RemoteEvent;

function OnPlayer(player: Player) {
	if (ValidPlayers.includes(player.Name)) {
		let gui = ServerStorage.WaitForChild("ConsoleGui") as ScreenGui;
		gui.Parent = player.WaitForChild("PlayerGui");

		ConsoleAddedEvent.FireClient(player, gui);
	}
}

Players.PlayerAdded.Connect(OnPlayer);

function onTextEvent(player: Player, ...args: unknown[]) {
	const PlayerGui = player.WaitForChild("PlayerGui") as PlayerGui;
	const ConsoleGui = PlayerGui.FindFirstChild("ConsoleGui")?.FindFirstChild("Console");
	const ConsoleOutput = ConsoleGui?.FindFirstChild("TextFrame")?.FindFirstChild("TextOut") as TextLabel;

	const ConsoleWriter = new OutputHandler(ConsoleOutput);

	//#region Get command-name, and args
	let commandName: string;

	let stringArgs: string = args[0] as string;
	let splitArgs: string[] = stringArgs.split(" ");

	commandName = splitArgs[0].lower();
	splitArgs.shift();
	//#endregion

	if (Commands[commandName]) {
		ConsoleWriter.write(Commands[commandName](player, splitArgs));
	} else {
		ConsoleWriter.write(new CommandOutput("Unknown Command", "Red"));
	}
}

SendTextEvent.OnServerEvent.Connect(onTextEvent);
