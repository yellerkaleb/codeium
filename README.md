Codeium Interview: Weather Map
Frontend Engineer Take-Home Interview

⏳Duration: 3 hours

💻Stack: React

Welcome to the frontend engineer take-home interview! Thanks for taking the time to go through this
interview process. In this exercise, you are tasked with building a weather map, a web application
that allows users to view the current weather for a selected city and how it conflicts with a
planned activity.

The primary goal is to assess your ability to ship a functional product quickly, without heavy support
from product management or design teams. Functionality favored over cosmetics, but if you have time,
please spend some time on UI/UX polish.

Codeium builds with React so this is the preferred stack. Ideally this can be done in TypeScript. Using a
boilerplate like NextJS, ViteJS, or CRA can help, though this is up to you. We also use Tailwind and
TailwindUI internally.

We highly recommend you build off of a design system’s component library so that you can get a v1 off
the ground quickly or a boilerplate (create next app, create react app, etc). Please refrain from finding
an existing or similar solution online and cloning/forking the repo. Some suggestions: Material,
SemanticUI, Bootstrap. You may also use whatever styling method you’d like (styled components,
Tailwind, SASS, raw CSS, etc.). You may tackle the requirements in any order.

Requirements
1. Users can select a city: You may choose the flow through which this is done (ie. city name
search, zip code, etc.). Once added, the city’s weather will be shown on the map.
2. Pinned on map with metadata: The selected city will appear on the map with an easy way for
the user to view the weather for that location. You must include at least: temperature (user may
toggle between imperial vs. metric) and weather category (sunny, cloudy, rainy, etc.).
3. Users can check for hours of conflict with an inputted plan: Users can input a JSON
containing an activity and be shown which hours there are conflicts with bad weather. More
information outlined below.

4. Forecast Playback: Users can press a play button and view the 5 day forecast (included in free
tier) at 3 hour increments on the map. The time should update and there should be the ability
to play/pause and seek through the 5 day forecast.
5. [Do Last] “Polish”: Once you’ve completed the above requirements, spend some time on the
UI/UX to get the web app into a state where you would be proud to put this online and allow
users to visit your site to check the weather.
