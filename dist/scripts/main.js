function ThingsViewModel(t,e){var n=this;n.user="Bull City Dave",n.name=t,n.things=ko.observableArray(e),n.getName=function(){return n.name},n.getInitTotal=function(){for(var t=0,n=0;n<e.length;n++)t+=stuff.models[n].attributes.count;return t},n.getLiveTotal=function(){var t=0;return $.each($(".number input"),function(e,n){t+=parseInt($(n).val())}),t},n.total=ko.computed(function(){return isNaN(n.getLiveTotal())?n.getInitTotal():n.getLiveTotal()}),n.formatDate=function(t){var e=("0"+(t.getMonth()+1)).toString().slice(-2),n=("0"+t.getDate()).toString().slice(-2),a=t.getFullYear();return e+"-"+n+"-"+a},n.getRemaining=function(){return 1e3-n.total()},n.remaining=n.getRemaining(),n.updateTotal=function(){n.total=n.getLiveTotal(),$("th[data-bind$=total]").html(n.total),n.remaining=1e3-n.total,$("span[data-bind$=remaining]").html(n.remaining)},n.insertRow=function(){var t="<tr class='new'><td class='col-xs-5 col-sm-8 item' data-bind='event: { onblur: $parent.updateItem }'  readonly='false'><input/></td><td class='col-xs-1 col-sm-1 number' readonly='false'><input class='text-right'/></td><td class='col-xs-6 col-sm-3 date' readonly='false'><input class='text-right'/></td></tr>",e=$("tbody:nth-of-type(2)");$(e).prepend(t)},n.updateDatabase=function(t,e,n){var a=new Parse.Query("stuffEntry");a.get(t,{success:function(t){t.set(e,n),t.save(),console.log(e+" updated to "+n)},error:function(t,e){console.log("Error: "+e.code+" "+e.message)}})},n.submitNewStuff=function(t,e,a,i){var r=new StuffEntry({count:e,stuff:t,dateDiscarded:new Date(a),User:{__type:"Pointer",className:"_User",objectId:"79GU8BnUu3e"},list:{__type:"Pointer",className:"listOfStuff",objectId:"nwGt0sl8pa"}});r.save(null,{success:function(t){alert("New stuffcreated with objectId: "+t.id),n.things.push(t),$(i).removeClass("new"),$(i).attr("data-thing-id",t.id)},error:function(t,e){alert("Failed to create new object, with error code: "+e.message)}})},n.sleep=function(t){for(var e=(new Date).getTime();e+t>=(new Date).getTime(););console.log("done!")},n.updateItem=function(){console.log("thisworks")},n.edit=function(){$("tbody td input").removeAttr("readonly"),$("table.item-listing").addClass("editable")},$(".btn.btn-edit").on("click",function(){$(this).hide(),$(".btn-add").show(),n.edit()}),n.myText=ko.observable(""),$(".btn.btn-add").on("click",function(){n.insertRow(),$("td.item input").first().focus()}),$(document).on("change","tr:not(.new) .number input",function(t){n.updateTotal();var e=$(t.target).closest("tr").attr("data-thing-id"),a=$.grep(n.things(),function(t){return t.id===e});a[0].attributes.count=parseInt($(t.target).val()),n.updateDatabase(e,"count",a[0].attributes.count)}),$(document).on("change","tr:not(.new) .item input",function(t){var e=$(t.target).closest("tr").attr("data-thing-id"),a=$.grep(n.things(),function(t){return t.id===e});a[0].attributes.stuff=$(t.target).val(),n.updateDatabase(e,"stuff",a[0].attributes.stuff)}),$(document).on("change","tr:not(.new) .date input",function(t){var e=$(t.target).closest("tr").attr("data-thing-id"),a=$.grep(n.things(),function(t){return t.id===e}),i=$(t.target).val(),r=new Date(i);a[0].attributes.dateDiscarded=r,n.updateDatabase(e,"dateDiscarded",a[0].attributes.dateDiscarded)}),$(document).on("change","tr.new input",function(t){var e=$(t.target).closest("tr"),a=$(e).find("td.item input").val(),i=parseInt($(e).find("td.number input").val()),r=$(e).find("td.date input").val();a.length>0&&i>0&&!isNaN(parseInt(r))?(console.log("validates!"),n.updateTotal(),n.submitNewStuff(a,i,r,e)):console.log("nope!")})}function sleep(t){for(var e=(new Date).getTime();e+t>=(new Date).getTime(););console.log("done!")}function fac(t){return 0==t?1:fac(t-1)*t}function sum(t,e){return t+e}function sum(t){for(total=0,i=0;i<t.length;i++)total+=t[i];return total}function range(t,e){if(array=[],e>t)for(;e>=t;)array.push(t),t++;return array}Parse.initialize("EohFLOiyiQ8bLZ1b4AKTksANagOxnKmKvTNWk9ny","Ba9ZGY0yfK5tgrt27SJXwy6mTB4aS3LZFvN9QvrJ");var stuffQuery=new Parse.Query("stuffEntry");stuffQuery.limit(1e3),stuffQuery.descending("createdAt");var stuff=stuffQuery.collection();stuff.fetch({success:function(t){thingsViewModel=new ThingsViewModel("January 2015 Stuff",t.models),ko.applyBindings(thingsViewModel)},error:function(t,e){console.error(e)}}),function(t){t.fn.focusTextToEnd=function(){this.focus();var t=this.val();return this.val("").val(t),this}}(jQuery),$(document).on("click","input",function(t){$(t.target).focusTextToEnd()});var StuffEntry=Parse.Object.extend("stuffEntry");