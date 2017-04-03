# React Motion Menu - portlet
A sample portlet to display a Motion Menu based on react-motion.

The portlet allows user to configure icons, colors and links for the menu from the portlet config section (no programming required).

![React Motion Menu](https://github.com/dtodo1paco/react-motion-menu-portlet/blob/master/screenshots/screen_4.png)

## Compile and install
Clone this repo in your portlets Liferay SDK directory. Then use

```
ant clean deploy
```
When the portlet has been deployed, add it to a page
![React Motion Menu](https://github.com/dtodo1paco/react-motion-menu-portlet/blob/master/screenshots/screen_1.png)

## Configure

![React Motion Menu](https://github.com/dtodo1paco/react-motion-menu-portlet/blob/master/screenshots/screen_2.png)

You can set a lot of features

![React Motion Menu](https://github.com/dtodo1paco/react-motion-menu-portlet/blob/master/screenshots/screen_3.png)

## Setup and code
### Install npm 
```
sudo apt-get install npm
```
### Install node_modules in REACT directory
```
npm install gulp gulp-less gulp-run gulp-concat  gulp-minify-css  gulp-uglify gulp-jshint  gulp-rename
npm install react react-dom
npm install reactify babelify babel-preset-react browserify   vinyl-source-stream babel-preset-es2015  browser-sync vinyl-transform del jshint vinyl-buffer
npm install react-motion lodash.range
```
## Run in local environment
Use gulp to run your tests using index.html as tester page
```
gulp
```

You will see something like this

```
dtodo1paco@dtodo1paco-laptop:~/WORKSPACE/DTODO1PACO/REPOS/react-motion-menu-portlet/REACT$ gulp
[08:05:10] Using gulpfile /media/dtodo1paco/3e1e375b-d283-4e7a-a213-5c33e6cd4753/LIFERAY/liferay-plugins-sdk-6.2/portlets/react-motion-menu-portlet/REACT/gulpfile.js
[08:05:10] Starting 'build'...
[08:05:25] Finished 'build' after 15 s
[08:05:25] Starting 'watch'...
[08:05:25] Finished 'watch' after 9.78 ms
[08:05:25] Starting 'default'...
[08:05:25] Finished 'default' after 7.22 μs
```

Make your changes to JSX filex included in app directory. Gulp will automatically update your page to test.

## Integrate with Liferay
Make your REACT/dist directory point to docroot/js/dist and you will automatically update your portlet javascript with no action.

```
drwxr-xr-x  2 dtodo1paco dtodo1paco 4096 abr  2 02:26 app
lrwxrwxrwx  1 dtodo1paco dtodo1paco   15 abr  2 02:26 css -> ../docroot/css/
lrwxrwxrwx  1 dtodo1paco dtodo1paco   19 abr  2 02:26 dist -> ../docroot/js/dist/
-rw-r--r--  1 dtodo1paco dtodo1paco 1314 abr  2 02:34 gulpfile.js
-rw-r--r--  1 dtodo1paco dtodo1paco 2446 abr  2 02:34 index.html
drwxr-xr-x 26 dtodo1paco dtodo1paco 4096 abr  2 02:34 node_modules
-rw-r--r--  1 dtodo1paco dtodo1paco 1495 abr  2 02:26 package.json
```

## TODO
- more config options (each icon)
- child icons using Liferay.AutoFields (a try was made in configuration_autofields.jsp)

#### PRs are welcome
