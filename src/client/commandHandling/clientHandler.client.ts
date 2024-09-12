const RS = game.GetService("ReplicatedStorage");

const localPlayer = game.GetService("Players").LocalPlayer;
const playerGUI = localPlayer.WaitForChild("PlayerGui");

const getUI = RS.FindFirstChild("Events")?.FindFirstChild("GetUI");

if (getUI?.IsA("RemoteEvent")) {
	getUI.OnClientEvent.Connect((gui: Instance) => {
		wait(0.01);
		if (gui.IsA("ScreenGui")) {
			const TextInput = gui.WaitForChild("Console")?.WaitForChild("InputField")?.FindFirstChild("TextInput");

			if (TextInput?.IsA("TextBox")) {
				TextInput.FocusLost.Connect((enterPressed: boolean, _) => {
					if (enterPressed) {
						const event = RS.FindFirstChild("Events")?.FindFirstChild("DevConsoleFire");
						if (event?.IsA("RemoteFunction")) {
							event.InvokeServer(TextInput.Text);
						}

						TextInput.Text = "";
					}
				});
			}
		}
    });
	getUI.FireServer();
}
