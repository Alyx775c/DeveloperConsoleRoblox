/*
local InputService  = game:GetService'UserInputService'
local StarterGui    = game:GetService'StarterGui'
InputService.InputBegan:connect(function(a)
   if a.UserInputType == Enum.UserInputType.Keyboard and a.KeyCode == Enum.KeyCode.F9 then
       StarterGui:SetCore('DevConsoleVisible', false)
   end
end)
*/

import {UserInputService as InputService, StarterGui} from '@rbxts/services';

InputService.InputBegan.Connect((a) => {
	if (a.UserInputType === Enum.UserInputType.Keyboard && a.KeyCode === Enum.KeyCode.F9) {
		StarterGui.SetCore("DevConsoleVisible", false);
	}
});
