import { Box, Card, Group, Radio, Text } from "@mantine/core";
import { LucideCheck } from "lucide-react";
import { PaymentOption } from "../types/PaymentOptions.type";

interface Props {
  option: PaymentOption,
  checked: boolean;
  onChange: (value: string) => void;
}

export default function PaymentOptionCard({ option, checked, onChange }: Props){
    const {icon: Icon, label, value} = option
  return (
    <Card
      withBorder
      padding="xs"
      radius="md"
      shadow="sm"
      style={(theme) => ({
        cursor: 'pointer',
        border: checked ? `2px solid ${theme.colors[theme.primaryColor][6]}` : undefined,
        backgroundColor: checked ? '#790fbf12' : theme.white,
        transition: 'border-color 150ms ease, background-color 150ms ease',
      })}
      onClick={() => onChange(value)}
    >
      <Card.Section p={2} pb={0}>
        <Group justify="space-between" align="center" style={{ minHeight: 40 }}>
          <Text fw={600} size="md">{label}</Text>
          {checked && (
            <LucideCheck size={20} color="green" />
          )}
        </Group>
      </Card.Section>
      <Card.Section withBorder mt={0} />
      <Box p={5} m={'auto'}>
          <Icon size={35} />
      </Box>
      <Radio
        value={option.value}
        style={{ opacity: 0, height: 0, margin: 0 }}
        tabIndex={-1} 
        checked={checked}
        onChange={() => onChange(option.value)}
      />
    </Card>
  );
};