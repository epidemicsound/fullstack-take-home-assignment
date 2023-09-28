import { rest } from 'msw';
import { playlists } from '../playlists';

const server = path => {
  return new URL(path, process.env.SERVER_URL).toString();
};

export const handlers = [
  rest.get(server('/playlists'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(playlists));
  })
];
