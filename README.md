# Happy Diwali — Mohit Kumar Sharma

A compact, responsive Diwali greeting site with real fireworks footage, 12 click-to-light diyas, Lakshmi–Ganesh devotional artwork, four clickable prasad cards that open a food photo and short wish, a one-question feedback form and a closing family greeting.

## Run it in VS Code

1. Open this folder in VS Code.
2. Install the **Live Server** extension if it is not installed.
3. Right-click `index.html` and choose **Open with Live Server**.

The site uses relative asset paths, so keep the `assets` folder next to `index.html`. A local web server is recommended for the video, local song and feedback form. The project does not require `npm install` or a build step.

## Feedback email

The feedback form asks for the visitor's name and message, then posts both to FormSubmit at `bhumiharmohitsharma841222@gmail.com`. It does not collect the visitor's email address. FormSubmit may send an activation email to the destination address the first time the form is submitted. Open that email and confirm the form once; future feedback can then be delivered. The visitor's name and feedback are sent to the third-party form processor and emailed to the site owner. Do not use the form to collect sensitive information.

## Ram Aayenge song

Add your MP3 as `assets/music/Ram_Aayenge.MP3` (keep the spelling and capital letters exactly as shown). The page tries to play it silently from the beginning (0:00) as it opens, with no visible song title, status or player controls. If the browser blocks autoplay, playback is retried when the visitor first clicks, taps or presses a key anywhere on the page. After copying the MP3 into the folder, reload the page.

## Credits

- Fireworks footage: [Pexels — Video Fireworks Display](https://www.pexels.com/video/video-fireworks-display-854348/), listed as free stock footage.
- Lakshmi–Ganesh devotional artwork and diya illustrations were generated for this project.
- Modak, motichoor laddoo, kaju katli and panchamrit popup photos were generated for this project.
- The MP3 is not included; add a song file you are allowed to use at `assets/music/Ram_Aayenge.MP3`.
