import {UserInputService as InputService, StarterGui} from '@rbxts/services';

InputService.InputBegan.Connect((a) => {
	if (a.UserInputType === Enum.UserInputType.Keyboard && a.KeyCode === Enum.KeyCode.F9) {
		StarterGui.SetCore("DevConsoleVisible", false);
	}
});