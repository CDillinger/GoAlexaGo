# Go Alexa Go

## SpartaHack 2017 Project

Created by [Charlie Benson](https://github.com/glbeast63), [Collin Dillinger](https://github.com/CDillinger), [Caleb Howell](https://github.com/thelastwookie), & [Randy Lee](https://github.com/leer89).

Check out the [Devpost page](https://devpost.com/software/go-alexa-go).

## Contents

The [AlexaSkill](AlexaSkill) folder contains the code and related files for our Alexa skill created in Node.js. This is hosted on AWS Lambda.

The [DirectionServiceAPI](DirectionServiceAPI) contains the ASP.NET Web API that connects Alexa with Unity. This is hosted on Microsoft Azure at [cchackers.azurewebsites.net](http://cchackers.azurewebsites.net) (note there are only a few endpoints, and the site does not have a home page).

The Unity project is not included here, as most of the files are binary and hosting those on source control would be silly.