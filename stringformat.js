/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Nikolas Schmidt-Voigt
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function () {
  function createAttributesString (attrs) {
    var attributesString = '';
    if (angular.isObject(attrs)) {
      for (var prop in attrs) {
        if (attrs.hasOwnProperty(prop)) {
          attributesString += ' '+prop+'="'+attrs[prop]+'"';
        }
      }
    }
    return attributesString;
  }

  angular.module('angular-nsv-stringformat',[])
    .filter('paragraphs', function paragraphsFilterProvider () {
      return function paragraphsFilter ($input, attrs) {
        var pTag = '<p'+createAttributesString(attrs)+'>';
        return angular.isString($input) ? 
                pTag+ $input.replace(/\n\n+/gm , '</p>'+pTag)+'</p>'
                : '';
      };
    })
    .filter('newlines', function newlinesFilterProvider () {
      return function newlinesFilter ($input) {
        return angular.isString($input) ? $input.replace(/\n/gm, '<br/>') : '';
      };
    })
    .filter('stripTags', function stripTagsFilterProvider () {
      return function stripTagsFilter ($input) {
        return angular.isString($input) ? $input.replace(/<[^>]+/gm, '') : '';
      };
    })
    .filter('sanitizeTags', function sanitizeTagsFilterProvider () {
      return function sanitizeTagsFilter ($input) {
        return angular.isString($input) ? $input.replace(/</gm, '&lt;').replace(/>/gm, '&gt;') : '';
      }
    })
    .filter('linkUrls', function linkUrlsFilterProvider () {
      var urlRegexp = new RegExp(
          '(https?|ftp|file)://' // the protocols
          + '[A-Za-z0-9\\-_.~;:@=+$,/?%#[\\]!*\'()]+', // allowed chars in a url
        'gi');
      
      return function linkUrlsFilter ($input, attrs) {
        var attributesString = createAttributesString(attrs);
        return angular.isString($input) ? $input.replace(urlRegexp, '<a href="$&"' + attributesString + '>$&</a>') : '';
      };
    })
    .filter('trustAsHtml', ['$sce', function trustAsHtmlFilterProvider ($sce) {
      return function trustAsHtmlFilter ($input) {
        return $sce.trustAsHtml($input);
      }
    }]);
}());
