import React from 'react';
import { styled } from 'stitches.config';
import { ReactComponent as GitHubIcon } from '../icons/github.svg';
import { Divider } from 'core/ui/Divider';
import DarkModeToggle from 'react-dark-mode-toggle';
import { darkThemeClass } from 'stitches.config';

const Header = styled('header', {
  background: '$bg1',
  padding: '$3',
  boxShadow: 'inset 0px -1px 0px $bg3',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Title = styled('h1', {
  fontSize: '$1',
  color: '$bg4',
});

const Contribute = styled('h2', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '$1',
  fontWeight: '$bold',

  '> svg': {
    marginLeft: '$3',
  },
});

const Version = styled('span', {
  fontWeight: '$regular',
  color: '$bg4',
});

const Link = styled('a', {
  textDecoration: 'none',
  color: '$bg4',
  fontWeight: '$bold',
});

function HeaderLayout() {
  const [isDarkMode, setIsDarkMode] = React.useState(JSON.parse(localStorage.getItem('isDarkMode') ?? 'false'));

  React.useEffect(() => {
    const html = document.querySelector('body');

    if (isDarkMode) {
      html?.classList.add(darkThemeClass);
    } else {
      html?.classList.remove(darkThemeClass);
    }

    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <Header>
      <Title>GraphQl Devtools</Title>
      <Contribute>
        <Version>v0.0.7</Version>

        <Divider />

        <Link href="https://github.com/dielduarte/graphql-devtools" target="_blank" rel="noopener noreferrer">
          Contribute on GitHub
        </Link>
        <GitHubIcon />

        <Divider />

        <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={40} />
      </Contribute>
    </Header>
  );
}

export default HeaderLayout;
