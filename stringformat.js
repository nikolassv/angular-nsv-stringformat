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
 angular.module('angular-nsv-stringformat',[])
	.filter('paragraphs', function paragraphsFilterProvider () {
		return function paragraphsFilter ($input) {
      return angular.isString($input) ? '<p>'+ $input.replace(/\n\n+/gm , '</p><p>') + '</p>': '';
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
		var defaultProtocols = [
			'http',
			'https',
			'ftp',
			'file',
		];
		
		return function linkUrlsFilter ($input, protocols, attrs) {
			var attributesString = '';
			if (angular.isObject(attrs)) {
				for (var prop in attrs) {
					if (attrs.hasOwnProperty(prop)) {
						attributesString += ' '+prop+'="'+attrs[prop]+'"';
					}
				}
			}
			if (!angular.isArray(protocols)) {
				protocols = defaultProtocols;
			}
			var urlRegexp = new RegExp('('+protocols.join('|')+')://\\S+', 'gi');
			return angular.isString($input) ? $input.replace(urlRegexp, '<a href="$&"' + attributesString + '>$&</a>') : '';
		};
	})
	.filter('trustAsHtml', ['$sce', function trustAsHtmlFilterProvider ($sce) {
	  return function trustAsHtmlFilter ($input) {
	    return $sce.trustAsHtml($input);
	  }
	}]);
