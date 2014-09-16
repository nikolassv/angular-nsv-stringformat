# simple string filters for angular
## Installation

Download `stringformat.js`, clone this github repository or install via bower:

	bower install angular-nsv-stringformat --save

## About

This module defines several filters for angular.js that may be used with strings. It contains two special filters to ensure the other filters work fine:

* **trustAsHtml:** this filter uses angulars `$sce` service to trust the string as html. The other filters in this module add html to our string. Therefore, this filter must be applied last to ensure that the html is not sanitized away by angular. Because trusted strings can only be bound to an elements content via the `ng-bind-html` directive this directive must be used rather than an angular expression.
* **sanitizeTags:** this filter sanitizes html tags that are contained in a string by replacing `<` and `>` by their respective html entities. In enviroments where trusting the string as html may allow code injection this filter should be applied first.

The other filters in the module are:

* **paragraphs:** replaces repeatet newlines with paragraph tags. In this way it creates html paragraphs from text blocks that are seperated by a blank linke. For example: `"lorem ipsum...\n\nlorem ipsum..."` would be replaced by `"<p>lorem ipsum...</p><p>lorem ipsum...</p>"`
* **newlines:** replaces single newlines with `<br>` tags. As this filter replaces every newline it must applied after the `paragraphs` filter if both are applied.
* **linkUrls:** creates links for URLs in the string. It understand the protocols: `http`, `https`, `file` and `ftp`.

## Example: Apply all the filter to a String

### The string

	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
	

	Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
	Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 

	Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.

### The HTML in your template

	<div ng-bind-html="theString | sanitizeTags | paragraphs | newlines | linkUrls | trustAsHtml"></div>

### The output

  ```
  <div ng-bind-html="theString | sanitizeTags | paragraphs | newlines | linkUrls | trustAsHtml" class="ng-binding">
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
    eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
    takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
    consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
    iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore
    te feugait nulla facilisi.<br> Lorem ipsum dolor sit amet, consectetuer adipiscing
    elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
    volutpat.</p>
    <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
    lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
    in hendrerit in vulputate velit esse molestie consequat.</p>
  </div>
  ```
	
Example plnkr: http://plnkr.co/edit/Wd79hfGDAMmZXEL2TvrT
