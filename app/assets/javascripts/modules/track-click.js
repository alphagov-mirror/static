window.GOVUK.Modules = window.GOVUK.Modules || {};

(function (Modules) {
  'use strict'

  Modules.TrackClick = function () {
    this.start = function (element) {
      var trackable = '[data-track-category][data-track-action]'

      if (element.is(trackable)) {
        element.on('click', trackClick)
      } else {
        element.on('click', trackable, trackClick)
      }

      function trackClick (evt) {
        var $el = $(evt.target)
        var options = { transport: 'beacon' }

        if (!$el.is(trackable)) {
          $el = $el.parents(trackable)
        }

        var category = $el.attr('data-track-category')
        var action = $el.attr('data-track-action')
        var label = $el.attr('data-track-label')
        var value = $el.attr('data-track-value')
        var dimension = $el.attr('data-track-dimension')
        var dimensionIndex = $el.attr('data-track-dimension-index')
        var extraOptions = $el.attr('data-track-options')

        if (label) {
          options.label = label
        }

        if (value) {
          options.value = value
        }

        if (dimension && dimensionIndex) {
          options['dimension' + dimensionIndex] = dimension
        }

        if (extraOptions) {
          $.extend(options, JSON.parse(extraOptions))
        }

        if (GOVUK.analytics && GOVUK.analytics.trackEvent) {
          GOVUK.analytics.trackEvent(category, action, options)
        }
      }
    }
  }
})(window.GOVUK.Modules)
