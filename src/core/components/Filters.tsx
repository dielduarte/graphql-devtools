import { Sender, State } from 'xstate';
import { styled } from 'stitches.config';
import { Button } from '../ui/Button';

const Container = styled('div', {
  paddingLeft: '$3',
  marginBottom: '$4',
});

interface FiltersProps {
  send: Sender<CoreEvents>;
  current: State<CoreContext, CoreEvents>;
}

function Filters({ send, current }: FiltersProps) {
  return (
    <Container>
      <Button active={current.matches('core.listingRequests.all')} onClick={() => send('SHOW_ALL')}>
        All
      </Button>
      <Button active={current.matches('core.listingRequests.queries')} onClick={() => send('FILTER_BY_QUERIES')}>
        Queries
      </Button>
      <Button active={current.matches('core.listingRequests.mutations')} onClick={() => send('FILTER_BY_MUTATIONS')}>
        Mutations
      </Button>
    </Container>
  );
}

export default Filters;
