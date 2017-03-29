# RShinyExtension

This is an extension for [Atlas](https://github.com/ComputationalIntelligenceGroup/Atlas) application. It embeds a [Shiny](https://shiny.rstudio.com/) application.

## Authors

- Gherardo Varando [gherardo.varando@gmail.com](mailto:gherardo.varando@gmail.com)
- Mario Juez [mario@mjuez.com](mailto:mario@mjuez.com)

## Requeriments

This extension requires [R environment](https://www.r-project.org/) installed and added to the path.

## User guide

This extension adds a submenu to the application menu called "RShiny". Through that menu, a Shiny application can be opened:

A R script must be choosed, that script should run a Shiny application and write to the standard output (stdout) its host and port. The following example runs the `01_hello` example Shiny application on `127.0.0.1:4545`.

```R
library(shiny)
write("127.0.0.1:4545",stdout())
runExample("01_hello",host = "127.0.0.1",port=4545)
```

If the Shiny application is already running in a remote host, the R script only has to write the remote host and port to the standard output (stdout). E.g:

```R
write("my.remotehost.com:1234/shinyapp", stdout())
```

## License

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.