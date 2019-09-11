describe("GOVUK.StripPII", function() {
  var strip

  describe('by default', function() {
    beforeEach(function() {
      strip = new GOVUK.StripPII()
    })

    it("strips email addresses, but not postcodes and dates from strings", function() {
      var string = strip.stripPII("this is an@email.com address, this is a sw1a 1aa postcode, this is a 2019-01-21 date")
      expect(string).toEqual("this is [email] address, this is a sw1a 1aa postcode, this is a 2019-01-21 date")
    })

    it("strips email addresses but not dates and postcodes from objects", function() {
      var obj = {
        'email': 'this is an@email.com address',
        'postcode': 'this is a sw1a 1aa postcode',
        'date': 'this is a 2019-01-21 date'
      }

      var strippedObj = {
        'email': 'this is [email] address',
        'postcode': 'this is a sw1a 1aa postcode',
        'date': 'this is a 2019-01-21 date'
      }

      obj = strip.stripPII(obj)
      expect(obj).toEqual(strippedObj)
    })

    it("strips email addresses but not dates and postcodes from arrays", function() {
      var arr = [
        'this is an@email.com address',
        'this is a sw1a 1aa postcode',
        'this is a 2019-01-21 date'
      ]

      var strippedArr = [
        'this is [email] address',
        'this is a sw1a 1aa postcode',
        'this is a 2019-01-21 date'
      ]

      arr = strip.stripPII(arr)
      expect(arr).toEqual(strippedArr)
    })
  })

  describe('when configured to remove all PII', function() {
    beforeEach(function() {
      strip = new GOVUK.StripPII()
      strip.stripDatePII = true
      strip.stripPostcodePII = true
    })

    it("strips email addresses, postcodes and dates from strings", function() {
      var string = strip.stripPII("this is an@email.com address, this is a sw1a 1aa postcode, this is a 2019-01-21 date")
      expect(string).toEqual("this is [email] address, this is a [postcode] postcode, this is a [date] date")
    })

    it("strips all PII from objects", function() {
      var obj = {
        'email': 'this is an@email.com address',
        'postcode': 'this is a sw1a 1aa postcode',
        'date': 'this is a 2019-01-21 date'
      }

      var strippedObj = {
        'email': 'this is [email] address',
        'postcode': 'this is a [postcode] postcode',
        'date': 'this is a [date] date'
      }

      obj = strip.stripPII(obj)
      expect(obj).toEqual(strippedObj)
    })

    it("strips all PII from arrays", function() {
      var arr = [
        'this is an@email.com address',
        'this is a sw1a 1aa postcode',
        'this is a 2019-01-21 date'
      ]

      var strippedArr = [
        'this is [email] address',
        'this is a [postcode] postcode',
        'this is a [date] date'
      ]

      arr = strip.stripPII(arr)
      expect(arr).toEqual(strippedArr)
    })
  })
});
