# Take-home assignment report

I've completed first two tasks of the assignment:
- Create, delete and list playlists
- Add and remove tracks to a playlist

Also, I read all the evaluation points and created a list of answers, ideas for improvement 
and things to think about before running the service in production.

## Improvement plan

- Improve current features
  - Add front end test (haven't really worked with them, so skipped this part)
  - Use optimistic updates on a front end for the better UX
  - Polling for the server updates (websockets, SSE)
- CI
  - run tests (obviously =))
  - linters
  - check outdated dependencies
- Frontend
  - production build (file hashes, minification, code splitting)
  - CDN
  - PWA?
  - Google Lighthouse
- Backend
  - Not familiar with the best practices to build/deploy Python
- Backend in Kotlin
  - uberjar
  - GraalVM?
- Production environment
  - Kubernetes (think about rolling updates, scaling, canary pods, etc)
  - Monitoring and alerting (error rate, request rate, pod metrics, response timings, etc)
  - Logging (long-term storage if needed)
  - Error logging (Sentry or similar)
  - Web Vitals