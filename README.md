The First version of VasWiki, a webapp / PWA that consists of articles based on GBVSR Vaseraga, it can be versatile to what information is posted.

IMPORTANT NOTE
===================
I can't realistically host the webapp / PWA because it cost money to provide bandwidth and function support when hosting. If I were to host this as a static site, then adding / editing articles won't update in real time and that won't allow users to create new articles. Therefore this project won't be hosted as of right now until I have the proper funds.

FEATURES
===================
1. Hosts a front page showcasing the articles / categories amount.
2. PWA installation button.
3. Ability to add / edit or delete articles posted behind password authentication.
4. Search bar to find wanted articles easier if searching becomes complicatted.
5. Template formats for articles are based on...
  #1 Article Title
  #2 Article Author
  #3 Description
  #4 Youtube URL if a video demonstration is needed
  #5 Category / Difficulty / Customizable tags.

HOW TO RUN LOCALLY
==================
1. This will work on the VSCODE IDE (Download it)
2. Install node.js (version 24.16.0 as of this moment) and check if it's installed correctly by typing in the VSCODE terminal "node -v" to check your version installed.
3. Then type "npm install" in the terminal to download next.js dependencies, it will provide a (node_modules) folder and a package_lock.json file.
4. Lastly after doing all steps 1 - 3, type "npm run dev" in the terminal, it will show your localhost port 3000 host the webapp / PWA locally.


FUTURE GOALS
==================
1. Everything as of right now runs on the frontend which can affect performance and scalability issues, implementing a backend to work with a database to which will send data to the frontend would be a good solution.
2. More features to add upon, if necessary only to prevent bloating the program.
