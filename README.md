<<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br>
<div align="center">

<h3 align="center">My Status Tool Demo</h3>

  <p align="center">
    View a demo of how to include multiple OPML files in a single file!
    <br />
    <a href="https://github.com/andysylvester/MyStatusToolDemo/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://fedwiki.andysylvester.com:443">View Demo</a>
    ·
    <a href="https://github.com/andysylvester/MyStatusToolDemo/issues">Report Bug</a>
    ·
    <a href="https://github.com/andysylvester/MyStatusToolDemo/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#customizing">Customizing The App</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

My Status Tool is an application that provides the basic posting and reading functionality within Twitter, but using [RSS](http://cyber.law.harvard.edu/rss/rss.html") and [rssCloud](http://home.rsscloud.co/)" as the enabling technologies.

The basic functions are:
* Ability to make a short post
* When a post is made, a RSS feed is updated, a separate page for the post is created, and the post appears on the home page via Websockets
* The tool provides hosting for the RSS feed and posts created
* The tool can display updates to any RSS feeds that support the rssCloud protocol via Websockets

The tool is set up for a single user and requires some configuration. Please consult the Installation section in this README file for more information.

This is a proof of concept, but will be further developed. If you find problems in the tool, or want to suggest features, feel free to create an issue in the Github repo.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [opmlPackage](https://github.com/scripting/opmlPackage)
* [outlineBrowser](https://github.com/scripting/outlineBrowser)
* [Express](https://expressjs.com/)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Here is how to get your copy of the app running!

### Prerequisites

* Node.js install (can be local or on a server)
* NPM install
* Git (optional, but can be helpful on the install)

### Installation

1. Clone the repo if you have Git installed
   ```sh
   git clone https://github.com/andysylvester/MyStatusToolDemo.git
   ```
This will create a folder called MyStatusToolDemo

2. If you do not have Git installed, you can download a copy of the app as a Zip file, then unzip the app into a folder called "MyStatusToolDemo" on your computer/server.

3. In a terminal window, install the required NPM packages by changing directory to the install folder, then type the following command:
   ```sh
   npm install
   ```
4. The app uses a configuration file (config.json) to 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Starting The App

To start the app, enter the following command in a terminal window in the app folder:

   ```sh
   npm start
   ```

The app will start on port 3002. If you are running the app locally, open "http://localhost:3002" in a web browser. You should see the app running as in the screenshot shown earlier on this page. If you are running the app on a server, open a tab in a web browser and enter the URL of the server with ":3002" at the end of the URL. Again, you should see the app running as in the screenshot shown earlier on this page.

You can see the app running <a href="http://fedwiki.andysylvester.com:3002/">here</a>.

## Customizing The App

The includes.opml file in the repo can be edited to load different OPML files. You can edit includes.opml using a text editor or an outliner like [Drummer](http://drummer.scripting.com/). A key requirement is that in each entry within includes.opml, the attribute "type" must be set to "include". An example is as follows:

   ```sh
   <outline created="Wed, 11 May 2022 21:03:42 GMT" name="oregonElections" text="Oregon Elections" type="include" url="http://drummer.scripting.com/PDXProtestNews/OregonElections.opml"></outline>
   ```
The text on the main page is in file /views/index.pug, and can be changed as you wish.

The main app is mostly an auto-generated [Express](https://expressjs.com/) application, so other Express features can be added.

The styling of the app can certainly be improved, stylesheets are in /public/stylesheets.

The app currently runs on port 3002, this can be changed by editing /bin/www.

If you are running the app on a server, you can use the NPM package [forever](https://www.npmjs.com/package/forever) to keep the app running continuously. To install the package, type the following command in a terminal window on your server:

   ```sh
   sudo npm install forever -g
   ```
Once you have installed the forever package, use the following command to start the app:

   ```sh
   forever start app.js
   ```

To stop the forever process, type the following in the app directory:

   ```sh
   forever stopall
   ```


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Andy Sylvester - [@AndySylvester99](https://twitter.com/AndySylvester99) - sylvester.andy@gmail.com

Project Link: [https://github.com/andysylvester/MyStatusToolDemo](https://github.com/andysylvester/MyStatusToolDemo)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Colin Walker](https://colinwalker.blog/) - Inspiration from his recent tool, [hyblog](https://github.com/colin-walker/hyblog)
* [Andrew Shell](https://blog.andrewshell.org/) - Developer of the rssCloud server used by the app
* [Dave Winer](http://scripting.com/) - Creator of many of the NPM modules used in this app

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/andysylvester/MyStatusToolDemo.svg?style=for-the-badge
[contributors-url]: https://github.com/andysylvester/MyStatusToolDemo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/andysylvester/MyStatusToolDemo.svg?style=for-the-badge
[forks-url]: https://github.com/andysylvester/MyStatusToolDemo/network/members
[stars-shield]: https://img.shields.io/github/stars/andysylvester/MyStatusToolDemo.svg?style=for-the-badge
[stars-url]: https://github.com/andysylvester/MyStatusToolDemo/stargazers
[issues-shield]: https://img.shields.io/github/issues/andysylvester/MyStatusToolDemo.svg?style=for-the-badge
[issues-url]: https://github.com/andysylvester/MyStatusToolDemo/issues
[license-shield]: https://img.shields.io/github/license/andysylvester/MyStatusToolDemo.svg?style=for-the-badge
[license-url]: https://github.com/andysylvester/MyStatusToolDemo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/andrew-sylvester-b426a251
[product-screenshot]: images/screenshot.png