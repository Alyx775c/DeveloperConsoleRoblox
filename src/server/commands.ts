import { Players } from "@rbxts/services";
import CommandOutput from "./ConsoleHandler/commandOutput";

const ValidPlayers: string[] = ["TheNewDragon75240"];

const GrepPlayerbyPartial = (name: string): Instance | undefined => {
    for (let player of Players.GetPlayers()) {	
		if (player.Name.sub(1, name.size()) === name)
		{
			return player;
		}
	}
};

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

		let target = GrepPlayerbyPartial(args[0]) as Player;

		if (target) {
			target.Kick();
			return new CommandOutput(`Kicked ${target.Name}`, "Green");
		} else {
			return new CommandOutput("Player not found", "Red");
		}
	},
	teleport: (plr: Player, args: string[]) => {
		if (args.size() > 2) {
			return new CommandOutput("Too many args", "Red");
		} else if (args.size() < 2) {
			return new CommandOutput("Not enough args", "Red");
		}

		const humanoid = plr.Character?.FindFirstChild("Humanoid") as Humanoid;
		const rootPart = humanoid.RootPart as BasePart;

		let posArr: number[] = [args[1] as unknown as number, args[2] as unknown as number];
		rootPart.Position = new Vector3(posArr[0], rootPart.Position.Y, posArr[1]);

		return new CommandOutput("idk", "White");
	},
};

export default Commands;
export { ValidPlayers };
