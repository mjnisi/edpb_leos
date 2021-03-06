/*
 * Copyright 2021 European Commission
 *
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *     https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and limitations under the Licence.
 */
'use strict';

/**
 * The BrandingDirective brings theming configuration to our sidebar
 * by allowing the branding hypothesis settings to be reflected on items
 * that use this directive with the corresponding branding value.
 *
 * How to use:
 *   <element h-branding="supportedProp1, supportedProp2">
 *
 * Use `h-branding` to trigger this directive. Inside the attribute value,
 * add a comma separated list of what branding properties should be applied.
 * The attribute values match what the integrator would specify. For example,
 * if "superSpecialTextColor" is supported, the integrator could specify
 * `superSpecialTextColor: 'blue'` in the branding settings. Then any element that
 * included `h-branding="superSpecialTextColor"` would have blue placed on the
 * text's color.
 *
 * See below for the supported properties.
 */

// @ngInject
function BrandingDirective(settings) {

  var _hasBranding = !!settings.branding;

  // This is the list of supported property declarations
  // we support. The key is the name and how it should be reflected in the
  // settings by the integrator while the value (in the whitelist) is
  // the type of .style property being set. The types are pretty simple for now
  // and are a one-to-one mapping between the branding type and style property.
  var _supportedPropSettings = {
    accentColor: 'color',
    appBackgroundColor: 'backgroundColor',
    ctaBackgroundColor: 'backgroundColor',
    ctaTextColor: 'color',
    selectionFontFamily: 'fontFamily',
    annotationFontFamily: 'fontFamily',
  };

  // filter all attribute values down to the supported
  // branding properties
  var _getValidBrandingAttribute = function(attrString){
    return attrString.split(',').map(function(attr){
      return attr.trim();
    }).filter(function filterAgainstWhitelist(attr){
      return attr in _supportedPropSettings;
    });
  };


  return {
    restrict: 'A',
    link: function(scope, $elem, attrs) {
      if(_hasBranding){
        _getValidBrandingAttribute(attrs.hBranding).forEach(function(attr){
          var propVal = settings.branding[attr];
          if(propVal){
            // the _supportedPropSettings holds the .style property name
            // that is being set
            $elem[0].style[ _supportedPropSettings[attr] ] = propVal;
          }
        });
      }
    },
  };
}

module.exports = BrandingDirective;
