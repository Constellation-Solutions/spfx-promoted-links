## spfx-promoted-links

This is an example client-side web part built with the SharePoint Framework, React, and the Office UI Fabric.  The web part can be added to a modern SharePoint page to display items from a promoted links list in SharePoint.

### Building the code

```bash
git clone https://github.com/Constellation-Solutions/spfx-promoted-links.git
npm i
npm i -g gulp
gulp serve
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

### Build options

gulp nuke - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
