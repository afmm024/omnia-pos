import { useState } from 'react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './styles.module.css';
import { LucideChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface SubLink {
  label: string;
  link: string
}
interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  action?: string;
  links?: SubLink[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, action }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigation = useRouter();
  const pathname = usePathname()
  const isActive = action ? pathname.includes(action) : false;
  const items = (hasLinks ? links : []).map((link) => {
    const isActiveLink = pathname.includes(link.link)
    return <Text<'a'>
      component="a"
      className={`${classes.link} ${isActiveLink ? classes.active : ''}`}
      href={link.link}
      key={link.label}
    >
      {link.label}
    </Text>
  });

  return (
    <>
      <UnstyledButton onClick={() => action ? navigation.push(action) : setOpened((o) => !o)} className={`${classes.control} ${isActive ? classes.active : ''}`}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">
              <Text>{label}</Text>
            </Box>
          </Box>
          {hasLinks && (
            <LucideChevronRight
              className={classes.chevron}
              strokeWidth={1.5}
              size={16}
              style={{ transform: (opened) ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}