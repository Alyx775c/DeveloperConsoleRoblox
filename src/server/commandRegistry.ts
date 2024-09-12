import { Result } from "./commandHandling/errorHandler";
import { CommandOutput } from "./commandHandling/outputHandler";

let players = game.GetService("Players");

const Commands: Record<string, (args: string[]) => Result<CommandOutput>> = {
	ping: (args: string[]): Result<CommandOutput> => {
		return new Result<CommandOutput>(new CommandOutput("pong", "White"));
	},
	test_args: (args: string[]): Result<CommandOutput> => {
		return new Result<CommandOutput>(new CommandOutput(args[0], "White"));
	},
	kick: (args: string[]): Result<CommandOutput> => {
		if (args.size() < 1) {
			return new Result<CommandOutput>(new CommandOutput("Error! No input", "Red"));
		} else if (args.size() > 2) {
			return new Result<CommandOutput>(new CommandOutput("Error! Too many arguments", "Red"));
		}

		const player = players.FindFirstChild(args[0]);

		if (!player) {
			return new Result<CommandOutput>(new CommandOutput("Player not found", "Red"));
		}

		if (player.IsA("Player")) {
			if (args[2]) {
				player.Kick(args[2]);
			} else {
				player.Kick();
			}

			return new Result<CommandOutput>(
				new CommandOutput("Player : " + args[0] + " has been successfully kicked", "White"),
			);
		} else {
			return new Result<CommandOutput>(new CommandOutput("Player : " + args[0] + " isn't a player.", "Red"));
		}
	},
	walkspeed: (args: string[]): Result<CommandOutput> => {
		if (args.size() < 2) {
			return new Result<CommandOutput>(new CommandOutput("Error! No input", "Red"));
		} else if (args.size() > 2) {
			return new Result<CommandOutput>(new CommandOutput("Error! Too many arguments", "Red"));
		}

		if (players.FindFirstChild(args[0])) {
			const plr = players.FindFirstChild(args[0]) as Player;
			const char = plr.Character;
			if(char) {
				const humanoid = char.WaitForChild("Humanoid") as Humanoid;
				if (humanoid) {
					humanoid.WalkSpeed = args[1] as unknown as number;
					return new Result<CommandOutput>(new CommandOutput("Walkspeed set to " + args[1], "White"));
				}
			}
		}
		else {
			return new Result<CommandOutput>(new CommandOutput("Player not found", "Red"));
		}

		return new Result<CommandOutput>(new CommandOutput("Error", "Red"));
	},
	help: (args: string[]): Result<CommandOutput> => {
		return new Result<CommandOutput>(
			new CommandOutput(
				`All available commands:
			Kick(player, ?reason): Kicks a player specified in arg 1
			Walkspeed(player, speed): Sets walkspeed of player`,
				"White",
			),
		);
	},
};

export default Commands;
