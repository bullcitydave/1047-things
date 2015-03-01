// to depend on a bower installed component:
// define(['component/componentName/file'])

// define(['jquery', 'knockout'], function($, ko) {
//     var viewModel = {
//         status: ko.observable('active')
//     };
//     ko.applyBindings(viewModel, $('html')[0]);
// });


Parse.initialize("EohFLOiyiQ8bLZ1b4AKTksANagOxnKmKvTNWk9ny", "Ba9ZGY0yfK5tgrt27SJXwy6mTB4aS3LZFvN9QvrJ");


function ThingsViewModel(name, things) {
  var self = this;

  self.user = 'Bull City Dave';
  self.name = name;

  self.things = things;


  self.getName = function() {
    return self.name;
  };

  self.getTotal = function() {
    var total = 0;
    for (var i = 0; i < things.length; i++) {
      total += stuff.models[i].attributes.count;
    }
    return total;
  };

  // self.getLiveTotal = function() {
  //   var numbers = $('td.number');
  //   sum = 0;
  //   $.each(numbers, function (index, number) {
  //     sum += parseInt($(number).html());
  //   })
  //   return sum;
  // }
  //
  // self.liveTotal = self.getLiveTotal();



  self.formatDate = function(date) {
    var month = ('0' + (date.getMonth() +1)).toString().slice(-2);
    var dayOfMonth = ('0' + date.getDate()).toString().slice(-2);
    var year = date.getFullYear();
    return (month + '-' + dayOfMonth + '-' + year);
  };

  self.total = self.getTotal();

  self.getRemaining = function() {
    return (1000 - self.total);
  }

  self.remaining = self.getRemaining();


  self.insertRow = function() {
    /* first, the ugly way...nicer way later */
    var row ="<tr><td class='col-xs-5 col-sm-8 item' data-bind='event: { onblur: $parent.updateItem }'  readonly='false'></td><td class='col-xs-1 col-sm-1 number' readonly='false'></td><td class='col-xs-6 col-sm-3 date text-right' readonly='false'></td></tr>";
    var tbody = $('tbody:nth-of-type(2)');
    $(tbody).prepend(row);

  }

  /* put this into a KO event */
  $(document).on('click','.date', function (e) {
    var thingId = $(e.target).closest('tr').attr('data-thing-id');
    var count = parseInt($(e.target).closest('tr').find('.number input').val());
    var query = new Parse.Query('stuffEntry');
    query.get(thingId, {
      success: function(thing) {
        thing.set("count", count);
        thing.save();
        console.log('Count updated to ', count);
      },
      error: function(object, error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    })
  })



  self.sleep =
  function(milliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + milliseconds >= new Date().getTime()) {
    }
    console.log('done!');
  }

  self.updateItem = function(event) {
    console.log('thisworks');
  }

  self.edit = function() {
    $('tbody td input').removeAttr('readonly');
    $('table.item-listing').addClass('editable');
  }

  $('.btn.btn-edit').on('click', function (e) {
    $(this).hide();
    $('.btn-add').show();
     self.edit();
  })

  self.myText = ko.observable('');

  $('.btn.btn-add').on('click', function (e) {
     self.insertRow();
     $('td.item').first().focus();
    //  ko.applyBindings(self);
   })

};


// function ThingViewModel(thing) {
//   var self = this;
//
//   self.getAge = function() {
//     return self.age;
//   };
//
// };

  self.THINGS = ko.observableArray();

          // function getStuff () {
  var stuffQuery = new Parse.Query("stuffEntry");
  stuffQuery.limit(1000);
  stuffQuery.descending('createdAt');
  var stuff = stuffQuery.collection();
  stuff.fetch({
    success: function(stuff) {

      // var thingsViewModel = new ThingsViewModel('January 2015 Stuff', stuff.models);
      thingsViewModel = new ThingsViewModel('January 2015 Stuff', stuff.models); // have available CLI
      ko.applyBindings(thingsViewModel);
      (self.THINGS).push(thingsViewModel.things);

    },
    error: function(stuff, error) {
      console.error(error);
    }
  });
        // }
        function sleep(milliseconds) {
          var currentTime = new Date().getTime();

          while (currentTime + milliseconds >= new Date().getTime()) {
          }
          console.log('done!');
        }