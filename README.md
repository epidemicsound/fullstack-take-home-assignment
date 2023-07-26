# Interview Coding Base

Epidemic Sound coding challenge

## The project

Below, we have defined what is required of your project, since we believe this will serve as a good basis for you to show your problem solving skills and describe your reasoning and decisions.

- Create, delete and list playlists
- Add and remove tracks to a playlist

If you want to add extra features or explore something you’re passionate about, we encourage you to do so, but we want to point out that we’re not evaluating you on the amount of time you have to spend on an assignment like this.

If you do want to extend upon the list above, there is more data returned from the API than what's being currently displayed.

Some inspiration on extra features:

- Reorder tracks in playlist
- Filter and sorting of tracks
- Display waveforms
- Users and permissions

Again, this is not required. We respect that everyone has different amounts of time to put on something like this and we evaluate accordingly.

### Prerequisites for running

- Docker installed
- You will need to have the following ports free:
  - `3000` (client)
  - `8000` (service)
  - `5432` (postgres)

### Instructions

1. Clone repository
2. Setup a new private repository with the source code
3. Run `docker-compose up`
4. Code
5. Push your solution to a new branch
6. Create a Pull Request when your ready and reach out to us for setting up the interview

To cleanup the Docker containers run `docker-compose down -v --rmi all --remove-orphans`

## FAQ

#### How will I be evaluated?

You bring in your solution and get to walk it through with us. We use this as a starting point to have discussion. We want to understand your reasoning and depth of knowledge. As a rule the discussion is more important than the actual code. Also no one is an expert at everything so this also helps us understand your strengths as well as areas of improvement across the stack.

Some of the things we will look at in the evaluation:

- **Code quality** - How you reason about making sure code is readable and maintainable.
- **Testing** - How you reason about what to test and how to test it.
- **Performance** - How you can identify performance bottlenecks and reason around solving them.
- **System design** - How you reason about concepts like reusability, separation of concerns and various abstractions.
- **Infrastructure and operations** - How you would run a system and what's important to think about.

In this we also try to understand how you solve problems generally and how you communicate your solutions. Problem solving and communication are both things we value highly.

## Notes

I have done some restructuring to make the project more readable and maintainable before working on adding the features but because of lack of time I was only able to deliver these parts:

### Backend

- Create, delete and list playlists
- Add and remove tracks to a playlist
- Documentation on `http://localhost:8000/api/docs/`
- You can run the tests with this command `docker-compose run --rm service sh -c "python manage.py test"`
- Filter, sorting and pagination of tracks and playlists are provided(Filters are very simple and only supports simple text field inclusion)

### Frontend

- List and delete playlists
- Remove tracks from a playlist

### Remaining Parts

- Reordering tracks in not something complicated, it can be done by adding an interger field like "order" to the joint table and define a PATCH endpoint to get the new orders as an array of object with id of the track and its order and then handle the reordering on the backend side
- Users and permissions are also supported by django out of the box as I read but since I'm not an expert in django I did not have enough time to go through it and probably do some customization to make it compatible with the requirements
