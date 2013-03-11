##Breezejs / Kendo SPA Spike##

This sample was forked from [kendo-labs/breeze-kendo](https://github.com/kendo-labs/breeze-kendo) and the KendoUI blog post [Breezejs and the kendoUI datasource](http://www.kendoui.com/blogs/teamblog/posts/13-02-21/breeze_js_and_the_kendo_ui_datasource.aspx).

This project adds a sample SPA originating from the HotTowel template, that will display a kendo grid of Products.

### Main Issue
The issue I kept running into (in particular with grids) and breeze was a stack overflow errors   This mainly
do to recursive breeze entity object properties: entityAspect, and entityType.

kendo.breeze.datasource.js has been reworked to map breeze entities to JS objects (with entityAspect and entityType removed) - such that grids will work.  The issue
becomes the disconnect between a full breeze entity and what now sits within the grid itself.

### SPA Sample
The SPA sample uses the Northwind db, EF, Breeze, and Durandal (all from the template - less the db and context/model classes).
Running the SPA sample, click on the 'Details' tab - that will show the grid bound to the Northwind/Products data.
Sorting / paging is working

### Not Addressed
Filter handling still needs to be added...
