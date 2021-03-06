### Todo 4pp Closed BETA
Updates are sorted from latest to oldest and marked using semantic versioning.

##### v 2.0.1 | 28.12.2018.

* Updated gulp file, added new babel presets, removed source maps and added gulp post build

* Fixed submit new todo double quote issue

* Removed autocomplete from register form

* Disabled static html files via express static

------------------------------------------------------------

##### v 2.0.0 | 09.12.2018.

* Added proper user authentcation. Changed RestAPIs.

* Added email notification when new user is registered.

* Added real-time posting todos.

* Deployed latest version to heroku.

------------------------------------------------------------

##### v 1.7.0 | 07.10.2018.

* Solved page redirect issue.

* Updated homepage 'Hello User' title.

------------------------------------------------------------

##### v 1.6.0 | 05.10.2018.

* Updated user register/login error messages.
Message no longer appears as an alert, but rather below the input tag.

* Added new home page quotes.

------------------------------------------------------------

##### v 1.5.0 | 03.10.2018.

* Updated user register/login.
Saving token to Cookie when user logs in.

------------------------------------------------------------

##### v 1.4.2 | 30.09.2018.

* Fixed delete Todo while editing in.
Once modal opens todo highlight will be disappear.

* Scroll position will be removed from session storage once you submit todo.

* New scroll position will be set once you delete multiple todos.

------------------------------------------------------------

##### v 1.4.1 | 30.09.2018.

* Fixed wrong time display after todo is completed. 

* Removed someNew from todo model.

------------------------------------------------------------

##### v 1.4.0 | 30.09.2018.

* Added new cover images. 

* Images no longer change on page refresh. They now change when day changes.

* Added fade image when page refreshes.

------------------------------------------------------------

##### v 1.3.0 | 29.09.2018.

* Added selecting / deselecting todos feature. 
You can now delete multiple selected todos at once.

* Fixed scrollbar error.

------------------------------------------------------------

##### v 1.2.0 | 26.09.2018.

* Updating app name and domain.

------------------------------------------------------------

##### v 1.1.0 | 24.09.2018.

* Created css files for error page and login failed page.

* Gulp dist folder is now avaiable, so when server starts it no longer requires to minify first and then starts server.
Files are already minifhed and that means that "npm start" only triggers the start server script.

* If you entered wrong route and error page loaded, you now have button which once clicked takes you on the previous page.

------------------------------------------------------------

##### v 1.0.2 | 24.09.2018.

* User register update.
If you try to register with username or email that already exists in DB, page will sned you alert message.

------------------------------------------------------------

##### v 1.0.1 | 22.09.2018.

* User validation update.
Username no longer requires numbers.

* Submit todo update.
You can't submit todo with title longer than 200 characters.
