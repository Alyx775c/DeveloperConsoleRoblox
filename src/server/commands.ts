import { Players } from "@rbxts/services";
import CommandOutput from "./ConsoleHandler/commandOutput";

const ValidPlayers: string[] = [""];

const Commands: Record<string, (player: Player, args: string[]) => CommandOutput> = {
	ping: () => {
		return new CommandOutput("Pong!", "White");
	},
	walkspeed: (player: Player, args: string[]) => {
		if (args.size() > 2) {
			return new CommandOutput("Too many args", "Red");
		} else if (args.size() < 1) {
			return new CommandOutput("Not enough args", "Red");
		}

		if (args.size() === 2) {
			player = Players.FindFirstChild(args[0]) as Player;
			let humanoid = player.Character?.WaitForChild("Humanoid") as Humanoid;
			let speed = tonumber(args[1]);

			if (humanoid && typeIs(speed, "number")) {
				humanoid.WalkSpeed = speed;
			}

			return new CommandOutput(`Set ${player.Name}'s walkspeed to ${speed}`, "Green");
		} else {
			let humanoid = player.Character?.WaitForChild("Humanoid") as Humanoid;
			let speed = tonumber(args[0]);

			if (humanoid && typeIs(speed, "number")) {
				humanoid.WalkSpeed = speed;
			}

			return new CommandOutput(`Set your walkspeed to ${speed}`, "Green");
		}
	},
	kick: (_: Player, args: string[]) => {
		if (args.size() > 1) {
			return new CommandOutput("Too many args", "Red");
		} else if (args.size() < 1) {
			return new CommandOutput("Not enough args", "Red");
		}

		let target = Players.FindFirstChild(args[0]) as Player;
		target.Kick("Kicked by console");

		return new CommandOutput(`Kicked ${target.Name}`, "Green");
	},
};

export default Commands;
export { ValidPlayers };
