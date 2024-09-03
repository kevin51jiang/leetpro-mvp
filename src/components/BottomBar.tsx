import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconVideo,
  IconVideoOff,
  IconFileText,
  IconPhoneOff,
  IconInfoCircle,
  IconMessage,
  IconLockFilled,
} from "@tabler/icons-react";
import { useBottomBarStore } from "../stores/bottomBarStore";

export const BottomBar = () => {
  const isMicOn = useBottomBarStore((state) => state.isMicOn);
  const isVideoOn = useBottomBarStore((state) => state.isVideoOn);
  const endCall = useBottomBarStore((state) => state.endCall);
  return (
    <Group
      p="md"
      style={{ borderTop: "1px solid #e0e0e0" }}
      justify="space-between"
      h="70px"
    >
      <Group>
        <div>LeetPro Free Demo</div>
      </Group>
      <Group>
        <Tooltip label="Mute microphone - Locked in Demo">
          <ActionIcon size="lg" variant="light" disabled>
            <div style={{ position: "relative" }}>
              {isMicOn ? <IconMicrophone /> : <IconMicrophoneOff />}
              <IconLockFilled
                size={16}
                color="red"
                style={{ position: "absolute", left: 4, top: 4 }}
              />
            </div>
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Turn off camera - Locked in Demo">
          <ActionIcon size="lg" variant="light" disabled>
            <div style={{ position: "relative" }}>
              {isVideoOn ? <IconVideo /> : <IconVideoOff />}
              <IconLockFilled
                size={16}
                color="red"
                style={{ position: "absolute", left: 4, top: 4 }}
              />
            </div>
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Send emoji reaction - Locked in Demo">
          <ActionIcon size="lg" variant="light" disabled>
            <div style={{ position: "relative" }}>
              <IconMessage />
              <IconLockFilled
                size={16}
                color="red"
                style={{ position: "absolute", left: 4, top: 4 }}
              />
            </div>
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Share document - Locked in Demo">
          <ActionIcon size="lg" variant="light" disabled>
            <div style={{ position: "relative" }}>
              <IconFileText />
              <IconLockFilled
                size={16}
                color="red"
                style={{ position: "absolute", left: 4, top: 4 }}
              />
            </div>
          </ActionIcon>
        </Tooltip>
        {/* <Menu>
          <Menu.Target>
            <ActionIcon size="lg" variant="light" disabled>
              <div style={{ position: "relative" }}>
                <IconDotsVertical />
                <IconLockFilled
                  size={16}
                  color="red"
                  style={{ position: "absolute", left: 4, top: 4 }}
                />
              </div>
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Settings</Menu.Item>
          </Menu.Dropdown>
        </Menu> */}
        <Button color="red" onClick={endCall}>
          <IconPhoneOff style={{ marginRight: "0.5rem" }} />
          <span>End call (get feedback)</span>
        </Button>
      </Group>
      <Group>
        <Tooltip label="Meeting details - Locked in Demo">
          <ActionIcon size="lg" variant="light" disabled>
            <div style={{ position: "relative" }}>
              <IconInfoCircle />
              <IconLockFilled
                size={16}
                color="red"
                style={{ position: "absolute", left: 4, top: 4 }}
              />
            </div>
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Toggle chat - Locked in Demo">
          <ActionIcon size="lg" variant="light" disabled>
            <div style={{ position: "relative" }}>
              <IconMessage />
              <IconLockFilled
                size={16}
                color="red"
                style={{ position: "absolute", left: 4, top: 4 }}
              />
            </div>
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};
