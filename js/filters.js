'use strict';
(function () {
  var PROPERTIES_NUMBER_LIMIT = 5;
  var PropertyPrice = {
    LOW: 10000,
    HIGH: 50000
  };
  var housingPrice = document.querySelector('#housing-price');
  var housingGuests = document.querySelector('#housing-guests');
  var housingType = document.querySelector('#housing-type');
  var housingRooms = document.querySelector('#housing-rooms');

  var checkSelectedFeatures = function (item, massive) {
    var doesInculde = true;
    var property = item;
    var selectedFeatures = massive;
    selectedFeatures.forEach(function (it) {
      if (!property.offer.features.includes(it)) {
        doesInculde = false;
      }
    });
    return doesInculde;
  };

  var filterPropertiesNumber = function (data) {
    var filteredData = [];
    filteredData = data.length > PROPERTIES_NUMBER_LIMIT ? data.slice(0, PROPERTIES_NUMBER_LIMIT) : data.slice(0);
    return filteredData;
  };

  var filterPropertyPrice = function (item) {
    switch (housingPrice.value) {
      case 'low':
        return item.offer.price < PropertyPrice.LOW;
      case 'middle':
        return item.offer.price >= PropertyPrice.LOW && item.offer.price <= PropertyPrice.HIGH;
      default:
        return item.offer.price > PropertyPrice.HIGH;
    }
  };

  var filterGuests = function (item, filterValues) {
    return housingGuests.value === '0' ? item.offer.guests <= parseInt(filterValues[2], 10) : item.offer.guests >= parseInt(filterValues[2], 10);
  };

  var getSelectedValues = function () {
    var filters = [housingType, housingRooms, housingGuests, housingPrice];
    var filtersValues = [];
    filters.forEach(function (item) {
      filtersValues.push(item.value);
    });
    return filtersValues;
  };

  var filterProperties = function (properties) {
    var filtersValues = getSelectedValues();
    var checkboxes = document.querySelector('#housing-features').querySelectorAll('.map__checkbox');
    var checkboxesChecked = [].filter.call(checkboxes, function (el) {
      return el.checked;
    });
    var checkboxesCheckedValues = [];
    checkboxesChecked.forEach(function (item) {
      checkboxesCheckedValues.push(item.value);
    });

    var filteredProperties = properties.filter(function (item) {
      return filtersValues[0] === 'any' ? true : item.offer.type === filtersValues[0];
    }).filter(function (item) {
      return filtersValues[1] === 'any' ? true : item.offer.rooms === parseInt(filtersValues[1], 10);
    }).filter(function (item) {
      return filtersValues[2] === 'any' ? true : filterGuests(item, filtersValues);
    }).filter(function (item) {
      return filtersValues[3] === 'any' ? true : filterPropertyPrice(item);
    }).filter(function (item) {
      return checkboxesCheckedValues.length < 1 ? true : checkSelectedFeatures(item, checkboxesCheckedValues);
    });
    return filteredProperties;
  };

  window.filters = {
    propertiesNumber: filterPropertiesNumber,
    properties: filterProperties
  };
})();

