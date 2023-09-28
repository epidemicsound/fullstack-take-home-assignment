import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tracks from './Tracks';
import store from '../store/store';
import { Provider } from 'react-redux';
import { tracks } from '../mocks/tracks';
import { setPlaylists } from '../store/actions';
import { playlists } from '../mocks/playlists';

describe('Tracks', () => {
  const user = userEvent.setup();

  beforeAll(async () => {
    await store.dispatch(setPlaylists()).unwrap();
  });

  it('renders the list of tracks correctly', () => {
    render(
      <Provider store={store}>
        <Tracks tracks={tracks} />
      </Provider>
    );

    const trackElements = screen.getAllByTestId(/track-(\d)/);
    expect(trackElements).toHaveLength(tracks.length);
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
      playlists.forEach(playlist => {
        expect(selectPlaylistDropdown).toHaveTextContent(playlist.name);
      });
    });

    it('add track to playlist store when a playlist is selected', async () => {
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
      selectPlaylistDropdown.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );

      await userEvent.selectOptions(
        selectPlaylistDropdown,
        screen.getByRole('option', {
          name: playlists[0].name
        })
      );

      expect(
        screen.getByRole('option', { name: playlists[0].name }).selected
      ).toBeTruthy();

      const okayButton = screen.getByRole('button', { name: 'Okay' });
      expect(okayButton).toBeInTheDocument();
      expect(okayButton).not.toBeDisabled();
      // okayButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      user.click(okayButton);

      await waitFor(() =>
        expect(store.getState().player.playlists[0].tracks).toEqual(
          expect.arrayContaining([tracks[0]])
        )
      );
    });

    // TODO:
    // - when a playlist is selected, an API call was made to add the track to the playlist
    // - when a playlist is selected, the modal is closed
    // - when a playlist is selected, the context menu is closed
  });
});
