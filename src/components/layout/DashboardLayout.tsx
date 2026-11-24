
import type { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

interface DashboardLayoutProps {
  children: ReactNode;
  isMobile: boolean;
}

export default function DashboardLayout({
  children,
  isMobile,
}: DashboardLayoutProps) {

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        maxWidth: 1440,
        minHeight: '100vh',
        mx: 'auto',
        px: isMobile ? 2 : 3,
        py: isMobile ? 2 : 3,
      }}
    >
      <Stack spacing={2}>
        {children}
      </Stack>
    </Container>
  );
}
