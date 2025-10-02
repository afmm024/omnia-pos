import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';

interface Props{
    label: string;
    stats: string;
    color: string;
    progress: number;
    icon: React.FC<any>;
}

export default function StatsRing({label, color, stats, progress, icon: Icon}: Props) {
    return (
      <Paper withBorder radius="md" p="xs" key={label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: progress, color: color }]}
            label={
              <Center>
                <Icon size={20} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {label}
            </Text>
            <Text fw={700} size="xl">
              {stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  };