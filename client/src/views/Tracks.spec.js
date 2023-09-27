import { screen, render } from '@testing-library/react';
import Tracks from './Tracks';
import store from '../store/store';
import { Provider } from 'react-redux';
import { tracks } from '../mocks/tracks';

describe('Tracks', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <Tracks tracks={tracks} />
      </Provider>
    );
  });

  describe('when a track is right clicked', () => {
    it('should show context menu with add to playlist when a track is right clicked', async () => {
      render(
        <Provider store={store}>
          <Tracks tracks={tracks} />
        </Provider>
      );

      const track = screen.getByTestId('track-0');
      track.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));

      const contextMenu = await screen.findByTestId('context-menu');
      expect(contextMenu).toBeInTheDocument();
      expect(contextMenu).toHaveTextContent('Add to playlist');
    });

    it('should show a modal to choose a playlist when add to playlist is clicked', async () => {
      render(
        <Provider store={store}>
          <Tracks tracks={tracks} />
        </Provider>
      );

      const track = screen.getByTestId('track-0');
      track.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));

      const addToPlaylist = await screen.findByText('Add to playlist');
      addToPlaylist.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      const selectPlaylistDropdown = await screen.findByTestId(
        'select-playlist-dropdown'
      );
      expect(selectPlaylistDropdown).toBeInTheDocument();
      expect(selectPlaylistDropdown).toHaveTextContent(
        '-- select an option --'
      );
    });

    // TODO:
    // add msw to mock API calls, then create tests to test the following:
    // - setup the test suite to populate the store with playlists
    // - when a playlist is selected, the track is added to the playlist store
    // - when a playlist is selected, an API call was made to add the track to the playlist
    // - when a playlist is selected, the modal is closed
    // - when a playlist is selected, the context menu is closed
  });
});
