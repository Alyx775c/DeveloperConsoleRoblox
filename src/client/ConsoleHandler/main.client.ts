import { ReplicatedStorage } from "@rbxts/services";

const EventsFolder = ReplicatedStorage.FindFirstChild("Events");
const ConsoleAddedEvent = EventsFolder?.FindFirstChild("ConsoleAdded") as RemoteEvent;
const SendTextEvent = EventsFolder?.FindFirstChild("InputSending") as RemoteEvent;

ConsoleAddedEvent.OnClientEvent.Connect((gui: ScreenGui) => {
	const InputBox = gui.WaitForChild("Console").FindFirstChild("InputField")?.FindFirstChild("TextInput") as TextBox;

	InputBox.FocusLost.Connect((enterPressed: boolean, _) => {
		if (enterPressed) {
			const { Text } = InputBox;
			InputBox.Text = "";

            SendTextEvent.FireServer(Text)
		}
	});
});
