const RS = game.GetService("ReplicatedStorage");
const SS = game.GetService("ServerStorage");

const GetUIEvent = RS.FindFirstChild("Events")?.FindFirstChild("GetUI");

if (GetUIEvent?.IsA("RemoteEvent")) {
	GetUIEvent.OnServerEvent.Connect((plr: Player) => {
		if (plr.Name === "TheNewDragon75240") {
            const gui = SS.WaitForChild("ScreenGui").Clone();
			gui.Parent = plr.WaitForChild("PlayerGui");
            GetUIEvent.FireClient(plr, gui);
		}
	});
}
