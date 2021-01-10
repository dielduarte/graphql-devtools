import React from 'react';
import { styled } from 'stitches.config';
import { ReactComponent as GitHubIcon } from '../icons/github.svg';
import { ReactComponent as GearIcon } from '../icons/gear.svg';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { Divider } from 'core/ui/Divider';
import DarkModeToggle from 'react-dark-mode-toggle';
import { darkThemeClass } from 'stitches.config';
import { Sender, State } from 'xstate';
import { Tip } from 'core/ui/Tip';
import appJson from 'app.json';

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

interface HeaderLayoutProps {
  send: Sender<CoreEvents>;
  current: State<CoreContext, CoreEvents>;
}

function HeaderLayout({ send, current }: HeaderLayoutProps) {
  const [isDarkMode, setIsDarkMode] = React.useState(
    JSON.parse(localStorage.getItem('isDarkMode') ?? 'false'),
  );

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
        <Version>v{appJson.version}</Version>

        <Divider />

        <Link
          href="https://github.com/dielduarte/graphql-devtools"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute on GitHub
        </Link>
        <GitHubIcon />

        <Divider />

        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={40}
        />

        <Divider />

        {current.matches('core.openPreferences') ? (
          <Tip content="close preferences" placement="bottom">
            <Link href="#" onClick={() => send('CLOSE_PREFERENCES')}>
              <CloseIcon />
            </Link>
          </Tip>
        ) : (
          <Tip content="open preferences" placement="bottom">
            <Link href="#" onClick={() => send('OPEN_PREFERENCES')}>
              <GearIcon />
            </Link>
          </Tip>
        )}
      </Contribute>
    </Header>
  );
}

export default HeaderLayout;
